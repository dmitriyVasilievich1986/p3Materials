import * as React from "react";

import { Breadcrumb as AntdBreadcrumb } from "antd";

import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router";
import { useLocation } from "react-router";

function Breadcrumb() {
  const location = useLocation();

  const getSplitedPath = () => {
    return location.pathname.split("/").filter((p) => p !== "");
  };

  const getitems = (): ItemType[] => {
    const home = [{ title: "Home", path: "/" }];
    return [
      ...home,
      ...getSplitedPath().map((p) => ({ title: p, path: `/${p}/` })),
    ];
  };

  function itemRender(props: ItemType) {
    const splitedPathes = getSplitedPath();
    const lastPath = splitedPathes?.[splitedPathes.length - 1] ?? "";
    const isLast = `/${lastPath}/` === props.path || lastPath === "";
    if (isLast) {
      return <span>{props.title}</span>;
    }
    return <Link to={props!.path}>{props.title}</Link>;
  }

  return (
    <div style={{ margin: "16px 0" }}>
      <AntdBreadcrumb items={getitems()} itemRender={itemRender} />
    </div>
  );
}

export default Breadcrumb;
