from models.engine import Engine


class GrabaphoneAPI(object):
    def __init__(self, DB_URI):
        connection_string = DB_URI
        self.engine = Engine(connection_string=connection_string)
        self.engine.start_session()

    def get_devices(self):
        return self.engine.get_all(table_name="devices")

    def get_device_by_id(self, device_id):
        pass

    def get_device_by_name(self, device_name):
        pass

    def get_devices_by_manufacturer_name(self, manufacturer_name):
        pass

    def get_devices_by_manufacturer_id(self, manufacturer_id):
        pass

    def get_manufacturers(self):
        return self.engine.get_all(table_name="manufacturers")

    def get_manufacturer_by_id(self, manufacturer_id):
        pass

    def get_manufacturer_by_name(self, manufacturer_name):
        pass

    def add_manufacturers(self, manufacturers):
        for manufacturer in manufacturers:
            row_vals = {"name": manufacturer.name}
            try:
                self.engine.insert(table_name="manufacturers", values=row_vals)
            except Exception as exc:
                raise exc
