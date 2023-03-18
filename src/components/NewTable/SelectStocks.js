import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const SelectedTable = ({ selectedStocks, setSelectedStocks }) => {
  const [shareValues, setShareValues] = useState({});
  const [result, setResult] = useState(0);
  const [result2, setResult2] = useState(0);

  const handleShareChange = (stock, event) => {
    setShareValues({
      ...shareValues,
      [stock.ISIN]: parseInt(event.target.value),
    });
  };

  const handleStockDelete = (stock) => {
    const newSelectedStocks = selectedStocks.filter(
      (s) => s.ISIN !== stock.ISIN
    );
    setSelectedStocks(newSelectedStocks);
  };

  const calculate = () => {
    let totalValue = 0;
    let totalDividendYield = 0;
    selectedStocks.forEach((stock) => {
      const cmp = parseFloat(stock.Cmp);
      const dividendYields = parseFloat(stock.DividendYield);
      const sharesValue = parseInt(shareValues[stock.ISIN] || 0);
      const product = cmp * sharesValue;
      const diviProduct = cmp * sharesValue * (dividendYields / 100);
      totalValue += product;
      totalDividendYield += diviProduct;
    });
    setResult(totalValue);
    setResult2(totalDividendYield);
  };

  return (
    <div>
      <section className="selectedTableHeader">
        <h5>Selected Stocks</h5>
      </section>
      <div className="SelectedTableThree p-2">
        <table className="tableSelected">
          <div className="thead">
            <div className="py-3 theader"></div>
            <div className="py-3 theader">
              <h4> Name Of Stock </h4>
            </div>
            <div className="theader">
              <h4> CMP (₹)</h4>
            </div>
            <div className="theader">
              <h4> Dividend Yield (%) </h4>
            </div>
            <div className="theader">
              <h4> No of Shares </h4>
            </div>
          </div>

          <div className="tablebody">
            {selectedStocks.map((stock) => (
              <tr key={stock.ISIN} className="flex">
                <div className="content py-2">
                  <div onClick={() => handleStockDelete(stock)}>
                    <AiFillDelete className="text-white reactIcon" />
                  </div>
                </div>
                <div className=" content">
                  <h4>{stock.CompanyName}</h4>
                </div>
                <div className="Cmp  content">
                  <h4>{stock.Cmp}</h4>
                </div>
                <div className="DividendYield  content">
                  <h4>{stock.DividendYield}</h4>
                </div>
                <div className="content">
                  <input
                    type="number"
                    value={shareValues[stock.ISIN] || ""}
                    onChange={(event) => handleShareChange(stock, event)}
                    className="SharesValue "
                  />
                </div>
              </tr>
            ))}
          </div>
        </table>
      </div>
      <div className="sec-3">
        <button onClick={calculate} className="btn btn-primary my-4">
          Calculate
        </button>
        <h3>
          {" "}
          {isNaN(result) ? (
            <h3>Total Amount Invested = ₹0 </h3>
          ) : (
            <h3>Total Amount Invested = ₹{result.toLocaleString("en-IN")}</h3>
          )}
        </h3>
        <div>
          <h3>
            {" "}
            {isNaN(result2) ? (
              <h3>Estimated Dividend Income = ₹0 </h3>
            ) : (
              <h3>
                Estimated Dividend Income = ₹{result2.toLocaleString("en-IN")}
              </h3>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SelectedTable;
