from flask_appbuilder import BaseView, expose, IndexView


class P3IndexView(IndexView):
    index_template = "index.html"


class ShadowView(BaseView):
    default_view = "shadow_view"
    route_base = "/shadow"

    @expose("/")
    @expose("/create")
    @expose("/<int:pk>")
    def shadow_view(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)


class MaterialView(BaseView):
    default_view = "material_view"
    route_base = "/material"

    @expose("/")
    @expose("/create")
    @expose("/<int:pk>")
    def material_view(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)


class CraftView(BaseView):
    default_view = "craft_view"
    route_base = "/craft"

    @expose("/")
    @expose("/create")
    @expose("/<int:pk>")
    def craft_view(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)


class FloorView(BaseView):
    default_view = "floor_view"
    route_base = "/floor"

    @expose("/")
    @expose("/<int:pk>")
    def floor_view(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)
