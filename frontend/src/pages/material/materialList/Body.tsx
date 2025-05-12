import * as React from "react";
import * as style from "./style.scss";

import { Flex, Table, TableColumnsType } from "antd";
import { useNavigate, useSearchParams } from "react-router";

import type { MaterialSimpleType } from "../../../reducers/types";
import { PagesUrls } from "../../../constants";

import classnames from "classnames/bind";
import { useMaterialCaller } from "../../../reducers/hooks";

const cx = classnames.bind(style);

const columns: TableColumnsType<MaterialSimpleType> = [
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

  const [materials, fillMaterials] = useMaterialCaller();

  React.useEffect(() => {
    fillMaterials();
  }, []);

  const materialsForData = () => {
    const nameFilter = searchParams.get("nameFilter");
    return materials
      .filter(
        (m) =>
          !nameFilter || m.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .map((m) => ({ ...m, key: m.id }));
  };

  return (
    <div className={cx("shadow-list-body-container")}>
      <Flex justify="center" className={cx("row")}>
        <Table<MaterialSimpleType>
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
              onClick: () =>
                navigate(
                  `${PagesUrls.material.url}${record.id}${location.search}`
                ),
            };
          }}
        />
      </Flex>
    </div>
  );
}

export default Body;
