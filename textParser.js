const fs = require('fs')
// let counter = 0;
const textParser = (pathToFile, searchProperty, idList, objArr) => {
  // console.log('objArr');
  // console.log(objArr);
  return new Promise((resolve, reject) => {
    const results = [];
    const objectsArr = JSON.parse(fs.readFileSync(pathToFile), 'utf8');
    for (let data of objectsArr) {
      const id = idList.find((item) => item === data[searchProperty]);
      // console.log('data[searchProperty]');
      // console.log(data[searchProperty]);
      // console.log('data[searchProperty]');
      // console.log(typeof data[searchProperty]);
      if (id !== undefined) {
        const existedObjects = objArr.filter(obj => obj[searchProperty] === id);
        const existInNew = results.filter(obj => obj[searchProperty] === id);
        // console.log(data);
        // console.log('existedObjects.length > 0 || existInNew.length > 0');
        // console.log(existedObjects.length > 0 || existInNew.length > 0);
        if (existedObjects.length > 0 || existInNew.length > 0) {
        // console.log('data');
        // console.log(data);
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
    }
    resolve(results);
  })
};

module.exports.textParser = textParser;
