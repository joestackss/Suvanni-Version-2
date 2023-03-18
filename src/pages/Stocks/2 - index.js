import React, { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import {
  Pagination,
  Search,
  TableHeader,
} from "../../components/DataTables/index";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { datafire } from "../Answers/datafire";
import { db } from "../../firebase/config";
import SelectedStocksTable from "./SelectedTable";

const Stocks = () => {
  const [comments, setComments] = useState([]);
  const [loader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "desc" });

  // STATE FOR CALCULATIONS
  const [selectedCommentIndex, setSelectedCommentIndex] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);
  const [result, setResult] = useState(0);
  const [result2, setResult2] = useState(0);
  // console.log("Selected Comments: ", selectedComments);
  // console.log("Selected Index: ", selectedCommentIndex);

  const handleCheckboxChange = (e, index) => {
    if (e.target.checked) {
      if (!selectedCommentIndex.includes(index)) {
        setSelectedCommentIndex([...selectedCommentIndex, index]);
        setSelectedComments([
          ...selectedComments,
          {
            companyName: e.target
              .closest(".table-inner-main")
              .querySelector(".CompanyName h4").textContent,
            cmp: parseInt(
              e.target
                .closest(".table-inner-main")
                .querySelector(".CMP h4")
                .textContent.replace("₹", "")
            ),
            numShares: parseInt(
              e.target
                .closest(".table-inner-main")
                .querySelector(".NumberOfShares input").value
            ),
            dividendYield: parseFloat(
              e.target
                .closest(".table-inner-main")
                .querySelector(".DiviYield h4").textContent
            ),
          },
        ]);
      }
    } else {
      const selectedIndex = selectedCommentIndex.indexOf(index);
      setSelectedCommentIndex(selectedCommentIndex.filter((i) => i !== index));
      setSelectedComments((selectedComments) => {
        const newComments = [...selectedComments];
        newComments.splice(selectedIndex, 1);
        return newComments;
      });
    }
  };

  const handleInputChange = (e, index) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      const updatedComments = [...selectedComments];
      if (updatedComments[index]) {
        updatedComments[index].numShares = value;
        setSelectedComments(updatedComments);
      }
    }
  };

  // const handleInputKeyPress = (e) => {
  //   const keyCode = e.keyCode || e.which;
  //   const keyValue = String.fromCharCode(keyCode);
  //   const isValid = /^\d+$/.test(keyValue);
  //   if (!isValid) {
  //     e.preventDefault();
  //   }
  // };

  // const handleInputKeyDown = (e) => {
  //   const keyCode = e.keyCode || e.which;
  //   if (
  //     (keyCode === 8 || keyCode === 46) &&
  //     (isNaN(numShares) || numShares < 0)
  //   ) {
  //     setNumShares(0);
  //   }
  // };

  const handleCalculate = () => {
    const totalCmp = selectedComments.reduce(
      (acc, comment) => acc + comment.cmp,
      0
    );
    const totalNumShares = selectedComments.reduce(
      (acc, comment) => acc + comment.numShares,
      0
    );
    const totalDividendYield = selectedComments.reduce(
      (acc, comment) => acc + comment.dividendYield,
      0
    );
    setResult(totalCmp * totalNumShares);
    setResult2(totalNumShares * totalCmp * (totalDividendYield / 100));
    setSelectedCommentIndex([]);
    setSelectedComments([]);
  };

  const ITEMS_PER_PAGE = 8;

  const headers = [
    // { name: "No#", field: "id", sortable: false },
    { name: "Name", field: "CompanyName", sortable: false },
    { name: "Current Market Price", field: "Cmp", sortable: true },
    { name: "Dividends Yield", field: "DividendYield", sortable: true },
    { name: "Number Of Shares", field: "body", sortable: false },
  ];

  const heading = [
    { name: "Current Market Price", field: "Cmp", sortable: true },
    { name: "Dividends Yield", field: "DividendYield", sortable: true },
    { name: "Number Of Shares", field: "body", sortable: false },
  ];

  // FIREBASE

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
          setComments(firedata); // Set comments data based on Firebase Data
          // Store comments data in local storage
          localStorage.setItem("commentsData", JSON.stringify(firedata));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  // FIREBASE STOP

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
    <>
      <div className="main-table">
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

          <div className="main-table-1">
            <div>
              <TableHeader
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <div className="table-body-col">
                {commentsData.map((comment, index) => (
                  <div className="table-inner-main" key={index}>
                    <div id="table-inner-1" className="RadioButton">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e, index)}
                        checked={selectedCommentIndex.includes(index)}
                        name="tableCheckbox"
                      />
                    </div>

                    <div id="table-inner-2" className="CompanyName">
                      <h4>{comment.CompanyName}</h4>
                    </div>

                    <div id="table-inner-3" className="CMP">
                      <h4>₹{comment.Cmp}</h4>
                    </div>

                    <div id="table-inner-4" className="DiviYield">
                      <h4>{comment.DividendYield}</h4>
                    </div>

                    <div
                      id="table-inner-5"
                      className={`NumberOfShares ${
                        index ===
                        selectedCommentIndex[selectedCommentIndex.length - 1]
                          ? "selected-input"
                          : ""
                      }`}
                    >
                      <label>
                        <input
                          type="text"
                          placeholder="Text Field"
                          // onKeyPress={handleInputKeyPress}
                          // onKeyDown={handleInputKeyDown}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              selectedCommentIndex.indexOf(index)
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-6 mb-4 selectedTable">
            <SelectedStocksTable stocks={selectedComments} />
          </div>

          <section className="sec-3">
            <div>
              <button
                onClick={handleCalculate}
                className="btn btn-primary mb-4"
              >
                Calculate
              </button>
            </div>

            <div>
              <h3>
                {" "}
                {isNaN(result) ? (
                  <h3>Total Amount Invested = ₹0 </h3>
                ) : (
                  <h3>
                    Total Amount Invested = ₹{result.toLocaleString("en-IN")}
                  </h3>
                )}
              </h3>
            </div>

            <div>
              <h3>
                {" "}
                {isNaN(result) ? (
                  <h3>Estimated Dividend Income (PerAnnum) = ₹0.00 </h3>
                ) : (
                  <h3>
                    Estimated Dividend Income (PerAnnum) = ₹
                    {result2.toLocaleString("en-IN")}
                  </h3>
                )}
              </h3>
            </div>
          </section>
        </div>
      </div>
      {loader}
    </>
  );
};

export default Stocks;
