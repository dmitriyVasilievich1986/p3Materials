import * as React from "react";
import * as style from "./style.scss";

import { APIUrls, PagesUrls } from "../../../constants";
import { Button, Card, Flex, Form, Space } from "antd";

import { addShadow, updateShadow } from "../../../reducers/shadowSlice";
import { useNavigate, useParams } from "react-router";

import MainDetails from "./MainDetails";
import { MessageInstance } from "antd/es/message/interface";
import type { ShadowType } from "../../../reducers/types";
import Weakneses from "./Weakneses";

import axios from "axios";
import classnames from "classnames/bind";
import { useDispatch } from "react-redux";

const cx = classnames.bind(style);

function ShadowForm(props: { messageApi: MessageInstance }) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm<ShadowType>();

  const [currentShadow, setCurrentShadow] = React.useState<ShadowType | null>(
    null
  );

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

  const putHandler = (data: ShadowType, id: number) => {
    axios
      .put(`${APIUrls.shadow.url}${id}`, data)
      .then((response: { data: { result: ShadowType } }) => {
        const updated = response.data.result;
        setCurrentShadow(updated);
        props.messageApi.success("Shadow updated successfully");
        dispatch(updateShadow({ id: updated.id, name: updated.name }));
      })
      .catch((error) => {
        props.messageApi.error("Error updating shadow");
        console.error("Error updating shadow:", error);
      });
  };

  const postHandler = (data: ShadowType) => {
    axios
      .post(APIUrls.shadow.url, data)
      .then((response: { data: { id: number; result: ShadowType } }) => {
        const newShadow = response.data.result;
        dispatch(addShadow({ id: response.data.id, name: newShadow.name }));
        props.messageApi.success("Shadow created successfully");
        navigate(`${PagesUrls.shadow.url}${response.data.id}`);
      })
      .catch((error) => {
        props.messageApi.error("Error creating shadow");
        console.error("Error creating shadow:", error);
      });
  };

  const onFinish = (values: ShadowType) => {
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
    <>
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
    </>
  );
}

export default ShadowForm;
