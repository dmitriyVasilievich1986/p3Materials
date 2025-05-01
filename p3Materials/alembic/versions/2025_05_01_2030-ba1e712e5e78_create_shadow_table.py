"""Create shadow table

Revision ID: ba1e712e5e78
Revises: 50105075ff21
Create Date: 2025-05-01 20:30:12.402352

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

from p3Materials.constants import DamageMultiplier

# revision identifiers, used by Alembic.
revision: str = "ba1e712e5e78"
down_revision: str | None = "50105075ff21"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "shadow",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("arcana", sa.Integer, nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column(
            "slash",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "strike",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "pierce",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "fire",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "ice",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "lightning",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "wind",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "light",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
        sa.Column(
            "darkness",
            sa.Enum(DamageMultiplier),
            default=DamageMultiplier.Normal,
            nullable=False,
        ),
    )
    op.create_table(
        "floor_shadow_table",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("floor", sa.Integer, nullable=False),
        sa.Column("shadow_id", sa.Integer, sa.ForeignKey("shadow.id")),
    )


def downgrade() -> None:
    op.drop_table("floor_shadow_table")
    op.drop_table("shadow")
