from flask import Flask
from flask_migrate import Migrate

from p3Materials import appbuilder, db
from p3Materials.api import (
    CraftModelApi,
    FloorModelApi,
    MaterialModelApi,
    ShadowModelApi,
)
from p3Materials.views import (
    CraftView,
    FloorView,
    MaterialView,
    P3IndexView,
    ShadowView,
)


def create_app() -> Flask:
    app = Flask(__name__)

    app.config.from_object("p3Materials.config")
    app.static_url_path = app.config["STATIC_URL_PATH"]
    app.static_folder = app.config["STATIC_FOLDER"]

    db.init_app(app)

    with app.app_context():
        appbuilder.indexview = P3IndexView
        appbuilder.init_app(app, db.session)
        appbuilder.add_api(CraftModelApi)
        appbuilder.add_api(ShadowModelApi)
        appbuilder.add_api(FloorModelApi)
        appbuilder.add_api(MaterialModelApi)
        appbuilder.add_view(FloorView, "Floor", category="Floor")
        appbuilder.add_view(CraftView, "Craft", category="Craft")
        appbuilder.add_view(ShadowView, "Shadow", category="Shadow")
        appbuilder.add_view(MaterialView, "Material", category="Material")
        appbuilder.add_permissions(update_perms=True)
        appbuilder.sm.lm.login_view = "AuthDBView.login"

        migrate = Migrate(app, db)
        migrate.directory = app.config["MIGRATIONS_DIR"]
        migrate.init_app(app, db)

    return app
