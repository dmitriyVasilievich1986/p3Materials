import * as React from "react";

import type {
  ShadowSliceInitialStateType,
  ShadowType,
} from "../../../reducers/types";
import { Divider, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { APIUrls } from "../../../constants";
import { setDamageModifiers } from "../../../reducers/shadowSlice";

import axios from "axios";

function Weakneses() {
  const dispatch = useDispatch();

  const damageModifiers = useSelector(
    (state: { shadow: ShadowSliceInitialStateType }) =>
      state.shadow.damageModifiers
  );

  const getDamageModifiers = () => {
    if (damageModifiers.length > 0) return;
    axios
      .get(APIUrls.damageMultiplier.url)
      .then((response: { data: { result: string[] } }) => {
        dispatch(setDamageModifiers(response.data.result));
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
