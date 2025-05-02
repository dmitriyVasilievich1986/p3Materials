from typing import TYPE_CHECKING

from sqlalchemy import Column, Enum, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, relationship

from p3Materials.constants import CraftType
from p3Materials.models.base import Base

if TYPE_CHECKING:
    from p3Materials.models.material import Material


material_craft_table = Table(
    "material_craft_table",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("count", Integer, nullable=False, default=1),
    Column("craft_id", ForeignKey("craft.id"), primary_key=True),
    Column("material_id", ForeignKey("material.id"), primary_key=True),
)


class Craft(Base):
    __tablename__ = "craft"

    id: int = Column(Integer, primary_key=True)
    name: str = Column(String(255), nullable=False)
    description: str = Column(String(255), nullable=True)

    buff: str = Column(String(255), nullable=True)
    stats: str = Column(String(255), nullable=True)

    type: CraftType = Column(Enum(CraftType), default=CraftType.Weapon, nullable=False)

    materials: Mapped[list["Material"]] = relationship(
        secondary=material_craft_table, back_populates="crafts"
    )

    def __str__(self) -> str:
        b = f" buff={self.buff}" if self.buff else ""
        s = f" stats={self.stats}" if self.stats else ""
        d = f" description={self.description}" if self.description else ""
        return f'Craft({self.type} - "{self.name}"{s}{b}{d})'
