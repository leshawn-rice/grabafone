import os
from models.interface import Interface


def read_env():
    PG_USERNAME = os.environ.get("PG_USERNAME")
    PG_PASSWORD = os.environ.get("PG_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")
    try:
        dotenv = open(".env", "r")
        env_vars = {
            key: value for [key, value] in [
                line.strip().split("=") for line in dotenv.readlines()
            ]
        }
        PG_USERNAME = PG_USERNAME or env_vars.get("PG_USERNAME")
        PG_PASSWORD = PG_PASSWORD or env_vars.get("PG_PASSWORD")
        DB_NAME = DB_NAME or env_vars.get("DB_NAME")

    except:
        if not PG_USERNAME or not PG_PASSWORD or not DB_NAME:
            raise Exception(".env inaccessible and env vars missing")


def main():
    with open(".env", "r") as env:
        env_vars = {
            key: value for [key, value] in [
                line.strip().split("=") for line in env.readlines()
            ]
        }
        PG_USERNAME = env_vars.get("PG_USERNAME")
        PG_PASSWORD = env_vars.get("PG_PASSWORD")
        DB_NAME = env_vars.get("DB_NAME")

    interface = Interface(
        PG_USERNAME=PG_USERNAME,
        PG_PASSWORD=PG_PASSWORD,
        DB_NAME=DB_NAME
    )


if __name__ == "__main__":
    main()
