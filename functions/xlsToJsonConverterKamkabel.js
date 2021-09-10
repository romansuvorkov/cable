const reader = require('xlsx');
const fs = require('fs');
const path = require("path");

const xlsToJsonConverterKamkabel = (pathToFile, outputDir, outputName, sheetNumb, headersArr) => {
  return new Promise((resolve, reject) => {
    const file = reader.readFile(pathToFile, {type:'binary', cellText:false,cellDates:true, range: 8});
    // const ext = path.extname(pathToFile);
    const pathToOutputFile = path.resolve(__dirname, outputDir, `${outputName}.txt`);

    const data = [];

    const sheets = file.SheetNames;
    let counter = 0;
    let headers = {};
    // for(let i = 0; i < sheets.length; i++) {
      // console.log(i);
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[sheetNumb]], {header: headersArr, raw:false, defval: '', cellDates: true, dateNF:'yyyy-mm-dd'});
      temp.forEach((res) => {
          // console.log(res);
          counter++;
          if (counter === 7) {
            for (let item of headersArr) {
              if (item !== res[item]) {
                throw new Error('Структура фаила изменилась');
              }
              // console.log('item');
              // console.log(item);

              // console.log('res[item]');
              // console.log(res[item]);
            }
          }
          if (counter > 6) {
            // console.log(res);

            // const output = {
            //   [headers.__EMPTY]: res.__EMPTY === undefined ? res.__EMPTY : res.__EMPTY.trim(),
            //   [headers.__EMPTY_1]: res.__EMPTY_1 === undefined ? res.__EMPTY_1 : res.__EMPTY_1.trim(),
            //   [headers.__EMPTY_2]: res.__EMPTY_2 === undefined ? res.__EMPTY_2 : res.__EMPTY_2.trim(),
            //   [headers.__EMPTY_3]: res.__EMPTY_3 === undefined ? res.__EMPTY_3 : res.__EMPTY_3.trim(),
            //   [headers.__EMPTY_4]: res.__EMPTY_4 === undefined ? res.__EMPTY_4 : res.__EMPTY_4.trim(),
            //   [headers.__EMPTY_5]: parseFloat(res.__EMPTY_5, 10),
            //   [headers.__EMPTY_6]: res.__EMPTY_6 === undefined ? res.__EMPTY_6 : res.__EMPTY_6.trim(),
            //   [headers.__EMPTY_7]: parseFloat(res.__EMPTY_7, 10),
            // }
            // if (counter === 7) {
            //   console.log(output);
            // }
            // data.push(output);
          }
          // console.log(data);
          // data.push(res);
      })
    // }
    // console.log(data);
    const result = JSON.stringify(data);
    fs.writeFileSync(pathToOutputFile, result);
    resolve(pathToOutputFile);
  });
};

fileParser('./06.09.21.XLS', '', '06.09.21', 0, ['Город склада', 'Дата сдачи', 'Марка КПП', 'Тара', '№тары', 'Код партии', 'Кол-во', 'е.и.', 'Брутто,кг']);

module.exports.xlsToJsonConverterKamkabel = xlsToJsonConverterKamkabel;
