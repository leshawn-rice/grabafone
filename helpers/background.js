const axios = require('axios');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')( window );

const getManufacturers = async () => {
  const url = 'https://www.phonearena.com/phones/manufacturers'
  const res = await axios.get(url);
  const page = $(res.data);
  $('html').append(page);
  const items = $('.listing-item-hover-alt').get();
  const names = items.map((el) => $(el).text());
  console.log(names);
}

getManufacturers()