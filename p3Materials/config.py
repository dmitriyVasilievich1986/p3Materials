from pathlib import Path

BASE_PATH = Path(__file__).resolve().parent.parent
DB_PATH = BASE_PATH / "p3Materials/p3.sqlite"

SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
