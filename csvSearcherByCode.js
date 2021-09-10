const csv = require('csv-parser')
const fs = require('fs')
// let counter = 0;
const csvSearcherByCode = (pathToFile, searchCode, searchProperty, objArr, propertyArr) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(pathToFile)
      .pipe(csv(propertyArr))
      .on('data', (data) => {
          // counter++;
          // console.log('objArr');
          // console.log(data);
          if (data[searchProperty] !== null && data[searchProperty] !== undefined) {
            if (parseInt(data[searchProperty], 10) === searchCode) {
            console.log('data');
            console.log(data);
            const existedObjects = objArr.filter(obj => parseInt(obj[searchProperty], 10) === parseInt(data[searchProperty], 10));
            const existInNew = results.filter(obj => parseInt(obj[searchProperty], 10) === parseInt(data[searchProperty], 10));
            if (existedObjects.length > 0 || existInNew.length > 0) {
              console.log('data');
              console.log(data);
              let haveMatch = false;
              for (let i = 0; i < existedObjects.length; i++) {
                const getMatch = JSON.stringify(existedObjects[i]) === JSON.stringify(data);
                if (getMatch) {
                  haveMatch = getMatch;
                  return;
                }
              }
              for (let i = 0; i < existInNew.length; i++) {
                const getMatch = JSON.stringify(existInNew[i]) === JSON.stringify(data);
                if (getMatch) {
                  haveMatch = getMatch;
                  return;
                }
              }
              if (!haveMatch) {
                results.push(data);
              }
            } else {
              results.push(data);
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

module.exports.csvSearcherByCode = csvSearcherByCode;
