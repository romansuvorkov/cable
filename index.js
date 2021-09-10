const { fileParser } = require("./fileParser");
const { csvParser } = require("./csvParser");
const { csvSearcher } = require("./csvSearcher");
const { textParser } = require("./textParser");
const { xlsParser } = require("./xlsParser");
const { csvSearcherByCode } = require("./csvSearcherByCode");
const fs = require('fs');
// // const { searcher } = require("./searcher");
const { jsonParser } = require("./jsonParser");

const searchWords = ["кабель", "кабели"];
// const namesArr = [
// '2013',
// '2014_1'
// ];

const searchProperties = ['product_group','product_name','product_info'];

const certCsvNames = [
  './certificates_csv/rss_01012019-31032019.csv',
  './certificates_csv/rss_01012020-31032020.csv',
  './certificates_csv/rss_01012021-31012021.csv',
  './certificates_csv/rss_01022021-28022021.csv',
  './certificates_csv/rss_01032021-31032021.csv',
  './certificates_csv/rss_01042019_29112019.csv',
  './certificates_csv/rss_01042019-30062019.csv',
  './certificates_csv/rss_01042020-30062020.csv',
  './certificates_csv/rss_01072019-30092019.csv',
  './certificates_csv/rss_01072020-30092020.csv',
  './certificates_csv/rss_01102019-31122019.csv',
  './certificates_csv/rss_01102020-31122020.csv',
  './certificates_csv/rss_20210301-20210331.csv',
  './certificates_csv/rss_20210401-20210430.csv',
  './certificates_csv/rss_20210501-20210531.csv',
  './certificates_csv/rss_20210601-20210630.csv',
  './certificates_csv/rss_od_2011.csv',
  './certificates_csv/rss_od_2012_2013.csv',
  './certificates_csv/rss_od_2014_2015.csv',
  './certificates_csv/rss_od_2016_2017.csv',
  './certificates_csv/rss_od_2018_2019.csv',
  './certificates_csv/rss_od_before_2011.csv',
  './certificates_csv/rss_od_before_2011.csv'
]

const propertyCertArr = [
'id_cert',
'cert_status',
'cert_type',
'reg_number',
'date_begining',
'date_finish',
'product_scheme',
'product_object_type_cert',
'product_type',
'product_okpd2',
'product_tn_ved',
'product_tech_reg',
'product_group',
'product_name',
'product_info',
'applicant_type',
'person_applicant_type',
'applicant_ogrn',
'applicant_inn',
'applicant_phone',
'applicant_fax',
'applicant_email',
'applicant_website',
'applicant_name',
'applicant_director_name',
'applicant_address',
'applicant_address_actual',
'manufacturer_type',
'manufacturer_ogrn',
'manufacturer_inn',
'manufacturer_phone',
'manufacturer_fax',
'manufacturer_email',
'manufacturer_website',
'manufacturer_name',
'manufacturer_director_name',
'manufacturer_country',
'manufacturer_address',
'manufacturer_address_actual',
'manufacturer_address_filial',
'organ_to_certification_name',
'organ_to_certification_reg_number',
'organ_to_certification_head_name',
'basis_for_certificate',
'old_basis_for_certificate',
'fio_expert',
'fio_signatory',
'product_national_standart',
'production_analysis_for_act',
'production_analysis_for_act_number',
'production_analysis_for_act_date'
];

// const namesArr = [
// '2013',
// '2014_1',
// '2014_2',
// '2015_1_1',
// '2015_1_2',
// '2015_2_1',
// '2015_2_2',
// '2015_2_3',
// '2016_1_1',
// '2016_1_2',
// '2016_1_3',
// '2016_2_1',
// '2016_2_2',
// '2016_2_3',
// '2017_1_1',
// '2017_1_2',
// '2017_1_3',
// '2017_2_1',
// '2017_2_2',
// '2018_1_1',
// '2018_1_2',
// '2018_1_3',
// '2018_2_1_1',
// '2018_2_1_2',
// '2018_2_2',
// '2018_3_1_1',
// '2018_3_1_2',
// '2018_3_2',
// '2019_1_1',
// '2019_1_2',
// '2019_2_1',
// '2019_2_2',
// '01012019-31032019_1_1',
// '01012019-31032019_1_2',
// '01012019-31032019_2_1',
// '01012019-31032019_2_2',
// '01012019-31032019_3',
// '01012019-31032019_4',
// '01012020-31032020_1_1',
// '01012020-31032020_1_2',
// '01012020-31032020_2',
// '01012020-31032020_3',
// '01012020-31032020_4',
// '01012020-31032020_5',
// '01012020-31032020_6',
// '01012021-31012021',
// '01022021-28022021_1',
// '01022021-28022021_2',
// '01032021-31032021',
// '01042019_29112019_1',
// '01042019_29112019_2_1_1',
// '01042019_29112019_2_1_2',
// '01042019_29112019_2_2',
// '01042019_29112019_3',
// '01042019_29112019_4_1',
// '01042019_29112019_4_2',
// '01042019_29112019_5_1_1',
// '01042019_29112019_5_1_2',
// '01042019_29112019_5_2_1_1',
// '01042019_29112019_5_2_1_2',
// '01042019_29112019_5_2_2',
// '01042019-31072019_1_1_1_1',
// '01042019-31072019_1_1_1_2',
// '01042019-31072019_1_1_2',
// '01042019-31072019_1_2_1',
// '01042019-31072019_1_2_2',
// '01042019-31072019_2',
// '01042020-30062020_1_1',
// '01042020-30062020_1_2_1',
// '01042020-30062020_1_2_2',
// '01042020-30062020_2',
// '01072020-30092020_1_1_1',
// '01072020-30092020_1_1_2',
// '01072020-30092020_1_2_1',
// '01072020-30092020_1_2_2',
// '01072020-30092020_2_1_1',
// '01072020-30092020_2_1_2',
// '01072020-30092020_2_2',
// '01082019-30092019_1_1',
// '01082019-30092019_1_2_1',
// '01082019-30092019_1_2_2',
// '01082019-30092019_2',
// '01102019-31122019_1',
// '01102019-31122019_2_1_1',
// '01102019-31122019_2_1_2',
// '01102019-31122019_2_2',
// '01102020-31122020_1_1',
// '01102020-31122020_1_2_1',
// '01102020-31122020_1_2_2',
// '01102020-31122020_2_1',
// '01102020-31122020_2_2',
// '20210301-20210331',
// '20210401-20210430_1',
// '20210401-20210430_2',
// '20210501-20210531_1',
// '20210501-20210531_2',
// 'before_2013'
// ];

