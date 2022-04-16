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
        manufacturer = self.engine.get_by_column_value(
            table_name="manufacturers",
            column_name="name",
            column_value=manufacturer_name,
        )
        try:
            return manufacturer.pop()
        except IndexError:
            return None

    def add_manufacturers(self, manufacturers):
        for manufacturer in manufacturers:
            row_vals = {"name": manufacturer.name}
            try:
                self.engine.insert(table_name="manufacturers", values=row_vals)
            except Exception as exc:
                raise exc

    def add_devices(self, devices):
        for device in devices:
            manufacturer = self.get_manufacturer_by_name(device.manufacturer.name)
            if not manufacturer:
                print("No Manufacturer!")
                raise ValueError("No Manufacturer!")

            row_vals = {"name": device.name, "manufacturer_id": manufacturer.id}
            try:
                self.engine.insert(table_name="devices", values=row_vals)
            except Exception as exc:
                raise exc

            device_object = None

            device_rows = self.engine.get_by_column_value(
                table_name="devices", column_name="name", column_value=device.name
            )

            if len(device_rows) > 1:
                for row in device_rows:
                    if row.manufacturer_id == manufacturer.id:
                        device_object = row
                        break
            elif len(device_rows) == 1:
                device_object = device_rows.pop()
            else:
                raise ValueError("Could not get device!")

            device_id = device_object.id
            for category, spec_dict in device.specs.items():
                for key, value in spec_dict.items():
                    row_vals = {
                        "device_id": device_id,
                        "category": category,
                        "key": key,
                        "value": value,
                    }
                    try:
                        self.engine.insert(table_name="specifications", values=row_vals)
                    except Exception as exc:
                        raise exc
