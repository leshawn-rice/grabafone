from models.tables.table import Table
from models.tables.device import Device


class Manufacturer(Table):
    def __init__(self, name: str = None, devices_link: str = None):
        self.name = name
        self.devices_link = devices_link
        self.devices = set()

    def add_device(self, device: Device = None):
        if not device:
            return
        self.devices.add(device)

    def remove_device(self, device: Device = None):
        if not device:
            return
        self.devices.remove(device)

    def __repr__(self) -> str:
        return "Manufacturer: {}".format(self.name)
