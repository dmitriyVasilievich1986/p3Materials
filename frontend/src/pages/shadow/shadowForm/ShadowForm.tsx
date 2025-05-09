import * as React from "react";
import * as style from "./style.scss";

import { Button, Card, Flex, Form, Space } from "antd";
import { useNavigate, useParams } from "react-router";

import MainDetails from "./MainDetails";
import { APIUrls, PagesUrls } from "../../../constants";
import type { ShadowType } from "../../../reducers/types";
import Weakneses from "./Weakneses";

import axios from "axios";
import classnames from "classnames/bind";
import { updateShadow } from "../../../reducers/shadowSlice";
import { useDispatch } from "react-redux";

const cx = classnames.bind(style);

function ShadowForm() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm<ShadowType<number>>();

  const [currentShadow, setCurrentShadow] =
    React.useState<ShadowType<number> | null>(null);

  const getShadow = () => {
    axios
      .get(`${APIUrls.shadow.url}${params.shadowId}`)
      .then((response: { data: { result: ShadowType<{ id: number }> } }) => {
        const newFloors = response.data.result.floors.map((f) => f.id);
        setCurrentShadow({ ...response.data.result, floors: newFloors });
      });
  };

  React.useEffect(() => {
    if (params.shadowId) {
      getShadow();
    }
  }, [params]);

  const putHandler = (data: ShadowType<number>, id: number) => {
    axios
      .put(`${APIUrls.shadow.url}${id}`, data)
      .then((response: { data: { result: ShadowType<number> } }) => {
        setCurrentShadow(response.data.result);
        dispatch(updateShadow(response.data.result));
      });
  };

  const postHandler = (data: ShadowType<number>) => {
    axios
      .post(APIUrls.shadow.url, data)
      .then(
        (response: { data: { id: number; result: ShadowType<number> } }) => {
          navigate(`${PagesUrls.shadow.url}${response.data.id}`);
        }
      );
  };

  const onFinish = (values: ShadowType<number>) => {
    const id = values.id;
    delete values.id;
    if (!id) {
      postHandler(values);
    } else {
      putHandler(values, id);
    }
  };

  if (!currentShadow && !!params.shadowId) return null;
  return (
    <Flex justify="center" className={cx("shadow-form-container")}>
      <Card variant="outlined" loading={!currentShadow && !!params.shadowId}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            id: params?.shadowId,
            name: currentShadow?.name ?? "",
            stats: currentShadow?.stats ?? "Lvl 0, HP 0, SP 0",
            arcana: currentShadow?.arcana ?? 0,
            floors: currentShadow?.floors ?? [],
            slash: currentShadow?.slash ?? "Normal",
            strike: currentShadow?.strike ?? "Normal",
            pierce: currentShadow?.pierce ?? "Normal",
            fire: currentShadow?.fire ?? "Normal",
            ice: currentShadow?.ice ?? "Normal",
            lightning: currentShadow?.lightning ?? "Normal",
            wind: currentShadow?.wind ?? "Normal",
            light: currentShadow?.light ?? "Normal",
            darkness: currentShadow?.darkness ?? "Normal",
          }}
        >
          <div style={{ width: "100%" }}>
            <Flex justify="center" gap="large" wrap>
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <MainDetails />
              </div>
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <Weakneses />
              </div>
            </Flex>
          </div>

          <Space>
            {params.shadowId && (
              <Form.Item label={null}>
                <Button
                  color="purple"
                  variant="solid"
                  onClick={() => {
                    form.setFieldsValue({ id: parseInt(params.shadowId) });
                    form.submit();
                  }}
                >
                  Update
                </Button>
              </Form.Item>
            )}

            <Form.Item label={null}>
              <Button
                type="primary"
                onClick={() => {
                  form.setFieldsValue({ id: undefined });
                  form.submit();
                }}
              >
                Create
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </Flex>
  );
}

export default ShadowForm;
