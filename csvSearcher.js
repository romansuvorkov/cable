const csv = require('csv-parser')
const fs = require('fs')
// let counter = 0;
const csvSearcher = (pathToFile, searchPropertyArr, searchWords, propertyArr) => {
  // console.log('objArr');
  // console.log(objArr);
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(pathToFile)
      .pipe(csv(propertyArr))
      .on('data', (data) => {
          // counter++;
          // console.log('objArr');
          // console.log(data);
          for (let i = 0; i < searchWords.length; i++) {
            for (let ind = 0; ind < searchPropertyArr.length; ind++) {
              if (data[searchPropertyArr[ind]] !== null && data[searchPropertyArr[ind]] !== undefined) {
                if (typeof data[searchPropertyArr[ind]] === "string") {
                  if (data[searchPropertyArr[ind]].toLowerCase().includes(searchWords[i])) {
                    console.log(data);
                    results.push(data);
                    // if (output.findIndex((item) => item[idProperty] === dataArr[i][idProperty]) === -1) {
                    //   output.push(dataArr[i]);
                    // }
                  }
                }
              }
            }
          }
      })
      .on('end', () => {
        // console.log('results');
        // console.log(results);
        resolve(results);
        // console.log(results);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      });
  });
};

module.exports.csvSearcher = csvSearcher;
