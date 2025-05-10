from flask_appbuilder.api import expose, ModelRestApi
from flask_appbuilder.const import API_RESULT_RES_KEY
from flask_appbuilder.models.sqla.interface import SQLAInterface
from marshmallow import fields, Schema

from p3Materials.models.material import Material


class MaterialSimple(Schema):
    id = fields.Int()
    name = fields.String()


class MaterialModelApi(ModelRestApi):
    resource_name = "material"
    datamodel: SQLAInterface = SQLAInterface(Material)
    allow_browser_login = True
    list_columns = [
        Material.id.key,
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
        Material.id.key,
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

    @expose("/simple", methods=["GET"])
    def get_simple(self) -> dict[str, list[str]]:
        materials = self.datamodel.session.query(Material.id, Material.name).all()
        return {API_RESULT_RES_KEY: MaterialSimple().dump(materials, many=True)}
