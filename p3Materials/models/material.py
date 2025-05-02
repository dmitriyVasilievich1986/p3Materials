from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, relationship

from p3Materials.models.base import Base

if TYPE_CHECKING:
    from p3Materials.models.shadow import Shadow

material_shadow_table = Table(
    "material_shadow_table",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("shadow_id", ForeignKey("shadow.id"), primary_key=True),
    Column("material_id", ForeignKey("material.id"), primary_key=True),
)


class Material(Base):
    __tablename__ = "material"

    id: int = Column(Integer, primary_key=True)
    name: str = Column(String(255), nullable=False)
    price: int = Column(Integer, nullable=False, default=0)

    shadows: Mapped[list["Shadow"]] = relationship(
        secondary=material_shadow_table, back_populates="materials"
    )
