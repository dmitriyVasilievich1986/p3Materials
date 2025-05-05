from typing import TYPE_CHECKING

from flask_appbuilder import Model
from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, relationship

from p3Materials.models.craft import Craft, material_craft_table

if TYPE_CHECKING:
    from p3Materials.models.shadow import Shadow

material_shadow_table = Table(
    "material_shadow_table",
    Model.metadata,
    Column("id", Integer, primary_key=True),
    Column("shadow_id", ForeignKey("shadow.id"), primary_key=True),
    Column("material_id", ForeignKey("material.id"), primary_key=True),
)


class Material(Model):
    __tablename__ = "material"

    id: int = Column(Integer, primary_key=True)
    name: str = Column(String(255), nullable=False)
    price: int = Column(Integer, nullable=False, default=0)

    shadows: Mapped[list["Shadow"]] = relationship(
        "Shadow", secondary=material_shadow_table, back_populates="materials"
    )
    crafts: Mapped[list[Craft]] = relationship(
        "Craft", secondary=material_craft_table, back_populates="materials"
    )

    def __str__(self) -> str:
        price = f" ¥{self.price:_}" if self.price > 0 else ""
        return f'Material("{self.name}"{price})'
