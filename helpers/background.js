// Fetch dependencies

const axios = require('axios');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')( window );

// Model dependencies
const Manufacturer = require('../models/manufacturer');


class PhoneArenaAPI {
  static async get(url = '') {
    const res = await axios.get(url);
    $('body').empty();
    $('body').append(res.data);
  }
}

const getElementsByClass = (className = '') => {
  const elements = $(`.${className}`).get();
  return elements;
}

const getElementsInnerText = (elements) => {
  const text = elements.map((el) => $(el).text());
  return text;
}

const getElementsHref = (elements) => {
  const hrefs = elements.map((el) => $(el).attr('href'));
  return hrefs;
}

const getElementsByType = (type) => {
  const elements = $(`${type}`).get();
  return elements;
}

const getManufacturerNames = async () => {
  const url = 'https://phonearena.com/phones/manufacturers';
  await PhoneArenaAPI.get(url);
  const elements = getElementsByClass('listing-item-hover-alt');
  const names = getElementsInnerText(elements);
  return names
}

const getManufacturerDescription = async (name = '') => {
  const url = `https://phonearena.com/${name}`;
  await PhoneArenaAPI.get(url);
  const elements = getElementsByClass('read-more__full');
  const description = getElementsInnerText(elements);
  return description[0] || '';
}

const createManufacturer = async (name) => {
  const description = await getManufacturerDescription(name);
  await Manufacturer.create(name, description);
}

const getManufacturers = async () => {
  const names = await getManufacturerNames();
  for (let name of names) {
    await createManufacturer(name);
  }
  return names;
}

const getDeviceLinks = async (manufacturer = '') => {
  const links = [];
  for (let i = 1; i < 6; i++) {
    const url = `https://www.phonearena.com/phones/manufacturers/${manufacturer}/page/${i}`;
    try {
      await PhoneArenaAPI.get(url);
      const devices = getElementsByClass('thumbnail');
      links.push(...getElementsHref(devices));
    }
    catch (err) {
      break;
    }
  }
  return links
}

const getManufacturerDevices = async (manufacturer = '') => {
  const links = await getDeviceLinks(manufacturer);
  return links;
}

const getDeviceName = () => {
  const container = getElementsByClass('page__section_quickSpecs');
  const headerSection = container[0];
  const header = $(headerSection).find('h1');
  const nameSection = header[0];
  const name = $(nameSection).text();
  return name;
}

const findFirstElementText = (container, tag) => {
  const section = $(container).find(tag);
  const element = section[0];
  const text = $(element).text();
  return text;
}

const getDeviceSpecs = () => {
  const specGroups = getElementsByType('table');
  const specifications = [];
  for (let group of specGroups) {
    const type = findFirstElementText(group, 'h3');
    if (!type) {
      continue;
    }
    const specs = $(group).find('tr');
    for (let spec of specs) {
      const name = findFirstElementText(spec, 'th');
      const value = findFirstElementText(spec, 'td');
      if (name.includes('\\n') || name.includes('\n')) {
        continue;
      }
      const specObject = {type, name, value};
      specifications.push(specObject);
      console.log(`${type}: ${name}=${value}`);
    }
  }
  return specifications;
}

const createDevice = async (url) => {
  await PhoneArenaAPI.get(url);
  const name = getDeviceName();
  const specs = getDeviceSpecs();
  console.log(name);
  console.log(specs);
}

const getAllDevices = async (names) => {
  const links = [];
  for (let name of names) {
    try {
      const manufacturerLinks = await getManufacturerDevices(name);
      links.push(...manufacturerLinks);
    }
    catch (err) {
      console.error(err);
    }
  }

  for (let link of links) {
    await createDevice(link);
  }
}

const seed = async () => {
  const names = await getManufacturers();
  getAllDevices(names)
}

seed()
