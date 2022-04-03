import os
from dotenv import load_dotenv
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
        self.get_db_uri()
        self.grabaphone = GrabaphoneAPI(DB_URI=self.DB_URI)
        self.phonearena = PhonearenaAPI()

    def get_db_uri(self):
        load_dotenv()
        self.DB_URI = os.environ.get("DB_URI", None)
        if not self.DB_URI:
            message = "DB_URI Missing!"
            self.log.error(message)
            raise Exception(message)

    def get_manufacturers(self):
        self.log.debug("Getting Manufacturers from PhoneArena...")
        try:
            manufacturers = self.phonearena.get_manufacturers()
        except Exception as exc:
            self.log.error("Error thrown by phonarena.get_manufacturers!")
            self.log.error(exc)
        self.log.debug("Manufacturers Acquired: {}".format(manufacturers))
        self.log.debug("Adding manufacturers to DB...")
        try:
            self.grabaphone.add_manufacturers(manufacturers=manufacturers)
        except Exception as exc:
            self.log.error("Error thrown by grabaphone.add_manufacturers!")
            self.log.error(exc)
        self.log.debug("Manufacturers Added to DB successfully!")
        return manufacturers

    def get_devices_by_manufacturer(self, manufacturer):
        self.log.debug("Getting devices for {}".format(manufacturer))
        devices = None
        try:
            devices = self.phonearena.get_devices(manufacturer=manufacturer)
        except Exception as exc:
            self.log.error("Error thrown by phonarena.get_devices!")
            self.log.error(exc)
        self.log.debug(f"Got {manufacturer.name} devices!: {devices}")
        try:
            self.grabaphone.add_devices(devices)
        except Exception as exc:
            self.log.error("Error thrown by grabaphone.add_devices!")
            self.log.error(exc)
        self.log.debug("{} Added to DB successfully!".format(devices))
        return devices

    def get_devices(self, manufacturers):
        for manufacturer in manufacturers:
            self.get_devices_by_manufacturer(manufacturer=manufacturer)

    def view_manufacturers(self):
        return self.grabaphone.get_manufacturers()

    def view_devices(self):
        return self.grabaphone.get_devices()
