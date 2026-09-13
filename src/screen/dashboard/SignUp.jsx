import { Form, Button, Input, Select } from "antd";
import { FaUserCheck } from "react-icons/fa6";
import { useSignUp } from "../../services/Auth/authMutation";

const SignUp = () => {
  const [form] = Form.useForm();
  const { signup, isLoading } = useSignUp();

  const onFinishData = ({ email, password, fullname, acctype }) => {
    signup(
      { email, password, fullname, acctype, status: "1" },
      {
        onSettled: () => {
          form.resetFields();
        },
      },
    );
  };

  const hasCharAndNumber = (value) => {
    return /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
  };

  return (
    <div className="flex items-center justify-center  w-full">
      <div className="border border-t-lime-700 border-t-4 shadow-lime-400 shadow-md rounded-sm w-2xl max-h-96 h-screen text-center py-2">
        <span className="py-2 px-2 mb-4">
          <h1 className="font-bold text-2xl">Create System Account</h1>
        </span>
        <div className="flex items-center justify-center px-2 w-2xl">
          <Form
            form={form}
            autoCapitalize="true"
            autoComplete="off"
            onFinish={onFinishData}
            variant="outlined"
            style={{ width: "60%" }}
          >
            <Form.Item
              label="Account Type"
              name="acctype"
              rules={[
                {
                  required: true,
                  message: "Select account type!",
                },
              ]}
            >
              <Select placeholder="Account type">
                <Option value="guardian">Guardian</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input fullname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password!",
                },
                {
                  validator: (_, value) =>
                    !value || hasCharAndNumber(value)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Input must contain at least one letter and one number",
                          ),
                        ),
                },
              ]}
            >
              <Input
                maxLength={12}
                placeholder="Enter text with letters and numbers"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="dashed"
                htmlType="submit"
                disabled={isLoading}
              >
                <FaUserCheck size={18} />
                <span className="font-bold text-pink-600">Create Account</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
