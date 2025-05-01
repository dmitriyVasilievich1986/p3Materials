"""Create material table

Revision ID: 8adca1fcc905
Revises: ba1e712e5e78
Create Date: 2025-05-01 22:14:29.758942

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "8adca1fcc905"
down_revision: str | None = "ba1e712e5e78"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "material",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("price", sa.Integer, nullable=False, default=0),
    )
    op.create_table(
        "material_shadow_table",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("shadow_id", sa.Integer, sa.ForeignKey("shadow.id")),
        sa.Column("material_id", sa.Integer, sa.ForeignKey("material.id")),
    )


def downgrade() -> None:
    op.drop_table("material_shadow_table")
    op.drop_table("material")
