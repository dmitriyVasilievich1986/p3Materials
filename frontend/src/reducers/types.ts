export type ShadowType<F> = {
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
  shadows: ShadowType<number>[];
  shadow: ShadowType<number> | null;
};
