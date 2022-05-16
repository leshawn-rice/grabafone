from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, insert, select, update


class Engine(object):
    def __init__(self, connection_string: str = "postgresql:///postgres"):
        self.base = automap_base()
        self.engine = create_engine(connection_string, convert_unicode=True)
        self.base.prepare(self.engine, reflect=True)
        self.tables = self.base.classes
        self.session = None

    def start_session(self):
        self.session = Session(self.engine)

    def end_session(self):
        self.session.close()

    def get_session(self):
        return self.session

    def get_tables(self):
        return self.tables

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

    def update(self, table_name: str = None, row_id: int = None, values: dict = None):
        if not values or not isinstance(values, dict):
            raise ValueError("Invalid Update values!")
        if not row_id or not isinstance(row_id, int):
            raise ValueError("Invalid Row ID!")
        table = self.get_table(name=table_name)
        self.session.execute(update(table).where(table.id == row_id).values(**values))

    def insert(self, table_name: str = None, values: dict = None):
        if not values or not isinstance(values, dict):
            raise ValueError("Invalid Insert values!")
        table = self.get_table(name=table_name)
        row = self.session.query(table).filter_by(**values).first()
        if row:
            row_id = row.id
            self.update(table_name=table_name, row_id=row_id, values=values)
        else:
            self.session.execute(insert(table).values(**values))
        self.session.commit()

    def get_all(self, table_name: str = None):
        table = self.get_table(name=table_name)
        result = self.session.query(table).all()
        return result

    def get_by_id(self, table_name: str = None, row_id: int = None):
        table = self.get_table(name=table_name)
        result = self.session.query(table).filter_by(id=row_id).first()
        return result

    def get_by_column_value(self, table_name, column_name, column_value):
        table = self.get_table(name=table_name)
        column = table.__table__.c[column_name]
        result = self.session.query(table).filter(column == column_value).all()
        return result
