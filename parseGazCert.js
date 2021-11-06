const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://www.intergazcert.ru/register/';

const headersArrCheck = [
  'Рег. номер&nbsp; cертификата соответствия (СС)',
  'Номер бланка',
  'Заявитель',
  'Юридический адрес заявителя',
  'Контакты заявителя',
  'Изготовитель',
  'Юридический адрес изготовителя',
  'Контакты изготовителя',
  'Наименование продукции',
  'Дата&nbsp;выдачи СС',
  'Дата окончания действия СС',
  'Класс',
  'Схема',
  'Орган&nbsp;по&nbsp;сертификации',
  'ЦОС',
  'Примечание'
];

const parseGazCert = async (address, checkArr) => {
  return new Promise(async (resolve, reject) => {
    const page = await axios.get(address);
    const $ = cheerio.load(page.data);
    const headers = $('thead > .tr-even > th');
    let counter = 0;
    headers.each((key, item) => {
      // console.log('before');
      // console.log($(item).html());
      if ($(item).html() !== checkArr[counter]) {
        throw new Error('Структура сайта изменилась');
      }
      counter += 1;
    });
    const rows = $('tbody > tr');
    let data = [];
    rows.each((key, item) => {
      const output = {
        cert_id: $(item).find('.td-0').text(),
        cert_blank: $(item).find('.td-1').text(),
        applicant: $(item).find('.td-2').text(),
        applicant_address: $(item).find('.td-3').text(),
        applicant_contacts: $(item).find('.td-4').text(),
        manufacturer: $(item).find('.td-5').text(),
        manufacturer_address: $(item).find('.td-6').text(),
        manufacturer_contacts: $(item).find('.td-7').text(),
        product_name: $(item).find('.td-8').text(),
        cert_date_begin: $(item).find('.td-9').text(),
        cert_date_end: $(item).find('.td-10').text(),
        cert_class: $(item).find('.td-11').text(),
        cert_schema: $(item).find('.td-12').text(),
        cert_organization: $(item).find('.td-13').text(),
        cert_type: $(item).find('.td-14').text(),
        cert_comment: $(item).find('.td-15').text()
      }
      data.push(output);
    });
    console.log(data);
    const output = JSON.stringify(data);
    fs.writeFileSync('interGazSert.txt', output);

  })
}

parseGazCert('https://www.intergazcert.ru/register/certificates/active/products/', headersArrCheck);
// node parseGazCert.js

module.exports.parseGazCert = parseGazCert;
