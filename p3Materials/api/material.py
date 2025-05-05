from flask_appbuilder.api import ModelRestApi
from flask_appbuilder.models.sqla.interface import SQLAInterface

from p3Materials.models.material import Material


class MaterialModelApi(ModelRestApi):
    resource_name = "material"
    datamodel: SQLAInterface = SQLAInterface(Material)
    allow_browser_login = True
    list_columns = [
        Material.name.key,
        Material.price.key,
    ]
    edit_columns = [
        Material.name.key,
        Material.price.key,
        Material.crafts.key,
        Material.shadows.key,
    ]
    show_columns = [
        Material.name.key,
        Material.price.key,
        Material.crafts.key,
        Material.shadows.key,
    ]
    add_columns = [
        Material.name.key,
        Material.price.key,
        Material.crafts.key,
        Material.shadows.key,
    ]
