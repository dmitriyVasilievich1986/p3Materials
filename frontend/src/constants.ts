export type PagesUrlsType = {
  label: string;
  name: string;
  url: string;
  isNavigation?: boolean;
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
    name: "shadow",
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
    name: "shadow",
    url: "/shadow/create",
  },
};
