const csv = require('csv-parser')
const fs = require('fs')
// let counter = 0;
const csvParser = (pathToFile, searchProperty, idList, objArr, propertyArr) => {
  // console.log('objArr');
  // console.log(objArr);
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(pathToFile)
      .pipe(csv(propertyArr))
      .on('data', (data) => {
          // counter++;
          // console.log('objArr');
          console.log(data);
          const id = idList.find((item) => item === parseInt(data[searchProperty], 10));
          // console.log('data[searchProperty]');
          // console.log(data[searchProperty]);
          // console.log('data[searchProperty]');
          // console.log(data[searchProperty]);
          if (id !== undefined) {
            const existedObjects = objArr.filter(obj => parseInt(obj[searchProperty], 10) === id);
            const existInNew = results.filter(obj => parseInt(obj[searchProperty], 10) === id);
            // console.log(data);
            // console.log('existedObjects.length > 0 || existInNew.length > 0');
            // console.log(existedObjects.length > 0 || existInNew.length > 0);
            if (existedObjects.length > 0 || existInNew.length > 0) {
              // console.log('counter');
              // console.log(counter);
              console.log('data');
              console.log(data);
              let haveMatch = false;
              for (let i = 0; i < existedObjects.length; i++) {
                const getMatch = JSON.stringify(existedObjects[i]) === JSON.stringify(data);
                if (getMatch) {
                  haveMatch = getMatch;
                }
              }
              for (let i = 0; i < existInNew.length; i++) {
                const getMatch = JSON.stringify(existInNew[i]) === JSON.stringify(data);
                if (getMatch) {
                  haveMatch = getMatch;
                }
              }
              if (!haveMatch) {
                results.push(data);
              }
            } else {
              results.push(data);
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

module.exports.csvParser = csvParser;
