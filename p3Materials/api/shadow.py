from flask_appbuilder.api import ModelRestApi
from flask_appbuilder.models.sqla.interface import SQLAInterface

from p3Materials.models.shadow import Shadow


class ShadowModelApi(ModelRestApi):
    resource_name = "shadow"
    datamodel: SQLAInterface = SQLAInterface(Shadow)
    allow_browser_login = True
    list_columns = [
        Shadow.name.key,
        Shadow.stats.key,
        Shadow.arcana.key,
        Shadow.slash.key,
        Shadow.strike.key,
        Shadow.pierce.key,
        Shadow.fire.key,
        Shadow.ice.key,
        Shadow.lightning.key,
        Shadow.wind.key,
        Shadow.light.key,
        Shadow.darkness.key,
    ]
    edit_columns = [
        Shadow.name.key,
        Shadow.stats.key,
        Shadow.arcana.key,
        Shadow.floors.key,
        Shadow.materials.key,
        Shadow.slash.key,
        Shadow.strike.key,
        Shadow.pierce.key,
        Shadow.fire.key,
        Shadow.ice.key,
        Shadow.lightning.key,
        Shadow.wind.key,
        Shadow.light.key,
        Shadow.darkness.key,
    ]
    show_columns = [
        Shadow.id.key,
        Shadow.name.key,
        Shadow.stats.key,
        Shadow.arcana.key,
        Shadow.floors.key,
        Shadow.materials.key,
        Shadow.slash.key,
        Shadow.strike.key,
        Shadow.pierce.key,
        Shadow.fire.key,
        Shadow.ice.key,
        Shadow.lightning.key,
        Shadow.wind.key,
        Shadow.light.key,
        Shadow.darkness.key,
    ]
    add_columns = [
        Shadow.name.key,
        Shadow.stats.key,
        Shadow.arcana.key,
        Shadow.floors.key,
        Shadow.materials.key,
        Shadow.slash.key,
        Shadow.strike.key,
        Shadow.pierce.key,
        Shadow.fire.key,
        Shadow.ice.key,
        Shadow.lightning.key,
        Shadow.wind.key,
        Shadow.light.key,
        Shadow.darkness.key,
    ]
