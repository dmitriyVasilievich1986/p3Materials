from flask_appbuilder import BaseView, expose, IndexView


class P3IndexView(IndexView):
    index_template = "index.html"


class ShadowView(BaseView):
    default_view = "shadow_view"
    route_base = "/shadow"

    @expose("/list")
    @expose("/create")
    @expose("/<int:pk>")
    def shadow(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)


class MaterialView(BaseView):
    default_view = "material_view"
    route_base = "/material"

    @expose("/list")
    @expose("/create")
    @expose("/<int:pk>")
    def material(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)


class CraftView(BaseView):
    default_view = "craft_view"
    route_base = "/craft"

    @expose("/list")
    @expose("/create")
    @expose("/<int:pk>")
    def craft(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)


class FloorView(BaseView):
    default_view = "floor_view"
    route_base = "/floor"

    @expose("/list")
    @expose("/<int:pk>")
    def craft(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)
