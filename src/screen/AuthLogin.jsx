import { Flex, Row, Col, Form, Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/Auth/authMutation";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { mutateLogin, isLoadingLogin } = useLogin();

  const onFinish = async (values) => {
    mutateLogin(values, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  return (
    <Flex className="flex flex-col justify-center-safe items-center h-screen w-screen gap-2.5 bg-gray-100">
      <div>
        <p className="text-3xl">AUTHENTICATION</p>
      </div>
      <div className="px-5">
        <p className="text-center font-mono sm:text-sm md:text-base lg:text-lg">
          Please enter your username and password to log in. If you don't have
          an account, please contact the administrator to create one for you.
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
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
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
              disabled={isLoadingLogin}
            >
              Login
            </Button>
            <Button
              type="default"
              block
              onClick={() => {
                navigate("/");
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

export default AuthLogin;
