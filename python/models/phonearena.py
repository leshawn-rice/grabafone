from unicodedata import category
import requests
from bs4 import BeautifulSoup as bsoup
from models.tables.device import Device
from models.tables.manufacturer import Manufacturer


class PhonearenaAPI(object):
    BASE_URL = "https://www.phonearena.com"
    MAX_PAGES = 5

    def __init__(self):
        self.session = requests.Session()

    def get(self, endpoint: str = "/phones"):
        url = self.BASE_URL + endpoint
        response = self.session.get(url)
        response_html = response.text
        return bsoup(response_html, "html.parser")

    def find_elements_by_tag(self, html, tag_name) -> list:
        return html.find_all(tag_name)

    def find_elements_by_class(self, html, class_name) -> list:
        return html.find_all(class_=class_name)

    def find_element_by_id(self, html, id):
        pass

    def parse_manufacturers(self):
        resp = self.get(endpoint="/phones/manufacturers")
        divs = self.find_elements_by_class(resp, "listing-item")
        manufacturers = set()
        # O(n)
        for div in divs:
            devices_link = (
                self.find_elements_by_class(div, "listing-item-hover").pop().get("href")
            )
            name = (
                self.find_elements_by_class(div, "listing-item-hover-alt").pop().string
            )
            devices_link = devices_link.split(self.BASE_URL)[1]
            # O(1)
            manufacturer = Manufacturer(name=name, devices_link=devices_link)
            manufacturers.add(manufacturer)
        return manufacturers

    def parse_manufacturer_devices(self, manufacturer):
        devices = set()
        # O(1)
        for page in range(self.MAX_PAGES):
            endpoint = (
                f"/phones/manufacturers/{manufacturer.name.lower()}/page/{page+1}"
            )
            page_html = self.get(endpoint=endpoint)
            device_cards = self.find_elements_by_class(
                page_html, "widget-tilePhoneCard"
            )
            # O(n)
            for device_card in device_cards:
                link = self.find_elements_by_tag(device_card, "a").pop().get("href")
                link = link.split(self.BASE_URL)[1]
                name = self.find_elements_by_class(device_card, "title").pop().string
                device = Device(name=name, link=link, manufacturer=manufacturer)
                # O(1)
                devices.add(device)
        return devices

    def parse_device_specs(self, device):
        page_html = self.get(endpoint=device.link)
        specs = {}
        specs_section = self.find_elements_by_class(page_html, "widgetSpecs").pop()
        specs_divs = self.find_elements_by_tag(specs_section, "section")
        for section in specs_divs:
            category = self.find_elements_by_tag(section, "h3").pop().string
            category = category.strip() if category else ""
            specs[category] = {}
            specs_section = self.find_elements_by_tag(section, "tbody").pop()
            for spec in self.find_elements_by_tag(specs_section, "tr"):
                name = self.find_elements_by_tag(spec, "th").pop().string
                name = name.strip().strip(":") if name else ""
                value = self.find_elements_by_tag(spec, "td").pop().string
                value = value.strip() if value else ""
                specs[category][name] = value
        device.specs = specs

    def get_devices_specs(self, devices):
        for device in devices:
            self.parse_device_specs(device)

    def get_devices(self, manufacturer):
        devices = self.parse_manufacturer_devices(manufacturer=manufacturer)
        self.get_devices_specs(devices)
        return devices

    def get_manufacturers(self):
        manufacturers = self.parse_manufacturers()
        return manufacturers
