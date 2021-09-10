const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const jsonParser = (pathToFile, outputName) => {
  return new Promise((resolve, reject) => {
    const content = JSON.parse(fs.readFileSync(pathToFile), 'utf8');
    const newFile = xlsx.utils.book_new();
    const newSheet = xlsx.utils.json_to_sheet(content);
    xlsx.utils.book_append_sheet(newFile, newSheet, outputName);
    xlsx.writeFile(newFile, `${outputName}.xlsx`);
    resolve('Success');
  });
};

// Reading our test file


// Printing data

// console.log(data[6].__EMPTY_15);
module.exports.jsonParser = jsonParser;
