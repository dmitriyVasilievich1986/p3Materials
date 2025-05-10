import * as React from "react";

import { Divider, Form, Input, Select } from "antd";

import type { FloorType } from "../../../reducers/types";

import { useShadowCaller } from "../../../reducers/hooks";

function MainDetails() {
  const [shadows, fillShadows] = useShadowCaller();

  React.useEffect(() => {
    fillShadows();
  }, []);

  return (
    <>
      <Divider style={{ marginTop: "0" }}>Main details</Divider>

      <Form.Item<FloorType> name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item<FloorType> label="Shadows" name="shadows">
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
