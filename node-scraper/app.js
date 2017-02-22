const cheerio = require('cheerio');
const request = require('request');

return new Promise((resolve, reject) => {
  request('https://hackthemenu.com', (error, response, html) => {
    if(error) {
      reject(error);
    } else {
      resolve(html);
    }
  });
}).then((html) => {
  scrapeMenuListing(html)
    .then((menus) => {
      scrapeMenuItems(menus)
        .then((items) => {
          //figure out manipulations here
        })
    });
});



/////////////////////helper methods////////////////////////////////////////////
function scrapeMenuListing (html) {
  return new Promise((resolve, reject) => {
    let menus = [];
    let $ = cheerio.load(html);
    $('.cntrtxt .spb_content_element .sf-icon-box-boxed-two .no-marpad .home-logo-font a')
      .each((i, element) => {
        menu = {
          url: element.attribs.href,
          name: element.children[0].data.replace(/ Secret Menu/, '')
        }
        menus.push(menu);
      });
      resolve(menus);
  });
}

function scrapeMenuItems (menus) {
  let items = [];
  return new Promise ((resolve, reject) => {
      menus.each((menu) => {
        request(menu.url, (error, response, html) => {
          //figure out how to resolve items from here on out
        });
      })
  });
}
