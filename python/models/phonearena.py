import requests
from bs4 import BeautifulSoup as bsoup


class PhonearenaAPI(object):
    BASE_URL = "https://phonearena.com/"

    def __init__(self):
        self.session = requests.Session()

    def get(self, endpoint: str = "phones"):
        url = self.BASE_URL + endpoint
        response = self.session.get(url)
        response_html = response.text
        return bsoup(response_html, 'html.parser')

    def find_elements_by_tag(self, html, element_tag) -> list:
        pass

    def find_elements_by_class(self, html, element_class) -> list:
        return html.find_all(class_=element_class)

    def find_element_by_id(self, html, element_id):
        pass
