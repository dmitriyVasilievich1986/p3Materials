import * as React from "react";
import * as style from "./style.scss";

import Body from "./Body";
import Header from "./Header";

import classnames from "classnames/bind";

const cx = classnames.bind(style);

function CraftList() {
  return (
    <div className={cx("shadow-list")}>
      <Header />
      <Body />
    </div>
  );
}

export default CraftList;
