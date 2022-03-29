from models.interface import Interface


def main():
    interface = Interface()
    manufacturers = interface.get_manufacturers()
    interface.get_devices(manufacturers=manufacturers)


if __name__ == "__main__":
    main()
