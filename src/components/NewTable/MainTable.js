import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Pagination, Search, TableHeader } from "../DataTables";

const MainTable = ({ selectedStocks, onStockSelect }) => {
  // PAGINATION STATES
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [sorting, setSorting] = useState({ field: "", order: "desc" });
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 8;

  const headers = [
    { name: "#", field: "id", sortable: false },
    { name: "Name of Stock", field: "CompanyName", sortable: false },
    { name: "Current Market Price (₹)", field: "Cmp", sortable: true },
    { name: "Dividends Yield (%)", field: "DividendYield", sortable: true },
  ];

  const handleStockSelect = (stock) => {
    onStockSelect(stock);
    setComments((prevComments) =>
      prevComments.filter((s) => s.ISIN !== stock.ISIN)
    );
  };

  useEffect(() => {
    // Check if comments data is available in local storage
    const cachedData = localStorage.getItem("commentsData");
    if (cachedData) {
      setComments(JSON.parse(cachedData));
    } else {
      // Fetch data from Firebase Firestore
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "Stocks"));
          const firedata = querySnapshot.docs.map((doc) => doc.data());
          // Set comments data based on Firebase Data
          setComments(firedata);
          // Store comments data in local storage
          localStorage.setItem("commentsData", JSON.stringify(firedata));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  let commentsData = useMemo(() => {
    // setComments(datafire);
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.CompanyName.toLowerCase().includes(search.toLowerCase()) ||
          comment.Symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    if (sorting.field) {
      let reversed = sorting.order === "desc" ? -1 : 1;
      computedComments = computedComments.sort((a, b) => {
        if (a[sorting.field] > b[sorting.field]) {
          return reversed;
        }
        if (a[sorting.field] < b[sorting.field]) {
          return -reversed;
        }
        return 0;
      });
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  return (
    <div className="">
      <div className="pagination-search">
        <div className="inner-1">
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        <div className="inner-2">
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="MainTableThree p-2">
        <div id="headComp">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
        </div>
        <table className="headerMain">
          <tbody className="headerInner2">
            {commentsData.map((stock) => (
              <tr key={stock.ISIN} className="flex">
                <td className="headerTitle">
                  <input
                    type="checkbox"
                    className="py-2 pl-2"
                    checked={
                      selectedStocks &&
                      selectedStocks.some((s) => s.ISIN === stock.ISIN)
                    }
                    onChange={() => handleStockSelect(stock)}
                  />
                </td>
                <div className="headerTitle py-2">
                  <h5>{stock.CompanyName}</h5>
                </div>
                <div className="headerTitle py-2">
                  <h5>{stock.Cmp}</h5>
                </div>
                <div className="headerTitle py-2">
                  <h5>{stock.DividendYield}</h5>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