// const idArr = [
//   2481931,
//   2723908
// ]

// const namesArr = [
//   './testFolder/111.csv',
//   './testFolder/222.csv'
// ]

const namesDeclArr = [
  './declarations_csv/rds_01012019-31032019.csv',
  './declarations_csv/rds_01012020-31032020.csv',
  './declarations_csv/rds_01012021-31012021.csv',
  './declarations_csv/rds_01022021-28022021.csv',
  './declarations_csv/rds_01032021-31032021.csv',
  './declarations_csv/rds_01042019_29112019.csv',
  './declarations_csv/rds_01042019-31072019.csv',
  './declarations_csv/rds_01042020-30062020.csv',
  './declarations_csv/rds_01072020-30092020.csv',
  './declarations_csv/rds_01082019-30092019.csv',
  './declarations_csv/rds_01102019-31122019.csv',
  './declarations_csv/rds_01102020-31122020.csv',
  './declarations_csv/rds_20210301-20210331.csv',
  './declarations_csv/rds_20210401-20210430.csv',
  './declarations_csv/rds_20210501-20210531.csv',
  './declarations_csv/rds_od_2013.csv',
  './declarations_csv/rds_od_2014_1.csv',
  './declarations_csv/rds_od_2014_2.csv',
  './declarations_csv/rds_od_2015_1.csv',
  './declarations_csv/rds_od_2015_2.csv',
  './declarations_csv/rds_od_2016_1.csv',
  './declarations_csv/rds_od_2016_2.csv',
  './declarations_csv/rds_od_2017_1.csv',
  './declarations_csv/rds_od_2017_2.csv',
  './declarations_csv/rds_od_2018_1.csv',
  './declarations_csv/rds_od_2018_2.csv',
  './declarations_csv/rds_od_2018_3.csv',
  './declarations_csv/rds_od_2019.csv',
  './declarations_csv/rds_od_before_2013.csv'
]

const propertyDeclArr = [
  'id_decl',
  'reg_number',
  'decl_status',
  'decl_type',
  'date_beginning',
  'date_finish',
  'declaration_scheme',
  'product_object_type_decl',
  'product_type',
  'product_group',
  'product_name',
  'asproduct_info',
  'product_tech_reg',
  'organ_to_certification_name',
  'organ_to_certification_reg_number',
  'basis_for_decl',
  'old_basis_for_decl',
  'applicant_type',
  'person_applicant_type',
  'applicant_ogrn',
  'applicant_inn',
  'applicant_name',
  'manufacturer_type',
  'manufacturer_ogrn',
  'manufacturer_inn',
  'manufacturer_name'
];

const searcherByIdCsv = async (propertyArr, idArrAddress, namesArr, searchProperty) => {
  // const idArr = fs.readFileSync('./idArr.txt');
  const idArr = JSON.parse(fs.readFileSync(idArrAddress), 'utf8');
  console.log(idArr);
  const objArr = [];
  // const pathToFile = await fileParser("./declarations_xlsx/before_2013.xlsx", "declarations", "before_2013", 0, searchWords, "asproduct_info");
  for (let i = 0; i < namesArr.length; i++) {
    const data = await csvParser(namesArr[i], searchProperty, idArr, objArr, propertyArr);
    // console.log('data');
    // console.log(data);
    objArr.push(...data);
  }

  // await namesArr.forEach(async (name) => {
  //   const ids = await fileParser(`./${name}.xlsx`, 0, 'id_decl', idArr);
  //   // console.log('ids');
  //   // console.log(ids);
  //   idArr.push(...ids);
  //   console.log('idArr');
  //   console.log(idArr);
  //   // return idArr;
  // });

  // console.log('objArr');
  // console.log(objArr);
  const result = JSON.stringify(objArr);
  fs.writeFileSync('./sortedSerts.txt', result);
  // const pathToFile = await jsonParser("./declarations/2018_3_1_2.txt", "declarations", "2018_3_1_2");
};

