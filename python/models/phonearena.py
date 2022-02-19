import requests
from bs4 import BeautifulSoup as bsoup


class PhonearenaAPI(object):
    BASE_URL = "https://phonearena.com/"

    def __init__(self):
        self.session = requests.Session()

    def get(self, endpoint: str = "phones"):
        url = self.BASE_URL + endpoint
        response = self.session.get(url)
        return response.text

    def find_elements_by_tag(self, element_tag) -> list:
        pass

    def find_elements_by_class(self, element_class) -> list:
        pass

    def find_element_by_id(self, element_id):
        pass
