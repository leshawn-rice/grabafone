from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine


class Engine(object):
    def __init__(self, connection_string: str = "postgresql:///postgres"):
        self.base = automap_base()
        self.engine = create_engine(
            connection_string,
            convert_unicode=True
        )
        self.base.prepare(self.engine, reflect=True)
        self.tables = self.base.classes
        self.session = None

    def create_session(self):
        self.session = Session(self.engine)

    def get_table(self, name: str = None):
        if not name:
            raise ValueError("Invalid Table")
        if not self.session:
            raise AttributeError("No SQLAlchemy Session")
        for table in self.tables:
            if table.__name__ == name:
                return table
        raise ValueError("Invalid Table")

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()

    def get_all(self, table_name: str = None):
        table = self.get_table(name=table_name)
        result = self.session.query(table).all()
        return result

    def get_by_id(self, table_name: str = None, row_id: int = None):
        table = self.get_table(name=table_name)
        result = self.session.query(table).filter_by(id=row_id).first()
        return result
