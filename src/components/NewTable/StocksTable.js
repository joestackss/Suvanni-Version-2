import React, { useState } from "react";

import SelectedTable from "./SelectStocks";
import MainTable from "./MainTable";

function StocksTable() {
  const [selectedStocks, setSelectedStocks] = useState([]); // This Works
  const [shares, setShares] = useState({});

  const handleStockSelect = (stock) => {
    setSelectedStocks([...selectedStocks, stock]);
  };

  const handleShareChange = (stockId, shares) => {
    setShares({ ...shares, [stockId]: shares });
  };


  return (
    <div>
      <MainTable
        selectedStocks={selectedStocks}
        onStockSelect={handleStockSelect}
      />
      <SelectedTable
        selectedStocks={selectedStocks}
        shares={shares}
        onShareChange={handleShareChange}
        setSelectedStocks={setSelectedStocks}
      />
    </div>
  );
}

export default StocksTable;
