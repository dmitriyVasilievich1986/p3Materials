import * as React from "react";

import { Divider, Form, Input, Select } from "antd";

import type { ShadowType } from "../../../reducers/types";

import axios from "axios";
import { encode } from "rison";

type ArcanaType = {
  id: number;
  name: string;
};

function MainDetails() {
  const [floors, setFloors] = React.useState<number[]>([]);
  const [arcanas, setArcanas] = React.useState<ArcanaType[]>([]);

  React.useEffect(() => {
    getArcanas();
  }, []);

  const getArcanas = () => {
    if (arcanas.length > 0) return;
    axios
      .get("/api/v1/shadow/arcanas")
      .then((response: { data: { result: ArcanaType[] } }) => {
        setArcanas(response.data.result);
      });
  };

  const getFloors = (page: number = 0) => {
    if (floors.length > 0) return;
    const p = encode({
      page: page,
      page_size: 100,
    });
    axios
      .get(`/api/v1/floor/?q=${p}`)
      .then(
        (response: { data: { result: { id: number }[]; count: number } }) => {
          setFloors((f) => [...f, ...response.data.result.map((f) => f.id)]);
          if (response.data.count > (page + 1) * 100) {
            getFloors(page + 1);
          }
        }
      );
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
          options={floors.map((f) => ({ label: f, value: f }))}
          onOpenChange={() => getFloors(0)}
          maxTagCount={5}
          mode="multiple"
        />
      </Form.Item>
    </>
  );
}

export default MainDetails;
