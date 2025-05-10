export type FloorType = {
  id: number;
};

export type ArcanaType = {
  id: number;
  name: string;
};

export type ShadowSimpleType = {
  id: number;
  name: string;
};

export type ShadowType<F = number> = {
  id?: number;
  name: string;
  stats: string;
  arcana: number;
  slash: string;
  strike: string;
  pierce: string;
  fire: string;
  ice: string;
  lightning: string;
  wind: string;
  light: string;
  darkness: string;
  floors?: F[];
};

export type ShadowSliceInitialStateType = {
  shadows: ShadowSimpleType[];
  shadow: ShadowType | null;
  arcanas: ArcanaType[];
  damageModifiers: string[];
  floors: FloorType[];
};

export type MaterialSimpleType = {
  id: number;
  name: string;
};

export type MaterialType<S = number, C = number> = {
  id?: number;
  name: string;
  price: number;
  crafts: C[];
  shadows: S[];
};

export type MaterialSliceInitialStateType = {
  materials: MaterialSimpleType[];
  material: MaterialType | null;
};
