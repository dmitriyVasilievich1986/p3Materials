import * as React from "react";
import * as style from "./style.scss";

import { APIUrls, PagesUrls } from "../../../constants";
import { Button, Card, Flex, Form, Space } from "antd";
import type { CraftType, MaterialType } from "../../../reducers/types";

import { addCraft, updateCraft } from "../../../reducers/craftSlice";
import { useNavigate, useParams } from "react-router";

import MainDetails from "./MainDetails";
import { MessageInstance } from "antd/es/message/interface";

import axios from "axios";
import classnames from "classnames/bind";
import { useDispatch } from "react-redux";

const cx = classnames.bind(style);

function CraftForm(props: { messageApi: MessageInstance }) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm<CraftType>();

  const [currentCraft, setCurrentCraft] = React.useState<CraftType | null>(
    null
  );

  const getCraft = () => {
    axios
      .get(`${APIUrls.craft.url}${params.craftId}`)
      .then((response: { data: { result: CraftType<MaterialType> } }) => {
        const materials = response.data.result.materials.map((m) => m.id);
        setCurrentCraft({ ...response.data.result, materials });
      });
  };

  React.useEffect(() => {
    if (params.craftId) {
      getCraft();
    }
  }, [params]);

  const putHandler = (data: CraftType, id: number) => {
    axios
      .put(`${APIUrls.craft.url}${id}`, data)
      .then((response: { data: { result: CraftType } }) => {
        const updated = response.data.result;
        setCurrentCraft(updated);
        props.messageApi.success("Craft updated successfully");
        dispatch(updateCraft({ id: updated.id, name: updated.name }));
      })
      .catch((error) => {
        props.messageApi.error("Error updating craft");
        console.error("Error updating craft:", error);
      });
  };

  const postHandler = (data: CraftType) => {
    axios
      .post(APIUrls.craft.url, data)
      .then((response: { data: { id: number; result: CraftType } }) => {
        const newCraft = response.data.result;
        dispatch(addCraft({ id: response.data.id, name: newCraft.name }));
        props.messageApi.success("Craft created successfully");
        navigate(`${PagesUrls.craft.url}${response.data.id}`);
      })
      .catch((error) => {
        props.messageApi.error("Error creating craft");
        console.error("Error creating craft:", error);
      });
  };

  const onFinish = (values: CraftType) => {
    const id = values.id;
    delete values.id;
    if (!id) {
      postHandler(values);
    } else {
      putHandler(values, id);
    }
  };

  if (!currentCraft && !!params.craftId) return null;
  return (
    <Flex justify="center" className={cx("shadow-form-container")}>
      <Card
        variant="outlined"
        loading={!currentCraft && !!params.craftId}
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
            id: params?.craftId,
            name: currentCraft?.name ?? "",
            description: currentCraft?.description ?? "",
            buff: currentCraft?.buff ?? "",
            stats: currentCraft?.stats ?? "Attack 0, Accuracy 0",
            type: currentCraft?.type ?? "Weapon",
            materials: currentCraft?.materials ?? [],
          }}
        >
          <MainDetails />

          <Space>
            {params.craftId && (
              <Form.Item label={null}>
                <Button
                  color="purple"
                  variant="solid"
                  onClick={() => {
                    form.setFieldsValue({ id: parseInt(params.craftId) });
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

export default CraftForm;
