import * as React from "react";
import * as style from "./style.scss";

import { APIUrls, PagesUrls } from "../../../constants";
import { Button, Card, Flex, Form, Space } from "antd";
import type {
  CraftType,
  MaterialType,
  ShadowType,
} from "../../../reducers/types";

import { addMaterial, updateMaterial } from "../../../reducers/materialSlice";
import { useNavigate, useParams } from "react-router";

import MainDetails from "./MainDetails";
import { MessageInstance } from "antd/es/message/interface";

import axios from "axios";
import classnames from "classnames/bind";
import { useDispatch } from "react-redux";

const cx = classnames.bind(style);

function MaterialForm(props: { messageApi: MessageInstance }) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm<MaterialType>();

  const [currentMaterial, setCurrentMaterial] =
    React.useState<MaterialType | null>(null);

  const getMaterial = () => {
    axios
      .get(`${APIUrls.material.url}${params.materialId}`)
      .then(
        (response: {
          data: { result: MaterialType<ShadowType, CraftType> };
        }) => {
          const shadows = response.data.result.shadows.map((s) => s.id);
          const crafts = response.data.result.crafts.map((c) => c.id);
          setCurrentMaterial({ ...response.data.result, shadows, crafts });
        }
      );
  };

  React.useEffect(() => {
    if (params.materialId) {
      getMaterial();
    }
  }, [params]);

  const putHandler = (data: MaterialType, id: number) => {
    axios
      .put(`${APIUrls.material.url}${id}`, data)
      .then((response: { data: { result: MaterialType } }) => {
        const updated = response.data.result;
        setCurrentMaterial(updated);
        props.messageApi.success("Material updated successfully");
        dispatch(updateMaterial({ id: id, name: updated.name }));
      })
      .catch((error) => {
        props.messageApi.error("Error updating material");
        console.error("Error updating material:", error);
      });
  };

  const postHandler = (data: MaterialType) => {
    axios
      .post(APIUrls.material.url, data)
      .then((response: { data: { id: number; result: MaterialType } }) => {
        const newMaterial = response.data.result;
        dispatch(addMaterial({ id: response.data.id, name: newMaterial.name }));
        props.messageApi.success("Material created successfully");
        navigate(`${PagesUrls.material.url}${response.data.id}`);
      })
      .catch((error) => {
        props.messageApi.error("Error creating material");
        console.error("Error creating material:", error);
      });
  };

  const onFinish = (values: MaterialType) => {
    const id = values.id;
    delete values.id;
    if (!id) {
      postHandler(values);
    } else {
      putHandler(values, id);
    }
  };

  if (!currentMaterial && !!params.materialId) return null;
  return (
    <Flex justify="center" className={cx("shadow-form-container")}>
      <Card
        variant="outlined"
        loading={!currentMaterial && !!params.materialId}
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
            id: params?.materialId,
            name: currentMaterial?.name ?? "",
            price: currentMaterial?.price ?? "",
            crafts: currentMaterial?.crafts ?? [],
            shadows: currentMaterial?.shadows ?? [],
          }}
        >
          <MainDetails />

          <Space>
            {params.materialId && (
              <Form.Item label={null}>
                <Button
                  color="purple"
                  variant="solid"
                  onClick={() => {
                    form.setFieldsValue({ id: parseInt(params.materialId) });
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

export default MaterialForm;
