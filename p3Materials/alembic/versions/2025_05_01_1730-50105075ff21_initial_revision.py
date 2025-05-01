"""initial revision

Revision ID: 50105075ff21
Revises:
Create Date: 2025-05-01 17:30:42.963684

"""

from collections.abc import Sequence

# revision identifiers, used by Alembic.
revision: str = "50105075ff21"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
