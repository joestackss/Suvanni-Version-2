import React from "react";

const SelectedStocksTable = ({ stocks }) => {

  return (
    <>
      <div className="">
        <div className="">
          <div className="secondTableHeader">

            <div id="col-3">
              {" "}
              <h4>Dividend Yield</h4>
            </div>

            <div id="col-4">
              {" "}
              <h4>Number of Shares</h4>
            </div>
          </div>
        </div>
        <div className="table-body-col">
          {stocks.map((stock, index) => (
            <div className="secondTableBody" key={index}>
              <div id="col-1">
                <h4>{stock.companyName}</h4>
              </div>
              <div id="col-2" className="CMP">
                <h4>₹{stock.cmp}</h4>
              </div>
              <div id="col-3" className="DiviYield">
                <h4>{stock.dividendYield}</h4>
              </div>
              <div id="col-4" className="ValueOfShares">
                {isNaN(stock.numShares) ? null : <h4>{stock.numShares}</h4>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectedStocksTable;
