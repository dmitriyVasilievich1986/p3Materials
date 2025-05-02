from enum import Enum

import click
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

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


def get_shadows(floors: list[int]) -> list[Shadow]:
    """
    Get shadows from the database that are on the specified floors.

    :param floors: List of floor numbers to filter shadows by.

    :return: List of Shadow objects.
    """

    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    session = Session(engine)

    shadows = (
        session.query(Shadow)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(floor_shadow_table.c.floor_id.in_(floors))
        .all()
    )

    session.close()
    engine.dispose()
    return shadows


def get_materials(floors: list[int]) -> list[Material]:
    """
    Get materials from the database that are on the specified floors.

    :param floors: List of floor numbers to filter materials by.

    :return: List of Material objects.
    """

    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    session = Session(engine)

    materials = (
        session.query(Material)
        .join(material_shadow_table, Material.id == material_shadow_table.c.material_id)
        .join(Shadow, Shadow.id == material_shadow_table.c.shadow_id)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(floor_shadow_table.c.floor_id.in_(floors))
        .all()
    )

    session.close()
    engine.dispose()
    return materials


@click.command()
@click.option(
    "--object",
    "-O",
    type=click.Choice([str(x) for x in Objects.__members__], case_sensitive=False),
    default=Objects.Shadow.value,
)
@click.option("--floor", "-F", type=int, multiple=True, required=True)
def main(object: str, floor: list[int]):
    match object:
        case Objects.Shadow.value:
            shadows = get_shadows(floor)
            for shadow in shadows:
                click.echo(
                    f"Shadow ID: {shadow.id}, Name: {shadow.name}, Floors: {floor}"
                )
        case Objects.Material.value:
            materials = get_materials(floor)
            for material in materials:
                click.echo(
                    f"Material ID: {material.id}, Name: {material.name}, Price: {material.price}, Floors: {floor}"
                )


if __name__ == "__main__":
    main()
