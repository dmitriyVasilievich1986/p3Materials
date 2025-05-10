import * as React from "react";

import { Divider, Form, Input, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { APIUrls } from "../../../constants";
import type { CraftType } from "../../../reducers/types";
import { RootState } from "../../../store";

import axios from "axios";
import { setTypes } from "../../../reducers/craftSlice";
import { useMaterialCaller } from "../../../reducers/hooks";

function MainDetails() {
  const dispatch = useDispatch();

  const types = useSelector((state: RootState) => state.craft.types);

  const [materials, fillMaterials] = useMaterialCaller();

  React.useEffect(() => {
    fillMaterials();
  }, []);

  const getTypes = () => {
    if (types.length > 0) return;
    axios
      .get(APIUrls.craftTypes.url)
      .then((response: { data: { result: string[] } }) => {
        dispatch(setTypes(response.data.result));
      });
  };

  return (
    <>
      <Divider style={{ marginTop: "0" }}>Main details</Divider>

      <Form.Item<CraftType> name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item<CraftType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name for shadow!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<CraftType> label="Description" name="description">
        <Input />
      </Form.Item>

      <Form.Item<CraftType> label="Buff" name="buff">
        <Input />
      </Form.Item>

      <Form.Item<CraftType> label="Stats" name="stats">
        <Input />
      </Form.Item>

      <Form.Item<CraftType> label="Type" name="type">
        <Select
          options={types.map((t) => ({ label: t, value: t }))}
          onOpenChange={getTypes}
        />
      </Form.Item>

      <Form.Item<CraftType> label="Materials" name="materials">
        <Select
          options={materials.map((m) => ({ label: m.name, value: m.id }))}
          optionFilterProp="label"
          maxTagCount={5}
          mode="multiple"
        />
      </Form.Item>
    </>
  );
}

export default MainDetails;
