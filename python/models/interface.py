import os
from models.grabaphone import GrabaphoneAPI
from models.phonearena import PhonearenaAPI
from models.logger import Logger


class Interface(object):
    def __init__(self):
        self.log = Logger(
            filename="seed.log",
            logName="Interface",
            logLevel="DEBUG"
        )
        self.read_env()
        self.grabaphone = GrabaphoneAPI(
            self.PG_USERNAME,
            self.PG_PASSWORD,
            self.DB_NAME
        )
        self.phonearena = PhonearenaAPI()

    def read_env(self):
        PG_USERNAME = os.environ.get("PG_USERNAME")
        PG_PASSWORD = os.environ.get("PG_PASSWORD")
        DB_NAME = os.environ.get("DB_NAME")
        try:
            dotenv = open(".env", "r")
            env_vars = {
                key: value for [key, value] in [
                    line.strip().split("=") for line in dotenv.readlines()
                ]
            }
            self.PG_USERNAME = PG_USERNAME or env_vars.get("PG_USERNAME")
            self.PG_PASSWORD = PG_PASSWORD or env_vars.get("PG_PASSWORD")
            self.DB_NAME = DB_NAME or env_vars.get("DB_NAME")

        except:
            if not PG_USERNAME or not PG_PASSWORD or not DB_NAME:
                self.log.error(".env inaccessible and env vars missing")
                raise Exception(".env inaccessible and env vars missing")

    def get_manufacturers(self):
        resp = self.phonearena.get(endpoint="/phones/manufacturers")
        divs = self.phonearena.find_elements_by_class(resp, "listing-item")
        manufacturers = []
        for div in divs:
            link = div.find("a", class_="listing-item-hover").get("href")
            name = div.find("span", class_="listing-item-hover-alt").string
            manufacturers.append({"name": name, "link": link})
