const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://fsa.gov.ru/opendata/';

const checkUpdateDeclarations = async (url, pathToCheckFile, targetCategory, outputPath) => {
  const mainPage = await axios.get(url);
  const $ = cheerio.load(mainPage.data);
  const linkTable = $('.content.text-primary > .primary-link > tbody > tr');
  linkTable.each(async (key, item) => {
    // console.log(item);
    const linkText = $(item).find('a').text();
    const trimText = linkText.trim();
    if (trimText === 'Сведения из Реестра деклараций о соответствии') {
      const linkRaw = $(item).find('a').attr('href');
      const linkToDecl = linkRaw.includes('https://fsa.gov.ru') ? linkRaw : `https://fsa.gov.ru${linkRaw}`;
      // console.log(linkToDecl;
      const declarationPage = await axios.get(linkToDecl);
      const $1 = cheerio.load(declarationPage.data);
      const dataTable = $1('.content.text-primary > table > tbody > tr');
      dataTable.each(async (key, tableString) => {
        const stringName = $(tableString);
        // const trimName = stringName.trim();
        console.log('trimName');
        console.log(stringName);
      })
    }
  });
};


checkUpdateDeclarations(URL, 0, 0, 0);

module.exports.checkUpdateDeclarations = checkUpdateDeclarations;
