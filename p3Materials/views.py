from flask_appbuilder import BaseView, expose, IndexView


class P3IndexView(IndexView):
    index_template = "index.html"


class ShadowView(BaseView):
    default_view = "shadow_view"
    route_base = "/shadow"

    @expose("/")
    @expose("/create")
    @expose("/<int:pk>")
    def shadow(self, pk: int | None = None) -> str:
        return self.render_template("index.html", appbuilder=self.appbuilder)
