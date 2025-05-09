from os import getenv
from pathlib import Path

from flask_appbuilder.security.manager import AUTH_DB

BASE_PATH = Path(__file__).resolve().parent
SECRET_KEY = getenv("SECRET_KEY", "secret")
DB_PATH = BASE_PATH / "p3.sqlite"
AUTH_TYPE = AUTH_DB

SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"

STATIC_FOLDER = BASE_PATH.parent / "static"
TEMPLATE_FOLDER = BASE_PATH / "templates"
STATIC_URL_PATH = "/static"
