from flask import Flask
from flask.cli import FlaskGroup
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from p3Materials.config import MIGRATIONS_DIR, SQLALCHEMY_DATABASE_URI


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI

    db = SQLAlchemy(app)
    Migrate(app, db, directory=MIGRATIONS_DIR)

    return app


main = FlaskGroup(create_app=create_app)
