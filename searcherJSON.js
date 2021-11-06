const fs = require('fs');
const path = require("path");

const searcherJSON = (targetFilePath, searchDataArr, outputFileName, folderName, searchProperty, idProperty) => {
  return new Promise((resolve, reject) => {
  const pathToOutputFile = path.resolve(__dirname, folderName, `${outputFileName}`);
  const dataArr = JSON.parse(fs.readFileSync(targetFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      reject('Ошибка чтения фаила');
    }
    return data;
  }));
  const output = [];

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i][searchProperty] !== null && dataArr[i][searchProperty] !== undefined) {
      for (let ind = 0; ind < searchDataArr.length; ind++) {
          if (typeof dataArr[i][searchProperty] === "string") {
            if (dataArr[i][searchProperty].toLowerCase().includes(searchDataArr[ind])) {
              if (output.findIndex((item) => item[idProperty] === dataArr[i][idProperty]) === -1) {
                output.push(dataArr[i]);
              }
            }
          }
      }
    }
  }
  const result = JSON.stringify(output);
  fs.writeFileSync(pathToOutputFile, result);
  resolve('File sorted');
  });
}

module.exports.searcherJSON = searcherJSON;
