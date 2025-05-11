from enum import Enum
from typing import TYPE_CHECKING

import click
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import and_, true

from p3Materials import db
from p3Materials.cli.main import main

if TYPE_CHECKING:
    from p3Materials.models import (
        Craft,
        Material,
        Shadow,
    )


class Objects(Enum):
    Material = "Material"
    Shadow = "Shadow"
    Craft = "Craft"


def get_shadows(
    session: Session, floors: tuple[int], names: tuple[str]
) -> list["Shadow"]:
    from p3Materials.models import (
        floor_shadow_table,
        Shadow,
    )

    shadows = (
        session.query(Shadow)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(
            and_(
                floor_shadow_table.c.floor_id.in_(floors) if floors else true,
                Shadow.name.in_(names) if names else true,
            )
        )
        .all()
    )
    return shadows


def get_materials(
    session: Session, floors: tuple[int], names: tuple[str]
) -> list["Material"]:
    from p3Materials.models import (
        floor_shadow_table,
        Material,
        material_shadow_table,
        Shadow,
    )

    materials = (
        session.query(Material)
        .join(material_shadow_table, Material.id == material_shadow_table.c.material_id)
        .join(Shadow, Shadow.id == material_shadow_table.c.shadow_id, isouter=True)
        .join(
            floor_shadow_table,
            Shadow.id == floor_shadow_table.c.shadow_id,
            isouter=True,
        )
        .filter(
            and_(
                floor_shadow_table.c.floor_id.in_(floors) if floors else true,
                Material.name.in_(names) if names else true,
            )
        )
        .all()
    )

    return materials


def get_crafts(
    session: Session, floors: tuple[int], names: tuple[str]
) -> list["Craft"]:
    from p3Materials.models import (
        Craft,
        floor_shadow_table,
        Material,
        material_craft_table,
        material_shadow_table,
        Shadow,
    )

    crafts = (
        session.query(Craft)
        .join(
            material_craft_table,
            Craft.id == material_craft_table.c.craft_id,
            isouter=True,
        )
        .join(Material, Material.id == material_craft_table.c.material_id, isouter=True)
        .join(
            material_shadow_table,
            Material.id == material_shadow_table.c.material_id,
            isouter=True,
        )
        .join(Shadow, Shadow.id == material_shadow_table.c.shadow_id, isouter=True)
        .join(
            floor_shadow_table,
            Shadow.id == floor_shadow_table.c.shadow_id,
            isouter=True,
        )
        .filter(
            and_(
                floor_shadow_table.c.floor_id.in_(floors) if floors else true,
                Craft.name.in_(names) if names else true,
            )
        )
        .all()
    )

    return crafts


@main.command()
@click.option(
    "--object",
    "-O",
    type=click.Choice([str(x) for x in Objects.__members__], case_sensitive=False),
    default=Objects.Shadow.value,
    help='the name of the object for which you want to get information. Choices: [material|shadow|craft]. Default: "shadow"',
)
@click.option(
    "--floors",
    "-F",
    type=int,
    multiple=True,
    required=False,
    help="you can filter the result by specifying floors.",
)
@click.option(
    "--names",
    "-N",
    type=str,
    multiple=True,
    required=False,
    help="you can filter the result by specifying names.",
)
def p3m(object: str, floors: tuple[int], names: tuple[str]) -> None:
    """
    Handles the processing and display of objects, materials, and crafts based on the provided parameters.
    """

    from p3Materials.models import material_craft_table

    session = db.session

    match object:
        case Objects.Shadow.value:
            shadows = get_shadows(floors=floors, names=names, session=session)
            for shadow in shadows:
                click.echo(str(shadow))
                for material in shadow.materials:
                    click.echo(f"\t{material}")
        case Objects.Material.value:
            materials = get_materials(floors=floors, names=names, session=session)
            for material in materials:
                click.echo(str(material))
                for shadow in material.shadows:
                    click.echo(f"\t{shadow}")
        case Objects.Craft.value:
            crafts = get_crafts(floors=floors, names=names, session=session)
            for craft in crafts:
                click.echo(str(craft))
                for material in craft.materials:
                    count = (
                        session.query(material_craft_table.c.count)
                        .filter(
                            and_(
                                material_craft_table.c.material_id == material.id,
                                material_craft_table.c.craft_id == craft.id,
                            )
                        )
                        .scalar()
                    )
                    click.echo(f"\t{material} x {count}")
