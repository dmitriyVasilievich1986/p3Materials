from enum import Enum

import click
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import true

from p3Materials.config import SQLALCHEMY_DATABASE_URI
from p3Materials.models import (
    floor_shadow_table,
    Material,
    material_shadow_table,
    Shadow,
)


class Objects(Enum):
    Material = "Material"
    Shadow = "Shadow"


def get_shadows(session: Session, floors: tuple[int]) -> list[Shadow]:
    shadows = (
        session.query(Shadow)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(floor_shadow_table.c.floor_id.in_(floors) if floors else true)
        .all()
    )
    return shadows


def get_materials(session: Session, floors: tuple[int]) -> list[Material]:
    materials = (
        session.query(Material)
        .join(material_shadow_table, Material.id == material_shadow_table.c.material_id)
        .join(Shadow, Shadow.id == material_shadow_table.c.shadow_id)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(floor_shadow_table.c.floor_id.in_(floors) if floors else true)
        .all()
    )

    return materials


@click.command()
@click.option(
    "--object",
    "-O",
    type=click.Choice([str(x) for x in Objects.__members__], case_sensitive=False),
    default=Objects.Shadow.value,
)
@click.option("--floors", "-F", type=int, multiple=True, required=False)
def main(object: str, floors: tuple[int]):
    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    session = Session(engine)

    match object:
        case Objects.Shadow.value:
            shadows = get_shadows(floors=floors, session=session)
            for shadow in shadows:
                click.echo(str(shadow))
                for material in shadow.materials:
                    click.echo(f"\t{material}")
        case Objects.Material.value:
            materials = get_materials(floors=floors, session=session)
            for material in materials:
                click.echo(str(material))
                for shadow in material.shadows:
                    click.echo(f"\t{shadow}")

    session.close()
    engine.dispose()


if __name__ == "__main__":
    main()
