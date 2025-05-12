import * as React from "react";
import * as style from "./style.scss";

import { Flex, Table, TableColumnsType } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import type { CraftSimpleType } from "../../../reducers/types";
import { PagesUrls } from "../../../constants";

import classnames from "classnames/bind";
import { useCraftCaller } from "../../../reducers/hooks";

const cx = classnames.bind(style);

const columns: TableColumnsType<CraftSimpleType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "1",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "2",
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
];

function Body() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [crafts, fillCrafts] = useCraftCaller();

  React.useEffect(() => {
    fillCrafts();
  }, []);

  const craftsForData = () => {
    const nameFilter = searchParams.get("nameFilter");
    return crafts
      .filter(
        (s) =>
          !nameFilter || s.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .map((s) => ({ ...s, key: s.id }));
  };

  return (
    <div className={cx("shadow-list-body-container")}>
      <Flex justify="center" className={cx("row")}>
        <Table<CraftSimpleType>
          dataSource={craftsForData()}
          style={{ width: "90%" }}
          columns={columns}
          size="middle"
          pagination={{
            showSizeChanger: false,
            current: parseInt(searchParams.get("page")) || 1,
          }}
          onChange={(pagination) => {
            setSearchParams((prev) => {
              prev.set("page", `${pagination.current}`);
              return prev;
            });
          }}
          onRow={(record) => {
            return {
              onClick: () =>
                navigate(
                  `${PagesUrls.craft.url}${record.id}${location.search}`
                ),
            };
          }}
        />
      </Flex>
    </div>
  );
}

export default Body;
