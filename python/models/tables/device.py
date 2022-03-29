from models.tables.table import Table


class Device(Table):
    def __init__(self, name: str = None, link: str = None, manufacturer=None, specs: dict = None):
        self.name = name
        self.link = link
        self.manufacturer = manufacturer
        self.specs = specs or dict()

    def __repr__(self) -> str:
        return "Device: {}".format(self.name)
