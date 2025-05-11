import * as React from "react";

import { Divider, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { APIUrls } from "../../../constants";
import { RootState } from "../../../store";
import type { ShadowType } from "../../../reducers/types";

import axios from "axios";
import { setDamageModifiers } from "../../../reducers/shadowSlice";

function Weakneses() {
  const dispatch = useDispatch();

  const damageModifiers = useSelector(
    (state: RootState) => state.shadow.damageModifiers
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

      <Form.Item<ShadowType> label="Slash" name="slash">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Strike" name="strike">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Pierce" name="pierce">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Fire" name="fire">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Ice" name="ice">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Lightning" name="lightning">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Wind" name="wind">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Light" name="light">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>

      <Form.Item<ShadowType> label="Darkness" name="darkness">
        <Select
          options={damageModifiers.map((dm) => ({
            label: dm,
            value: dm,
            key: dm,
          }))}
          onOpenChange={getDamageModifiers}
        />
      </Form.Item>
    </>
  );
}

export default Weakneses;
