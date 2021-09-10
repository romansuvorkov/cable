const axios = require('axios');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');
const fs = require('fs');


const URL = 'https://www.kamkabel.ru/production/';

const parseCatalogPage = async (address, category) => {
  const productModels = [];
  let addressLink = address;
  // console.log('addressLink before cycle');
  // console.log(addressLink);
  do {
    // console.log('Loading page');
    // console.log('***************');
    // console.log(addressLink);
    // console.log('***************');
    const modelList = await axios.get(addressLink);
    const $ = cheerio.load(modelList.data);
    const productModelsList = $('.text > .row > .col-md-12');
    productModelsList.each((key, item) => {
      const modelName = $(item).find('span[itemprop=name]').text();
      const modelLinkRaw = $(item).find('a').attr('href');
      const modelLink = modelLinkRaw.includes('https://www.kamkabel.ru') ? modelLinkRaw : `https://www.kamkabel.ru${modelLinkRaw}`;
      productModels.push({
        modelName: modelName,
        modelLink: encodeURI(modelLink),
        category: category
      });
    });
    const furtherLinkRaw = $(modelList.data).find('a[aria-label=Далее]').attr('href');
    // console.log('furtherLinkRaw before condition');
    // console.log(furtherLinkRaw);
    if (furtherLinkRaw !== undefined) {
        addressLink = furtherLinkRaw.includes('https://www.kamkabel.ru') ? furtherLinkRaw : `https://www.kamkabel.ru${furtherLinkRaw}`;
    } else {
      addressLink = undefined;
    }
    // console.log('addressLink end cycle');
    // console.log(addressLink);
  } while (addressLink !== undefined)

  return productModels;
}

const parseMainCatalogPage = async (address) => {
  const catalogCategories = [];
  const parseData = await axios.get(address);
  const $ = cheerio.load(parseData.data);
  const categories = $('.item-views.catalog.sections > .items.row > .col-md-6.col-sm-12');
  console.log('work outside function');
  categories.each((key, item) => {
    const title = $(item).find('div.title').text();
    const productList = $(item).find('li');
    productList.each((key, item) => {
      console.log('work each cycle');
      const product = $(item).text();
      const productLink = $(item).find('a').attr('href');
      if (productLink.includes('https://www.kamkabel.ru')) {
        catalogCategories.push({
          category: product,
          categoryLink: encodeURI(productLink)
        });
      } else {
        catalogCategories.push({
          category: product,
          categoryLink: 'https://www.kamkabel.ru' + productLink
        });
      }
    })
  })
  // console.log('catalogCategories');
  // console.log(catalogCategories);
  return catalogCategories;
}

const parseKamkabelProducts = async (address) => {
  const productCategories = await parseMainCatalogPage(address);
    console.log('productCategories');
    console.log(productCategories);
  // const parseData = await axios.get(address);
  // const $ = cheerio.load(parseData.data);
  // const productCategories = [];
  // const categories = $('.item-views.catalog.sections > .items.row > .col-md-6.col-sm-12');
  // categories.each((key, item) => {
  //   const title = $(item).find('div.title').text();
  //   const productList = $(item).find('li');
  //   productList.each((key, item) => {
  //     const product = $(item).text();
  //     const productLink = $(item).find('a').attr('href');
  //     if (productLink.includes('https://www.kamkabel.ru')) {
  //       productCategories.push({
  //         category: product,
  //         categoryLink: productLink
  //       });
  //     } else {
  //       productCategories.push({
  //         category: product,
  //         categoryLink: 'https://www.kamkabel.ru' + productLink
  //       });
  //     }
  //   })
  //   // console.log('productCategories');
  //   // console.log(productCategories);
  // })

  const productModels = [];
  // let counterTest = 0;
  // console.log('productCategories[0].category');
  // console.log(productCategories[0].category);
  // const modelList1 = await parseCatalogPage(productCategories[0].categoryLink, productCategories[0].category);
  // productModels.push(...modelList1);
  // console.log('productModels');
  // console.log(productModels);
  /************************/
  for (let category of productCategories) {
    // console.log('Models load');
    // if (counterTest < 1) {
      const modelList = await parseCatalogPage(category.categoryLink, category.category);
      console.log('modelList');
      console.log(modelList);
      productModels.push(...modelList);
    // console.log('productModels');
    // console.log(productModels);
    // }
    // counterTest++;
  }
  /************************/


  let products = [];

  for (let model of productModels) {
    const product = await productPageParserForCatalog(model.modelLink, model.category, model.modelName);
    products.push(product);
  }
  fs.writeFileSync('kamkabelAll.txt', JSON.stringify(products));
}

parseKamkabelProducts(URL);

