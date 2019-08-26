const fs = require("fs");
const yargs = require("yargs");

// try to load file
function load(file) {
  try {
    const dataBuffer = fs.readFileSync(file);
    const rawData = dataBuffer.toString();
    const parsedData = JSON.parse(rawData);

    return parsedData;
  } catch (e) {
    return [];
  }
}

// save file as stock-price-combined.json
function save(data) {
  const json = JSON.stringify(data);
  fs.writeFileSync("stock-price-combined.json", json);

  console.log("Combination complete");
}

// load the required stock and prices json files
const prices = load("prices.json");
const stock = load("stock.json");

// combine the two files on sku
stock.forEach(function(product) {
  // check if sku matches
  let result = prices.filter(function(price) {
    return product.sku === price.sku;
  });

  // if so add the price to the product data
  product.price = result[0] !== undefined ? result[0].price : null;
});

// output the json file with the successfully combined data
save(stock);

/**
 * TODO:
 * - Pull prices directly from boardgamer api
 * - Accept commands through commandline
 * - Take stock in as csv instead of json
 * - Write out csv files instead of json
 */
