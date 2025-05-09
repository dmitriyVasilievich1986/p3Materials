import * as React from "react";
import * as style from "./style.scss";

import { APIUrls, PagesUrls } from "../../../constants";
import { Flex, Pagination, Table, TableColumnsType } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import { RootState } from "../../../store";
import type { ShadowType } from "../../../reducers/types";

import axios from "axios";
import classnames from "classnames/bind";

import { encode } from "rison";
import { setShadows } from "../../../reducers/shadowSlice";

const cx = classnames.bind(style);

const columns: TableColumnsType<ShadowType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "1",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "2",
  },
];

function Body() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shadows: ShadowType[] = useSelector(
    (state: RootState) => state.shadow.shadows
  );

  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    const nameFilter = searchParams.get("nameFilter") ?? "";
    const filters =
      nameFilter === "" ? [] : [{ col: "name", opr: "ct", value: nameFilter }];
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page"))
      : 1;
    const pageSize = searchParams.get("pageSize")
      ? parseInt(searchParams.get("pageSize"))
      : 10;
    const p = encode({
      page: page - 1,
      page_size: pageSize,
      filters,
    });

    axios
      .get(`${APIUrls.shadow.url}?q=${p}`)
      .then((response: { data: { result: ShadowType[]; count: number } }) => {
        dispatch(setShadows(response.data.result));
        setTotal(response.data.count);
      });
  }, [searchParams]);

  return (
    <div className={cx("shadow-list-body-container")}>
      <Flex justify="center" className={cx("row")}>
        <Table<ShadowType>
          style={{ width: "90%" }}
          columns={columns}
          dataSource={shadows.map((s) => ({ ...s, key: s.id }))}
          size="middle"
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => navigate(`${PagesUrls.shadow.url}${record.id}`),
            };
          }}
        />
      </Flex>
      <Flex justify="end" className={cx("row")}>
        <Pagination
          total={total}
          showSizeChanger={false}
          current={
            searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
          }
          onChange={(v) =>
            setSearchParams((prev) => {
              prev.set("page", v.toString());
              return prev;
            })
          }
        />
      </Flex>
    </div>
  );
}

export default Body;
