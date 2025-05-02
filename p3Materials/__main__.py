from enum import Enum

import click
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import and_, true

from p3Materials.config import SQLALCHEMY_DATABASE_URI
from p3Materials.models import (
    Craft,
    floor_shadow_table,
    Material,
    material_craft_table,
    material_shadow_table,
    Shadow,
)


class Objects(Enum):
    Material = "Material"
    Shadow = "Shadow"
    Craft = "Craft"


def get_shadows(
    session: Session, floors: tuple[int], names: tuple[str]
) -> list[Shadow]:
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
) -> list[Material]:
    materials = (
        session.query(Material)
        .join(material_shadow_table, Material.id == material_shadow_table.c.material_id)
        .join(Shadow, Shadow.id == material_shadow_table.c.shadow_id)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(
            and_(
                floor_shadow_table.c.floor_id.in_(floors) if floors else true,
                Material.name.in_(names) if names else true,
            )
        )
        .all()
    )

    return materials


def get_crafts(session: Session, floors: tuple[int], names: tuple[str]) -> list[Craft]:
    crafts = (
        session.query(Craft)
        .join(material_craft_table, Craft.id == material_craft_table.c.craft_id)
        .join(Material, Material.id == material_craft_table.c.material_id)
        .join(material_shadow_table, Material.id == material_shadow_table.c.material_id)
        .join(Shadow, Shadow.id == material_shadow_table.c.shadow_id)
        .join(floor_shadow_table, Shadow.id == floor_shadow_table.c.shadow_id)
        .filter(
            and_(
                floor_shadow_table.c.floor_id.in_(floors) if floors else true,
                Craft.name.in_(names) if names else true,
            )
        )
        .all()
    )

    return crafts


@click.command()
@click.option(
    "--object",
    "-O",
    type=click.Choice([str(x) for x in Objects.__members__], case_sensitive=False),
    default=Objects.Shadow.value,
)
@click.option("--floors", "-F", type=int, multiple=True, required=False)
@click.option("--names", "-N", type=str, multiple=True, required=False)
def main(object: str, floors: tuple[int], names: tuple[str]) -> None:
    engine = create_engine(SQLALCHEMY_DATABASE_URI)
    session = Session(engine)

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

    session.close()
    engine.dispose()


if __name__ == "__main__":
    main()
