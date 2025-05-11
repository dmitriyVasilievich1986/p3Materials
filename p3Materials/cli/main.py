from flask.cli import FlaskGroup

from p3Materials.app import create_app

main = FlaskGroup(create_app=create_app)
