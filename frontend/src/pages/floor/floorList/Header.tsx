import * as React from "react";
import * as style from "./style.scss";

import { Flex, Form, Input } from "antd";

import classnames from "classnames/bind";
import { useSearchParams } from "react-router";

const { Search } = Input;

const cx = classnames.bind(style);

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [nameFilter, setNameFilter] = React.useState<string>(
    searchParams.get("nameFilter") ?? ""
  );

  const searchHandler = () => {
    setSearchParams((prev) => {
      if (nameFilter === "") {
        prev.delete("nameFilter");
      } else {
        prev.set("nameFilter", nameFilter);
        prev.set("page", "1");
      }
      return prev;
    });
  };

  return (
    <Flex justify="center">
      <Flex
        justify="space-between"
        className={cx("shadow-list-header-container")}
      >
        <Form onFinish={searchHandler}>
          <Search
            placeholder="Search by name"
            value={nameFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNameFilter(e.target.value)
            }
          />
        </Form>
      </Flex>
    </Flex>
  );
}

export default Header;
