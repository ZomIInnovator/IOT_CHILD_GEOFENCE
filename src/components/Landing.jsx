import { Flex, Row, Col, Button } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import cusport from "../images/auth/cusport.png";
import mama from "../images/auth/mother1.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Flex className="flex items-center justify-center h-lvh w-lvw px-4 bg-amber-200">
      <Row>
        <Col className="flex flex-col items-center justify-center ">
          <img className="w-2xs" src={mama} alt="Mother" />
          <p className="flex font-mono text-4xl px-4 text-center ">
            Child Protection and Heat Temperature Sensor
          </p>
          <p className="flex font-mono px-4 mt-4 text-center">
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
                color="blue"
                icon={<LoginOutlined />}
                onClick={() => navigate("/auth")}
                className="mt-4"
              >
                LOGIN
              </Button>
              <Button
                variant="dashed"
                size="large"
                color="red"
                icon={<LoginOutlined />}
                onClick={() => navigate("/map")}
                className="mt-4 ml-4"
              >
                TRACKER MAP
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Flex>
  );
};

export default Landing;
