import React from "react";
import StocksTable from "../NewTable/StocksTable";
import "./stock.css";

const StockHome = () => {
  return (
    <div className="container">
      <div className="content-col">
        <aside className="aside-left"></aside>
        <main className="main">
          <section className="sec-1">
            <h1>Stock Investment Calculator</h1>
          </section>

          <div className="table-main">
            <div className="data-col">
              {/* <Stocks /> */}
              {/* <MainTable /> */}
              <StocksTable />
            </div>
          </div>
        </main>
        <aside className="aside-left"></aside>
      </div>
    </div>
  );
};

export default StockHome;
