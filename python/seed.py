from models.interface import Interface


def main():
    interface = Interface()
    interface.log.error("TEST")
    # interface.get_manufacturers()


if __name__ == "__main__":
    main()
