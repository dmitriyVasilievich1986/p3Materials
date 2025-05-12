from flask_appbuilder import AppBuilder, SQLA
from flask_migrate import Migrate

__version__ = "1.0.2"

appbuilder = AppBuilder()
migrate = Migrate()
db = SQLA()
