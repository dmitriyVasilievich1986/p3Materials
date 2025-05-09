import * as React from "react";

import type {
  ArcanaType,
  FloorType,
  ShadowSliceInitialStateType,
  ShadowType,
} from "../../../reducers/types";
import { Divider, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { APIUrls } from "../../../constants";
import { addFloors, setArcanas } from "../../../reducers/shadowSlice";

import axios from "axios";
import { encode } from "rison";

function MainDetails() {
  const dispatch = useDispatch();

  const arcanas = useSelector(
    (state: { shadow: ShadowSliceInitialStateType }) => state.shadow.arcanas
  );
  const floors: FloorType[] = useSelector(
    (state: { shadow: ShadowSliceInitialStateType }) => state.shadow.floors
  );

  React.useEffect(() => {
    if (arcanas.length > 0) return;
    axios
      .get(APIUrls.arcanas.url)
      .then((response: { data: { result: ArcanaType[] } }) => {
        dispatch(setArcanas(response.data.result));
      });
  }, []);

  const getFloors = (page: number = 0) => {
    if (floors.length > 0 && page === 0) return;
    const p = encode({
      page: page,
      page_size: 100,
    });
    axios
      .get(`${APIUrls.floor.url}?q=${p}`)
      .then((response: { data: { result: FloorType[]; count: number } }) => {
        dispatch(addFloors(response.data.result));
        if (response.data.count > (page + 1) * 100) {
          getFloors(page + 1);
        }
      });
  };

  return (
    <>
      <Divider style={{ marginTop: "0" }}>Main details</Divider>

      <Form.Item<ShadowType<number>> name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item<ShadowType<number>>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name for shadow!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Stats" name="stats">
        <Input />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Arcana" name="arcana">
        <Select
          options={arcanas.map((a) => ({ label: a.name, value: a.id }))}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Floors" name="floors">
        <Select
          options={floors.map((f) => ({ label: f.id, value: f.id }))}
          onOpenChange={() => getFloors(0)}
          maxTagCount={5}
          mode="multiple"
        />
      </Form.Item>
    </>
  );
}

export default MainDetails;
