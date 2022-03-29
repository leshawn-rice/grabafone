import requests
from bs4 import BeautifulSoup as bsoup
from models.tables.device import Device
from models.tables.manufacturer import Manufacturer


class PhonearenaAPI(object):
    BASE_URL = "https://www.phonearena.com"

    def __init__(self):
        self.session = requests.Session()

    def get(self, endpoint: str = "/phones"):
        url = self.BASE_URL + endpoint
        response = self.session.get(url)
        response_html = response.text
        return bsoup(response_html, 'html.parser')

    def find_elements_by_tag(self, html, tag_name) -> list:
        return html.find_all(tag_name)

    def find_elements_by_class(self, html, class_name) -> list:
        return html.find_all(class_=class_name)

    def find_element_by_id(self, html, id):
        pass

    def parse_manufacturers(self):
        resp = self.get(endpoint="/phones/manufacturers")
        divs = self.find_elements_by_class(
            resp,
            "listing-item"
        )
        manufacturers = set()
        # O(n)
        for div in divs:
            devices_link = self.find_elements_by_class(
                div, "listing-item-hover").pop().get("href")
            name = self.find_elements_by_class(
                div, "listing-item-hover-alt").pop().string
            devices_link = devices_link.split(self.BASE_URL)[1]
            # O(1)
            manufacturer = Manufacturer(name=name, devices_link=devices_link)
            manufacturers.add(manufacturer)
        return manufacturers

    def parse_manufacturer_devices(self, manufacturer):
        endpoint = "/phones/manufacturers/{}".format(manufacturer.name)
        page_html = self.get(endpoint=endpoint)
        device_cards = self.find_elements_by_class(
            page_html, "widget-tilePhoneCard")
        devices = set()
        for device_card in device_cards:
            link = self.find_elements_by_tag(
                device_card, "a").pop().get("href")
            name = self.find_elements_by_class(
                device_card, "title").pop().string
            device = Device(name=name, link=link, manufacturer=manufacturer)
            devices.add(device)
        return devices

    def get_devices(self, manufacturer):
        devices = self.parse_manufacturer_devices(manufacturer=manufacturer)
        return devices

    def get_manufacturers(self):
        manufacturers = self.parse_manufacturers()
        return manufacturers
