from sqlalchemy import Column, Enum, ForeignKey, Integer, String, Table

from p3Materials.constants import DamageMultiplier
from p3Materials.models.base import Base

floor_shadow_table = Table(
    "floor_shadow_table",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("floor", Integer, nullable=False),
    Column("shadow_id", ForeignKey("shadow.id")),
)


class Shadow(Base):
    __tablename__ = "shadow"

    id: int = Column(Integer, primary_key=True)
    name: str = Column(String(255), nullable=False)
    arcana: int = Column(Integer, nullable=False)

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
