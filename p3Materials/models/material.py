from sqlalchemy import Column, ForeignKey, Integer, String, Table

from p3Materials.models.base import Base

material_shadow_table = Table(
    "material_shadow_table",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("shadow_id", ForeignKey("shadow.id")),
    Column("material_id", ForeignKey("material.id")),
)


class Material(Base):
    __tablename__ = "material"

    id: int = Column(Integer, primary_key=True)
    name: str = Column(String(255), nullable=False)
    price: int = Column(Integer, nullable=False, default=0)
