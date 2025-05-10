export type ShadowType<S = number, C = number> = {
  id?: number;
  name: string;
  price: number;
  crafts: C[];
  shadows: S[];
};
