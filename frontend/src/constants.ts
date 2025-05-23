export type APIUrlsType = {
  name: string;
  url: string;
};

export type PagesUrlsType = APIUrlsType & {
  label: string;
  isNavigation?: boolean;
};

export const APIUrls: { [key: string]: APIUrlsType } = {
  shadow: {
    name: "shadow",
    url: "/api/v1/shadow/",
  },
  shadowSimple: {
    name: "shadow",
    url: "/api/v1/shadow/simple",
  },
  damageMultiplier: {
    name: "damageMultiplier",
    url: "/api/v1/shadow/damage_multiplier",
  },
  arcanas: {
    name: "damageMultiplier",
    url: "/api/v1/shadow/arcanas",
  },
  floor: {
    name: "floor",
    url: "/api/v1/floor/",
  },
  floorSimple: {
    name: "floor",
    url: "/api/v1/floor/simple",
  },
  material: {
    name: "material",
    url: "/api/v1/material/",
  },
  materialSimple: {
    name: "material",
    url: "/api/v1/material/simple",
  },
  craft: {
    name: "craft",
    url: "/api/v1/craft/",
  },
  craftSimple: {
    name: "craftSimple",
    url: "/api/v1/craft/simple",
  },
  craftTypes: {
    name: "craftTypes",
    url: "/api/v1/craft/types",
  },
};

export const PagesUrls: { [key: string]: PagesUrlsType } = {
  home: {
    label: "Home",
    name: "home",
    url: "/",
    isNavigation: true,
  },
  shadowList: {
    label: "Shadow",
    name: "shadowList",
    url: "/shadow/",
    isNavigation: true,
  },
  shadow: {
    label: "Shadow",
    name: "shadow",
    url: "/shadow/",
  },
  shadowCreate: {
    label: "Shadow",
    name: "shadowCreate",
    url: "/shadow/create",
  },
  floorList: {
    label: "Floor",
    name: "floorList",
    url: "/floor/",
    isNavigation: true,
  },
  floor: {
    label: "Floor",
    name: "floor",
    url: "/floor/",
  },
  materialList: {
    label: "Material",
    name: "materialList",
    url: "/material/",
    isNavigation: true,
  },
  material: {
    label: "Material",
    name: "material",
    url: "/material/",
  },
  materialCreate: {
    label: "Material",
    name: "materialCreate",
    url: "/material/create",
  },
  craftList: {
    label: "Craft",
    name: "craftList",
    url: "/craft/",
    isNavigation: true,
  },
  craft: {
    label: "Craft",
    name: "craft",
    url: "/craft/",
  },
  craftCreate: {
    label: "Craft",
    name: "craftCreate",
    url: "/craft/create",
  },
};
