from typing import TypedDict

from flask_appbuilder.api import expose, ModelRestApi
from flask_appbuilder.const import API_RESULT_RES_KEY
from flask_appbuilder.models.sqla.interface import SQLAInterface
from marshmallow import fields, Schema

from p3Materials.constants import Arcanas, DamageMultiplier
from p3Materials.models.shadow import Floor, Shadow


class ArcanasResponse(TypedDict):
    id: int
    name: str


class ShadowSimple(Schema):
    id = fields.Int()
    name = fields.String()


class FloorSimple(Schema):
    id = fields.Int()


class FloorModelApi(ModelRestApi):
    resource_name = "floor"
    datamodel: SQLAInterface = SQLAInterface(Floor)
    allow_browser_login = True
    include_route_methods = {"get_list", "get_simple"}

    list_columns = [
        Floor.id.key,
    ]

    @expose("/simple", methods=["GET"])
    def get_simple(self) -> dict[str, list[str]]:
        floors = self.datamodel.session.query(Floor.id).all()
        return {API_RESULT_RES_KEY: FloorSimple().dump(floors, many=True)}


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

    @expose("/simple", methods=["GET"])
    def get_simple(self) -> dict[str, list[str]]:
        shadows = self.datamodel.session.query(Shadow.id, Shadow.name).all()
        return {API_RESULT_RES_KEY: ShadowSimple().dump(shadows, many=True)}

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
