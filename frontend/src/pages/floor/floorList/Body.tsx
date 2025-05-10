import * as React from "react";
import * as style from "./style.scss";

import { Flex, Table, TableColumnsType } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import type { FloorSimpleType } from "../../../reducers/types";
import { PagesUrls } from "../../../constants";

import classnames from "classnames/bind";
import { useFloorsCaller } from "../../../reducers/hooks";

const cx = classnames.bind(style);

const columns: TableColumnsType<FloorSimpleType> = [
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
    sorter: (a, b) => a.id - b.id,
  },
];

function Body() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [floors, fillFloors] = useFloorsCaller();

  React.useEffect(() => {
    fillFloors();
  }, []);

  const materialsForData = () => {
    const nameFilter = searchParams.get("nameFilter");
    return floors
      .filter(
        (f) =>
          !nameFilter ||
          String(f.id).toLowerCase().includes(nameFilter.toLowerCase())
      )
      .map((m) => ({ ...m, key: m.id, name: m.id }));
  };

  return (
    <div className={cx("shadow-list-body-container")}>
      <Flex justify="center" className={cx("row")}>
        <Table<FloorSimpleType>
          dataSource={materialsForData()}
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
              onClick: () => navigate(`${PagesUrls.floor.url}${record.id}`),
            };
          }}
        />
      </Flex>
    </div>
  );
}

export default Body;