const searcherByIdTxt = async (propertyArr, idArrAddress, namesArr, searchProperty) => {
  // const idArr = fs.readFileSync('./idArr.txt');
  const idArr = JSON.parse(fs.readFileSync(idArrAddress), 'utf8');
  const objArr = [];
  // const pathToFile = await fileParser("./declarations_xlsx/before_2013.xlsx", "declarations", "before_2013", 0, searchWords, "asproduct_info");
  for (let i = 0; i < namesArr.length; i++) {
    const data = await textParser(namesArr[i], searchProperty, idArr, objArr);
    // console.log('data');
    // console.log(data);
    objArr.push(...data);
  }
  const result = JSON.stringify(objArr);
  fs.writeFileSync('./sortedSerts.txt', result);
  // const pathToFile = await jsonParser("./declarations/2018_3_1_2.txt", "declarations", "2018_3_1_2");
};

// searcherByIdTxt(propertyCertArr, './certsId.txt', ['./testFolder/certificates.txt'], 'id_cert');

const searchInCsv = async (addressArr, searchProperty, searchWords, propertyArr) => {
  // const idArr = fs.readFileSync('./idArr.txt');
  const objArr = [];
  // const pathToFile = await fileParser("./declarations_xlsx/before_2013.xlsx", "declarations", "before_2013", 0, searchWords, "asproduct_info");
  for (let i = 0; i < addressArr.length; i++) {
    const data = await csvSearcher(addressArr[i], searchProperty, searchWords, propertyArr);
    // console.log('data');
    // console.log(data);
    objArr.push(...data);
  }

  // await namesArr.forEach(async (name) => {
  //   const ids = await fileParser(`./${name}.xlsx`, 0, 'id_decl', idArr);
  //   // console.log('ids');
  //   // console.log(ids);
  //   idArr.push(...ids);
  //   console.log('idArr');
  //   console.log(idArr);
  //   // return idArr;
  // });

  // console.log('objArr');
  // console.log(objArr);
  const result = JSON.stringify(objArr);
  fs.writeFileSync('./testFolder/certificates.txt', result);
  // const pathToFile = await jsonParser("./declarations/2018_3_1_2.txt", "declarations", "2018_3_1_2");
};


const idParser = async (namesArr, outputName, searchProperty) => {
  const idArr = [];
  // const pathToFile = await fileParser("./declarations_xlsx/before_2013.xlsx", "declarations", "before_2013", 0, searchWords, "asproduct_info");
  for (let i = 0; i < namesArr.length; i++) {
    const ids = await fileParser(namesArr[i], 0, searchProperty, idArr);
    // console.log('ids');
    // console.log(ids);
    idArr.push(...ids);
  }

  // await namesArr.forEach(async (name) => {
  //   const ids = await fileParser(`./${name}.xlsx`, 0, 'id_decl', idArr);
  //   // console.log('ids');
  //   // console.log(ids);
  //   idArr.push(...ids);
  //   console.log('idArr');
  //   console.log(idArr);
  //   // return idArr;
  // });

  console.log('idArr');
  console.log(idArr);
  const result = JSON.stringify(idArr);
  fs.writeFileSync(outputName, result);
  // const pathToFile = await jsonParser("./declarations/2018_3_1_2.txt", "declarations", "2018_3_1_2");
};

// idParser(['./certTrable.xlsx'], 'certsId.txt', 'id_cert');

const createTableFromJson = async (pathTofile, outputName) => {
  const pathToFile = await jsonParser(pathTofile, outputName);
}

// createTableFromJson('./parseSitesFunctions/kamkabelAll.txt', 'kamkabelProducts');

// createTableFromJson('./output data/declarations.txt', 'AllDeclarations');

// test('./testFolder/certificates.txt', 'certTrable');

// searchInCsv(certCsvNames, searchProperties, searchWords, propertyCertArr);

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

const searchByIdInCsv = async (addressArr, searchCode, searchProperty, propertyArr) => {
  const objArr = [];
  for (let i = 0; i < addressArr.length; i++) {
    const data = await csvSearcherByCode(addressArr[i], searchCode, searchProperty, objArr, propertyArr);
    objArr.push(...data);
  }
  const result = JSON.stringify(objArr);
  fs.writeFileSync('./testFolder/rifarDecl.txt', result)
};

const parseAllXlsFile = async (pathToFile, sheetNumb, outputName) => {
  const data = await xlsParser (pathToFile, sheetNumb);
  const result = JSON.stringify(data);
  fs.writeFileSync(`./testFolder/${outputName}.txt`, result)
}

parseAllXlsFile('./kamkabelStore.XLS', 0, 'storeTest');


// searchByIdInCsv(namesDeclArr, 1025600684240, 'applicant_ogrn', propertyDeclArr);
