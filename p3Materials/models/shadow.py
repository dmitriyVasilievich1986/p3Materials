from typing import TypedDict

from sqlalchemy import Column, Enum, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, relationship

from p3Materials.constants import DamageMultiplier
from p3Materials.models.base import Base
from p3Materials.models.material import Material, material_shadow_table


class ShadowStats(TypedDict):
    Level: int
    HP: int
    SP: int


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
    stats: str = Column(String(255), nullable=True)
    arcana: int = Column(Integer, nullable=False)

    floors: Mapped[list[Floor]] = relationship(
        secondary=floor_shadow_table, back_populates="shadows"
    )
    materials: Mapped[list[Material]] = relationship(
        secondary=material_shadow_table, back_populates="shadows"
    )

    # resistances
    slash: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    strike: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    pierce: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )

    fire: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    ice: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    lightning: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    wind: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )

    light: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )
    darkness: DamageMultiplier = Column(
        Enum(DamageMultiplier), default=DamageMultiplier.Normal, nullable=False
    )

    def __str__(self):
        floors = ", ".join([str(floor.id) for floor in self.floors])
        return f'Shadow("{self.name}" [slash={self.slash.value} | strike={self.strike.value} | pierce={self.pierce.value} | fire={self.fire.value} | ice={self.ice.value} | lightning={self.lightning.value} | wind={self.wind.value} | light={self.light.value} | darkness={self.darkness.value}] floors=[{floors}])'
