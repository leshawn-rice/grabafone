from engine import Engine


class GrabaphoneAPI(object):
    def __init__(self, PG_USERNAME: str = None, PG_PASSWORD: str = None, DB_NAME: str = None):
        connection_string = f"postgresql://{PG_USERNAME}:{PG_PASSWORD}@localhost:5432/{DB_NAME}"
        self.engine = Engine(connection_string=connection_string)

    def get_devices(self):
        pass

    def get_device_by_id(self, device_id):
        pass

    def get_device_by_name(self, device_name):
        pass

    def get_devices_by_manufacturer_name(self, manufacturer_name):
        pass

    def get_devices_by_manufacturer_id(self, manufacturer_id):
        pass

    def get_manufacturers(self):
        pass

    def get_manufacturer_by_id(self, manufacturer_id):
        pass

    def get_manufacturer_by_name(self, manufacturer_name):
        pass
