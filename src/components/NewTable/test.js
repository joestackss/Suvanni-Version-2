import React, { useState } from "react";

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
    let sumCmp = 0;
    let sumSharesValue = 0;
    let sumDividendYields = 0;
    selectedStocks.forEach((stock) => {
      const cmp = parseInt(stock.Cmp);
      const dividendYields = parseFloat(stock.DividendYield);
      const sharesValue = parseInt(shareValues[stock.ISIN] || 0);

      sumCmp += cmp;
      sumSharesValue += sharesValue;
      sumDividendYields += dividendYields;
    });

    setResult(sumCmp * sumSharesValue);
    setResult2(sumCmp * sumSharesValue * (sumDividendYields / 100));
  };

  return (
    <div>
      <section className="selectedTableHeader">
        <h5>Selected Stocks</h5>
      </section>
      <div className="SelectedTableThree p-2">
        <table className="tableSelected">
          <div className="thead">
            <div className="py-3 theader">Name Of Stock</div>
            <div className="theader">Current Market Price</div>
            <div className="theader">Dividend Yield</div>
            <div className="theader">Number of Shares</div>
          </div>

          <div className="tablebody">
            {selectedStocks.map((stock) => (
              <tr key={stock.ISIN} className="flex">
                <div>
                  <button onClick={() => handleStockDelete(stock)}>
                    Delete
                  </button>
                </div>
                <div className="py-2 content">
                  <h4>{stock.CompanyName}</h4>
                </div>
                <div className="Cmp py-2 content">
                  <h4>{stock.Cmp}</h4>
                </div>
                <div className="DividendYield py-2 content">
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
    </div>
  );
};

export default SelectedTable;
