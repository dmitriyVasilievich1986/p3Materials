from enum import Enum


class DamageMultiplier(Enum):
    Reflect = "Reflect"
    Absorb = "Absorb"
    Strong = "Strong"
    Normal = "Normal"
    Weak = "Weak"
    Null = "Null"


class CraftType(Enum):
    Consumables = "Consumables"
    Accessory = "Accessory"
    Weapon = "Weapon"
    Armor = "Armor"
    Boots = "Boots"
    Card = "Card"
