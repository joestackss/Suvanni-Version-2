const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.myFunction = functions.https.onRequest((req, res) => {
  const { selectedStocks, shareValues } = req.body;
  if (!Array.isArray(selectedStocks) || typeof shareValues !== "object") {
    res.status(400).send("Invalid request body");
    return;
  }

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
  res.send({ totalValue, totalDividendYield });
});
