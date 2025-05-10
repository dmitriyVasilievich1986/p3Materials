from flask_appbuilder.api import expose, ModelRestApi
from flask_appbuilder.const import API_RESULT_RES_KEY
from flask_appbuilder.models.sqla.interface import SQLAInterface
from marshmallow import fields, Schema

from p3Materials.constants import CraftType
from p3Materials.models.craft import Craft


class CraftSimple(Schema):
    id = fields.Int()
    name = fields.String()


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

    @expose("/simple", methods=["GET"])
    def get_simple(self) -> dict[str, list[str]]:
        crafts = self.datamodel.session.query(Craft.id, Craft.name).all()
        return {API_RESULT_RES_KEY: CraftSimple().dump(crafts, many=True)}

    @expose("/types", methods=["GET"])
    def types(self) -> dict[str, list[str]]:
        return {API_RESULT_RES_KEY: [x.value for x in CraftType.__members__.values()]}
