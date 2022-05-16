class Table(object):
    def __init__(self):
        pass

    def __hash__(self):
        return hash(repr(self))
