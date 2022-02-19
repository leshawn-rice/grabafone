import sqlalchemy


class Engine(object):
    def __init__(self, connection_string: str = "postgresql:///postgres"):
        self.engine = sqlalchemy.create_engine(connection_string)
