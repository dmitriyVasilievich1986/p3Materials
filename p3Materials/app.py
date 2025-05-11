from flask import Flask
from flask_appbuilder import AppBuilder

from p3Materials import appbuilder, db, migrate
from p3Materials.views import (
    CraftView,
    FloorView,
    MaterialView,
    P3IndexView,
    ShadowView,
)


def initialize_apis(appbuilder: AppBuilder) -> None:
    from p3Materials.api import (
        CraftModelApi,
        FloorModelApi,
        MaterialModelApi,
        ShadowModelApi,
    )

    appbuilder.add_api(CraftModelApi)
    appbuilder.add_api(ShadowModelApi)
    appbuilder.add_api(FloorModelApi)
    appbuilder.add_api(MaterialModelApi)


def create_app() -> Flask:
    app = Flask(__name__)

    app.config.from_object("p3Materials.config")
    app.static_url_path = app.config["STATIC_URL_PATH"]
    app.static_folder = app.config["STATIC_FOLDER"]

    db.init_app(app)
    migrate.init_app(app, db, directory=app.config["MIGRATIONS_DIR"])

    with app.app_context():
        appbuilder.indexview = P3IndexView
        appbuilder.init_app(app, db.session)
        appbuilder.add_view(FloorView, "Floor", category="Floor")
        appbuilder.add_view(CraftView, "Craft", category="Craft")
        appbuilder.add_view(ShadowView, "Shadow", category="Shadow")
        appbuilder.add_view(MaterialView, "Material", category="Material")
        initialize_apis(appbuilder)
        appbuilder.sm.lm.login_view = "AuthDBView.login"
        appbuilder.add_permissions(update_perms=True)

    return app
