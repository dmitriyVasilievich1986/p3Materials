import * as React from "react";

import type { ArcanaType, ShadowType } from "../../../reducers/types";
import { Divider, Form, Input, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useFloorsCaller, useMaterialCaller } from "../../../reducers/hooks";

import { APIUrls } from "../../../constants";
import { RootState } from "../../../store";

import axios from "axios";
import { setArcanas } from "../../../reducers/shadowSlice";

function MainDetails() {
  const dispatch = useDispatch();

  const arcanas = useSelector((state: RootState) => state.shadow.arcanas);
  const [materials, fillMaterials] = useMaterialCaller();
  const [floors, fillFloors] = useFloorsCaller();

  React.useEffect(() => {
    fillMaterials();
    if (arcanas.length > 0) return;
    axios
      .get(APIUrls.arcanas.url)
      .then((response: { data: { result: ArcanaType[] } }) => {
        dispatch(setArcanas(response.data.result));
      });
  }, []);

  return (
    <>
      <Divider style={{ marginTop: "0" }}>Main details</Divider>

      <Form.Item<ShadowType> name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item<ShadowType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name for shadow!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ShadowType> label="Stats" name="stats">
        <Input />
      </Form.Item>

      <Form.Item<ShadowType> label="Arcana" name="arcana">
        <Select
          options={arcanas.map((a) => ({
            label: a.name,
            value: a.id,
            key: a.id,
          }))}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Floors" name="floors">
        <Select
          options={floors.map((f) => ({ label: f.id, value: f.id, key: f.id }))}
          onOpenChange={fillFloors}
          maxTagCount={5}
          mode="multiple"
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Materials" name="materials">
        <Select
          options={materials.map((s) => ({
            label: s.name,
            value: s.id,
            key: s.id,
          }))}
          optionFilterProp="label"
          maxTagCount={6}
          mode="multiple"
        />
      </Form.Item>
    </>
  );
}

export default MainDetails;
