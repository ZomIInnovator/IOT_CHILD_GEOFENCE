import { Flex, Form, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAccess } from "../services/Auth/authMutation";

const AuthAccessCode = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutateAccess, isLoadingAccess } = useAccess();

  const onFinish = async (values) => {
    mutateAccess(values.code, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  return (
    <Flex className="flex flex-col justify-center-safe items-center h-screen w-screen gap-2.5 bg-gray-100">
      <div>
        <p className="text-3xl">LOGIN ACCESS CODE</p>
      </div>
      <div className="px-5">
        <p className="text-center font-mono sm:text-sm md:text-base lg:text-lg">
          Please enter access code to log in. If you don't have an access code,
          please contact the administrator to create one for you.
        </p>
      </div>
      <div className="bg-amber-100 px-4 rounded-2xl">
        <Form
          form={form}
          layout="vertical"
          size="large"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Enter Access Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please enter your access code",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter code here" />
          </Form.Item>

          <Form.Item className="mb-3">
            <Button
              type="dashed"
              htmlType="submit"
              block
              style={{
                backgroundColor: "blue",
                color: "white",
                fontWeight: "bold",
              }}
              disabled={isLoadingAccess}
            >
              Verify Code
            </Button>
            <Button
              type="default"
              block
              onClick={() => {
                navigate("/landing");
              }}
              style={{
                marginTop: "10px",
                color: "red",
                borderColor: "black",
              }}
            >
              HOME
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
};

export default AuthAccessCode;
