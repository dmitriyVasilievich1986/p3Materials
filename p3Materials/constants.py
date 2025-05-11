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


class Arcanas(Enum):
    Fool = 0
    Magician = 1
    Priestess = 2
    Empress = 3
    Emperor = 4
    Hierophant = 5
    Lovers = 6
    Chariot = 7
    Justice = 8
    Hermit = 9
    Fortune = 10
    Strength = 11
    Hanged = 12
