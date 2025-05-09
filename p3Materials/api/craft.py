from flask_appbuilder.api import ModelRestApi
from flask_appbuilder.models.sqla.interface import SQLAInterface

from p3Materials.models.craft import Craft


class CraftModelApi(ModelRestApi):
    resource_name = "craft"
    datamodel: SQLAInterface = SQLAInterface(Craft)
    allow_browser_login = True
    list_columns = [
        Craft.id.key,
        Craft.name.key,
        Craft.description.key,
        Craft.buff.key,
        Craft.stats.key,
        Craft.type.key,
    ]
    edit_columns = [
        Craft.name.key,
        Craft.description.key,
        Craft.buff.key,
        Craft.stats.key,
        Craft.type.key,
        Craft.materials.key,
    ]
    show_columns = [
        Craft.id.key,
        Craft.name.key,
        Craft.description.key,
        Craft.buff.key,
        Craft.stats.key,
        Craft.type.key,
        Craft.materials.key,
    ]
    add_columns = [
        Craft.name.key,
        Craft.description.key,
        Craft.buff.key,
        Craft.stats.key,
        Craft.type.key,
        Craft.materials.key,
    ]
