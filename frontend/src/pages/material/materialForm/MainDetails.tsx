import * as React from "react";

import { Divider, Form, Input, Select } from "antd";

import type { MaterialType } from "../../../reducers/types";

import { shadowsCaller } from "../../../reducers/callers";

function MainDetails() {
  const [shadows, fillShadows] = shadowsCaller();

  React.useEffect(() => {
    fillShadows();
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
    </>
  );
}

export default MainDetails;
