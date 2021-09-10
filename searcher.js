const fs = require('fs');
const path = require("path");

// const searchWords = ["каменск-уральский"];
// const pathToFile = `${__dirname}/testFile1.xlsx`;
// const outputFileName = "testCity1.js";
const searcher = async (targetFilePath, searchData, outputFileName, folderName, searchProperty, idProperty) => {
  const ext = path.extname(targetFilePath);
  // console.log(ext);
  console.log("targetFilePath");
  console.log(targetFilePath);
  const pathToOutputFile = path.resolve(__dirname, folderName, `${outputFileName}${ext}`);
  // console.log(pathToOutputFile);
  const dataArr = JSON.parse(fs.readFileSync(targetFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    // console.log("data");
    // console.log(data);
    return data;
    // console.log("data");
    // console.log(data);
  }));
  // console.log("dataArr");
  // console.log(dataArr);
  const output = [];

  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i][searchProperty] !== null && dataArr[i][searchProperty] !== undefined) {
      // console.log(dataArr[i][searchProperty]);
      for (let ind = 0; ind < searchData.length; ind++) {
          if (typeof dataArr[i][searchProperty] === "string") {
            // console.log("dataArr[i][searchProperty]");
            // console.log(dataArr[i][searchProperty]);
            // console.log("searchData[ind]");
            // console.log(searchData[ind]);
            if (dataArr[i][searchProperty].toLowerCase().includes(searchData[ind])) {
              // console.log(dataArr[i][searchProperty]);
              // console.log(searchData[ind]);
              if (output.findIndex((item) => item[idProperty] === dataArr[i][idProperty]) === -1) {
                output.push(dataArr[i]);
              }
            }
          }
          // } else if (typeof dataArr[i][searchProperty] === "number") {

          // }
      }
    }
  }
  console.log(output);
  const result = JSON.stringify(output);
  fs.writeFileSync(pathToOutputFile, result);
}

module.exports.searcher = searcher;
