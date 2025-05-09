import * as React from "react";
import * as style from "./style.scss";

import { Button, Flex, Form, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import { PagesUrls } from "../../../constants";
import classnames from "classnames/bind";

const { Search } = Input;

const cx = classnames.bind(style);

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
        <Button
          type="primary"
          onClick={() => navigate(PagesUrls.shadowCreate.url)}
        >
          Create new +
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
