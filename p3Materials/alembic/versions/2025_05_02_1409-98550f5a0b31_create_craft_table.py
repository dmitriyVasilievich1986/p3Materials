"""Create Craft table

Revision ID: 98550f5a0b31
Revises: 01afce650416
Create Date: 2025-05-02 14:09:18.687293

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

from p3Materials.constants import CraftType

# revision identifiers, used by Alembic.
revision: str = "98550f5a0b31"
down_revision: str | None = "01afce650416"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "craft",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("description", sa.String(255), nullable=True),
        sa.Column("buff", sa.String(255), nullable=True),
        sa.Column("stats", sa.String(255), nullable=True),
        sa.Column("type", sa.Enum(CraftType), default=CraftType.Weapon, nullable=False),
    )
    op.create_table(
        "material_craft_table",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("count", sa.Integer, nullable=True, default=1),
        sa.Column("craft_id", sa.Integer, sa.ForeignKey("craft.id")),
        sa.Column("material_id", sa.Integer, sa.ForeignKey("material.id")),
    )


def downgrade() -> None:
    op.drop_table("material_craft_table")
    op.drop_table("craft")
