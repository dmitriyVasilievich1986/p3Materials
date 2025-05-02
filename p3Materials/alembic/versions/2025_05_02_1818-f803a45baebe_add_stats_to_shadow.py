"""Add stats to Shadow

Revision ID: f803a45baebe
Revises: 98550f5a0b31
Create Date: 2025-05-02 18:18:18.364541

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "f803a45baebe"
down_revision: str | None = "98550f5a0b31"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    with op.batch_alter_table("shadow", schema=None) as batch_op:
        batch_op.add_column(sa.Column("stats", sa.String(255), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table("shadow", schema=None) as batch_op:
        batch_op.drop_column("stats")
