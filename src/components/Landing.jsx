import { Flex, Row, Col, Button, Form, Input } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import cusport from "../images/auth/cusport.png";
import mama from "../images/auth/mother1.png";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  //const navigate = useNavigate();

  const [signIn, setSignIn] = useState(false);

  const onFinish = async (values) => {
    console.log("Form values:", values);
  };

  return (
    <Flex
      style={{
        minHeight: "100vh",
      }}
    >
      <Row
        justify={"center"}
        align={"middle"}
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: "linear-gradient(to right, #ffffff, #ad667e)",
          padding: "100px",
        }}
      >
        <Col
          span={12}
          style={{
            textAlign: "center",
            color: "black",
          }}
        >
          <img
            src={mama}
            alt="Mother"
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
              maxWidth: "300px",
            }}
          />
          <p
            style={{
              fontStyle: "normal",
              fontSize: "35px",
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 4px rgba(2, 2, 2, 12)",
            }}
          >
            Child Protection and Heat Temperature Sensor
          </p>
          <p style={{ fontSize: "18px", marginTop: "20px", color: "gray" }}>
            Your online child tracking and protection system. This app is
            designed to help you keep track of your child's activities, monitor
            their online presence, and ensure their safety in the digital world.
            With our user-friendly interface and powerful features, you can have
            peace of mind knowing that your child is protected.
          </p>
          <Row>
            <Col span={24}>
              <Button
                variant="dashed"
                size="large"
                color="red"
                icon={<LoginOutlined />}
                onClick={() => setSignIn(true)}
              >
                SIGN IN
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          {signIn ? (
            <div>
              <Form
                layout="vertical"
                size="large"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{
                  maxWidth: "400px",
                  margin: "0 auto",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your username"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
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
                  >
                    Login
                  </Button>
                  <Button
                    type="default"
                    block
                    onClick={() => setSignIn(false)}
                    style={{
                      marginTop: "10px",
                      color: "red",
                      borderColor: "black",
                    }}
                  >
                    Hide
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <img
              src={cusport}
              alt="Logo"
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                maxWidth: "800px",
              }}
            />
          )}
        </Col>
      </Row>
    </Flex>
  );
};

export default Landing;
