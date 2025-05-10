import * as React from "react";
import * as style from "./style.scss";

import { Button, Card, Flex, Form } from "antd";
import type { FloorFullType, ShadowType } from "../../../reducers/types";

import { APIUrls } from "../../../constants";
import MainDetails from "./MainDetails";
import { MessageInstance } from "antd/es/message/interface";

import axios from "axios";
import classnames from "classnames/bind";
import { useParams } from "react-router";

const cx = classnames.bind(style);

function FloorForm(props: { messageApi: MessageInstance }) {
  const params = useParams();
  const [form] = Form.useForm<FloorFullType>();

  const [currentFloor, setCurrentFloor] = React.useState<FloorFullType | null>(
    null
  );

  const getFloor = () => {
    axios
      .get(`${APIUrls.floor.url}${params.floorId}`)
      .then((response: { data: { result: FloorFullType<ShadowType> } }) => {
        const shadows = response.data.result.shadows.map((s) => s.id);
        setCurrentFloor({ ...response.data.result, shadows });
      });
  };

  React.useEffect(() => {
    if (params.floorId) {
      getFloor();
    }
  }, [params]);

  const putHandler = (data: FloorFullType, id: number) => {
    axios
      .put(`${APIUrls.floor.url}${id}`, data)
      .then((response: { data: { result: FloorFullType } }) => {
        const updated = response.data.result;
        setCurrentFloor(updated);
        props.messageApi.success("Floor updated successfully");
      })
      .catch((error) => {
        props.messageApi.error("Error updating floor");
        console.error("Error updating floor:", error);
      });
  };

  const onFinish = (values: FloorFullType) => {
    const id = values.id;
    delete values.id;
    putHandler(values, id);
  };

  if (!currentFloor && !!params.floorId) return null;
  return (
    <Flex justify="center" className={cx("shadow-form-container")}>
      <Card
        variant="outlined"
        loading={!currentFloor && !!params.floorId}
        style={{ maxWidth: "700px" }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            id: params?.floorId,
            shadows: currentFloor?.shadows ?? [],
          }}
        >
          <MainDetails />

          <Form.Item label={null}>
            <Button
              color="purple"
              variant="solid"
              onClick={() => {
                form.setFieldsValue({ id: parseInt(params.floorId) });
                form.submit();
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}

export default FloorForm;
