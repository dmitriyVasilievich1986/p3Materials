from os import getenv
from pathlib import Path
from urllib.parse import quote_plus

from flask_appbuilder.security.manager import AUTH_DB

BASE_PATH = Path(__file__).resolve().parent
SECRET_KEY = getenv("SECRET_KEY", "secret")
DB_PATH = BASE_PATH / "p3.sqlite"
AUTH_TYPE = AUTH_DB

DATABASE_DIALECT = getenv("DATABASE_DIALECT", "sqlite")
DATABASE_PATH = getenv("DATABASE_PATH", f"/{DB_PATH}")
DATABASE_PASSWORD = getenv("DATABASE_PASSWORD")
DATABASE_USER = getenv("DATABASE_USER")

DATABASE_CREDS = (
    ""
    if DATABASE_USER is None and DATABASE_PASSWORD is None
    else f"{DATABASE_USER}:{quote_plus(DATABASE_PASSWORD)}@"
)

SQLALCHEMY_DATABASE_URI = f"{DATABASE_DIALECT}://{DATABASE_CREDS}{DATABASE_PATH}"

STATIC_FOLDER = BASE_PATH.parent / "static"
TEMPLATE_FOLDER = BASE_PATH / "templates"
MIGRATIONS_DIR = BASE_PATH / "alembic"
STATIC_URL_PATH = "/static"
