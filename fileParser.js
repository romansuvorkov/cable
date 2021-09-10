const reader = require('xlsx');
// const fs = require('fs');
// const path = require("path");

// const fileParser = (pathToFile, outputDir, outputName, sheetNumb, searchData, searchProperty) => {
//   return new Promise((resolve, reject) => {
//     const file = reader.readFile(pathToFile);
//     // const ext = path.extname(pathToFile);
//     const pathToOutputFile = path.resolve(__dirname, outputDir, `${outputName}.json`);

//     const data = [];

//     // const sheets = file.SheetNames;

//     // for(let i = 0; i < sheets.length; i++) {
//       // console.log(i);
//       const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[sheetNumb]]);
//       temp.forEach((res) => {
//         if (res[searchProperty] !== null && res[searchProperty] !== undefined) {
//           for (let ind = 0; ind < searchData.length; ind++) {
//             if (typeof res[searchProperty] === "string") {
//               if (res[searchProperty].toLowerCase().includes(searchData[ind])) {
//                 data.push(res);
//                 // if (output.findIndex((item) => item[idProperty] === dataArr[i][idProperty]) === -1) {
//                 //   output.push(dataArr[i]);
//                 // }
//               }
//             }
//           }
//         }
//       })
//     // }
//     console.log(data);
//     const result = JSON.stringify(data);
//     fs.writeFileSync(pathToOutputFile, result);
//     resolve(pathToOutputFile);
//   });
// };

const fileParser = (pathToFile, sheetNumb, searchProperty, idList) => {
  return new Promise((resolve, reject) => {
    const file = reader.readFile(pathToFile);
    // const ext = path.extname(pathToFile);
    // const pathToOutputFile = path.resolve(__dirname, outputDir, `${outputName}.json`);

    const data = [];
    // console.log('idList');
    // console.log(idList);
    // const sheets = file.SheetNames;
    // for(let i = 0; i < sheets.length; i++) {
      // console.log(i);
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[sheetNumb]]);
      // console.log(temp);
      temp.forEach((res) => {
        if (res[searchProperty] !== null && res[searchProperty] !== undefined) {
          // console.log('res[searchProperty]');
          // console.log(typeof res[searchProperty]);
          // console.log(data.findIndex((item) => item === res[searchProperty]) === -1);
          if (data.findIndex((item) => item === res[searchProperty]) === -1) {
            if (idList.findIndex((item) => item === res[searchProperty]) === -1) {
              data.push(res[searchProperty]);
            }
          }
        }
      })
    // console.log('data');
    // console.log(data);
    // }
    resolve(data);
  });
};



// Reading our test file

// const csv = require('csv-parser')
// const fs = require('fs')
// const results = [];
// let counter = 0;

// fs.createReadStream('./testFolder/rds_od_2014_1.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     if (counter < 3) {
//       console.log(data);
//       counter++;
//     }
//     results.push(data)
//   })
//   .on('end', () => {
//     // console.log(results);
//     // [
//     //   { NAME: 'Daffy Duck', AGE: '24' },
//     //   { NAME: 'Bugs Bunny', AGE: '22' }
//     // ]
//   });

// Printing data

// console.log(data[6].__EMPTY_15);
module.exports.fileParser = fileParser;