const productPageParserForCatalog = async (address, category, modelName) => {
  console.log('address');
  console.log(address);
  const parseData = await axios.get(address);
  const $ = cheerio.load(parseData.data);
  const infoBlock = $('.info > .previewtext > div');
  const gost = $(infoBlock).first().text();
  const codeClassificator = $(infoBlock).next().text();
  const tabDescr = $('#tabDescr > ol > li');
  const structure = [];
  tabDescr.each((key, item) => {
    // console.log('item');
    // console.log(item);
    const line = $(item).text();
    structure.push(line);
  })
  // console.log('structure');
  // console.log(structure);
  const dataObj = {
      structure: structure,
      category: category,
      modelName: modelName,
      gost: gost,
      codeClassificator: codeClassificator,
      manufaturerName: 'Камский Кабель',
      manufaturerINN: 5904184047,
      manufaturerOGRN: 1085904004779
  }
  console.log('dataObj');
  console.log(dataObj);
  return dataObj;

}

const productPageParser = async (address, category, modelName) => {
  console.log('address');
  console.log(address);
  const parseData = await axios.get(address);
  const $ = cheerio.load(parseData.data);
  // const infoBlock = $('.info > .previewtext > div');
  // const gost = $(infoBlock).first().text();
  // const codeClassificator = $(infoBlock).next().text();
  const tabDescr = $('#tabDescr > ol > li');
  const structure = [];
  const products = [];
  tabDescr.each((key, item) => {
    // console.log('item');
    // console.log(item);
    const product = $(item).text();
    structure.push(product);
  })
  // console.log('structure');
  // console.log(structure);
  const tabSize = $('.table.table-bordered > tbody > tr');
  tabSize.each((key, item) => {
    const product = $(item).find('.table-sech').text();
    // console.log('product');
    // console.log(product);
    products.push({
      product: product,
      structure: structure,
      category: category,
      modelName: modelName
      });
  })
  console.log('products');
  console.log(products);
  return products;
  // console.log('structure');
  // console.log(structure);
  // console.log('products');
  // console.log(products);
}
// productPageParserForCatalog(URL1, 'test1', 'test2');

const URLNews = 'https://www.kamkabel.ru/press/news';

const parseNewsPage = async (address) => {
  const newsList = [];
  const pageList = [];
  const newsData = [];
  let addressLink = address;
  let counter = 0;
  // console.log('addressLink before cycle');
  // console.log(addressLink);
  do {
    // console.log('Loading page');
    // console.log('***************');
    // console.log(addressLink);
    // console.log('***************');
    const newsPage = await axios.get(addressLink);
    const $ = cheerio.load(newsPage.data);
    const newsPageListItems = $('.row > .col-md-8.col-sm-8.col-xs-12 > .text');
    newsPageListItems.each((key, item) => {
      const newsLinkRaw = $(item).find('a').attr('href');
      console.log('newsLinkRaw');
      console.log(newsLinkRaw);
      const newsLink = newsLinkRaw.includes('https://www.kamkabel.ru') ? newsLinkRaw : `https://www.kamkabel.ru${newsLinkRaw}`;
      newsList.push(encodeURI(newsLink));
    });

    const furtherLinks = $('.wrap_pagination > .pagination > li');
     if (counter < 1) {
      furtherLinks.each((key, item) => {
        const pageLinkRaw = $(item).find('a').attr('href');
        // console.log('pageLinkRaw');
        // console.log(pageLinkRaw);
        if (pageLinkRaw !== undefined) {
          const pageLink = pageLinkRaw.includes('https://www.kamkabel.ru') ? pageLinkRaw : `https://www.kamkabel.ru${pageLinkRaw}`;
          pageList.push(encodeURI(pageLink));
        }
      });
    }
    console.log('pageList');
    console.log(pageList);

    // console.log('furtherLinks');
    // console.log(furtherLinks);
    counter += 1;
    addressLink = pageList [counter];
  } while (counter < 5)

  // console.log('newsList');
  // console.log(newsList);

  for (let item of newsList) {
    const newPage = await axios.get(item);
    const $ = cheerio.load(newPage.data);
    const newsText = []
    const infoBlock = $('.detail.news > .content > p');
    infoBlock.each((key, item) => {
      newsText.push($(item).text());
    });
    const date = $('.detail.news > .period > .label').text();
    const title = $('.row > .col-md-12 > h1').text();
    newsData.push({
      date: date,
      title: title,
      text: newsText
    })
  }
  console.log('newsData');
  console.log(newsData);

  // return productModels;
}

// parseNewsPage(URLNews);

const test = async (address) => {
    const newPage = await axios.get(address);
    const $ = cheerio.load(newPage.data);
    const newsText = []
    const infoBlock = $('.detail.news > .content').children().map((child) => {
      console.log('this');
      console.log(child);
    })
  //   infoBlock.each((key, item) => {
  //     newsText.push($(item).text());
  //   });
  //   const date = $('.detail.news > .period > .label').text();
  //   const title = $('.row > .col-md-12 > h1').text();
  //   newsData.push({
  //     date: date,
  //     title: title,
  //     text: newsText
  //   })
  // };
  // console.log('newsData');
  // console.log(newsData);
}

// test('https://www.kamkabel.ru/press/news/news_791.html');
