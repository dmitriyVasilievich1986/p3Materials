from sqlalchemy import Column, Enum, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, relationship

from p3Materials.constants import DamageMultiplier
from p3Materials.models.base import Base
from p3Materials.models.material import Material, material_shadow_table

floor_shadow_table = Table(
    "floor_shadow_table",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("floor_id", ForeignKey("floor.id"), primary_key=True),
    Column("shadow_id", ForeignKey("shadow.id"), primary_key=True),
)


class Floor(Base):
    __tablename__ = "floor"

    id: int = Column(Integer, primary_key=True)
    shadows: Mapped[list["Shadow"]] = relationship(
        secondary=floor_shadow_table, back_populates="floors"
    )


class Shadow(Base):
    __tablename__ = "shadow"

    id: int = Column(Integer, primary_key=True)
    name: str = Column(String(255), nullable=False)
    arcana: int = Column(Integer, nullable=False)

    floors: Mapped[list[Floor]] = relationship(
        secondary=floor_shadow_table, back_populates="shadows"
    )
    materials: Mapped[list[Material]] = relationship(
        secondary=material_shadow_table, back_populates="shadows"
    )

    # resistances
    slash: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    strike: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    pierce: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )

    fire: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    ice: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    lightning: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    wind: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )

    light: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    darkness: int = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
