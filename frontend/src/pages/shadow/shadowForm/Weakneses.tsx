import * as React from "react";

import { Divider, Form, Select } from "antd";

import { APIUrls } from "../../../constants";
import type { ShadowType } from "../../../reducers/types";

import axios from "axios";

function Weakneses() {
  const [damageModifiers, setDamageModifiers] = React.useState<string[]>([]);

  const getDamageModifiers = () => {
    if (damageModifiers.length > 0) return;
    axios
      .get(APIUrls.damageModifiers.url)
      .then((response: { data: { result: string[] } }) => {
        setDamageModifiers(response.data.result);
      });
  };

  return (
    <>
      <Divider style={{ marginTop: "0" }}>Weakneses</Divider>

      <Form.Item<ShadowType<number>> label="Slash" name="slash">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Strike" name="strike">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Pierce" name="pierce">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Fire" name="fire">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Ice" name="ice">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Lightning" name="lightning">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Wind" name="wind">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Light" name="light">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType<number>> label="Darkness" name="darkness">
        <Select
          options={damageModifiers.map((dm) => ({ label: dm, value: dm }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>
    </>
  );
}

export default Weakneses;
