from enum import Enum


class DamageMultiplier(Enum):
    Reflect = "Reflect"
    Absorb = "Absorb"
    Strong = "Strong"
    Normal = "Normal"
    Weak = "Weak"
    Null = "Null"


class CraftType(Enum):
    Accessory = "Accessory"
    Weapon = "Weapon"
    Armor = "Armor"
