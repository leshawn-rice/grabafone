import requests
import sqlalchemy


class Engine(object):
    def __init__(self, connection_string: str = ""):
        self.engine = sqlalchemy.create_engine(connection_string)


class PhonearenaAPI(object):
    def __init__(self):
        self.session = requests.Session()
        self.BASE_URL = "https://phonearena.com/"

    def get(self, endpoint: str = "phones"):
        url = self.BASE_URL + endpoint
        response = self.session.get(url)
        return response.text
