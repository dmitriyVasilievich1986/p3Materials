import * as React from "react";
import * as style from "./style.scss";

import { Flex, Table, TableColumnsType } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router";

import { PagesUrls } from "../../../constants";
import type { ShadowSimpleType } from "../../../reducers/types";

import classnames from "classnames/bind";
import { useShadowCaller } from "../../../reducers/hooks";

const cx = classnames.bind(style);

const columns: TableColumnsType<ShadowSimpleType> = [
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
  const location = useLocation();

  const [shadows, fillShadows] = useShadowCaller();

  React.useEffect(() => {
    fillShadows();
  }, []);

  const shadowForData = () => {
    const nameFilter = searchParams.get("nameFilter");
    return shadows
      .filter(
        (s) =>
          !nameFilter || s.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .map((s) => ({ ...s, key: s.id }));
  };

  return (
    <div className={cx("shadow-list-body-container")}>
      <Flex justify="center" className={cx("row")}>
        <Table<ShadowSimpleType>
          dataSource={shadowForData()}
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
                  `${PagesUrls.shadow.url}${record.id}${location.search}`
                ),
            };
          }}
        />
      </Flex>
    </div>
  );
}

export default Body;
