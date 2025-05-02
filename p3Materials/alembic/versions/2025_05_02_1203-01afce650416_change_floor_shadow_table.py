"""Change floor_shadow table

Revision ID: 01afce650416
Revises: 8adca1fcc905
Create Date: 2025-05-02 12:03:46.578061

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "01afce650416"
down_revision: str | None = "8adca1fcc905"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "floor",
        sa.Column("id", sa.Integer, primary_key=True),
    )

    with op.batch_alter_table("floor_shadow_table", schema=None) as batch_op:
        batch_op.add_column(sa.Column("floor_id", sa.Integer))
        batch_op.create_foreign_key(
            "fk_floor_shadow_table_floor_id",
            "floor",
            ["floor_id"],
            ["id"],
        )
        batch_op.drop_column("floor")


def downgrade() -> None:
    with op.batch_alter_table("floor_shadow_table", schema=None) as batch_op:
        batch_op.drop_constraint("fk_floor_shadow_table_floor_id", type_="foreignkey")
        batch_op.drop_column("floor_id")
        batch_op.add_column(sa.Column("floor", sa.Integer))

    op.drop_table("floor")
