from typing import TypedDict

from flask_appbuilder.api import expose, ModelRestApi
from flask_appbuilder.const import API_RESULT_RES_KEY
from flask_appbuilder.models.sqla.interface import SQLAInterface

from p3Materials.constants import Arcanas, DamageMultiplier
from p3Materials.models.shadow import Floor, Shadow


class ArcanasResponse(TypedDict):
    id: int
    name: str


class FloorModelApi(ModelRestApi):
    resource_name = "floor"
    datamodel: SQLAInterface = SQLAInterface(Floor)
    allow_browser_login = True
    include_route_methods = {"get_list"}

    list_columns = [
        Floor.id.key,
    ]


class ShadowModelApi(ModelRestApi):
    resource_name = "shadow"
    datamodel: SQLAInterface = SQLAInterface(Shadow)
    allow_browser_login = True

    list_columns = [
        Shadow.id.key,
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

    @expose("/damage_multiplier", methods=["GET"])
    def get_damage_multiplier(self) -> dict[str, list[str]]:
        return {
            API_RESULT_RES_KEY: [x.value for x in DamageMultiplier.__members__.values()]
        }

    @expose("/arcanas", methods=["GET"])
    def arcanas(self) -> dict[str, list[ArcanasResponse]]:
        return {
            API_RESULT_RES_KEY: [
                ArcanasResponse(id=v.value, name=k)
                for k, v in Arcanas.__members__.items()
            ]
        }
