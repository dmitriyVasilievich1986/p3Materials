import * as React from "react";

import { Divider, Form, Input, Select } from "antd";

import { useCraftCaller, useShadowCaller } from "../../../reducers/hooks";

import type { MaterialType } from "../../../reducers/types";

function MainDetails() {
  const [shadows, fillShadows] = useShadowCaller();
  const [crafts, fillCrafts] = useCraftCaller();

  React.useEffect(() => {
    fillShadows();
    fillCrafts();
  }, []);

  return (
    <>
      <Divider style={{ marginTop: "0" }}>Main details</Divider>

      <Form.Item<MaterialType> name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item<MaterialType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name for shadow!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<MaterialType> label="Price" name="price">
        <Input />
      </Form.Item>

      <Form.Item<MaterialType> label="Shadows" name="shadows">
        <Select
          options={shadows.map((s) => ({
            label: s.name,
            value: s.id,
            key: s.id,
          }))}
          optionFilterProp="label"
          maxTagCount={6}
          mode="multiple"
        />
      </Form.Item>

      <Form.Item<MaterialType> label="Crafts" name="crafts">
        <Select
          options={crafts.map((c) => ({
            label: c.name,
            value: c.id,
            key: c.id,
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
