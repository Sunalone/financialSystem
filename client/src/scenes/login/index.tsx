import React from "react";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, Tabs, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginMutation, useRegisterMutation } from "@/state/api";
import styles from "./index.module.less";

enum ETabType {
    LOING = "login",
    REGISTER = "register",
}

const LoginTabs = () => {
    const [tabType, setTabType] = React.useState<ETabType>(ETabType.LOING);

    return (
        <Tabs
            defaultActiveKey={tabType}
            onChange={(key) => setTabType(key as ETabType)}
            items={[
                {
                    label: "登录",
                    key: "login",
                    children: <LoginForm type={tabType} />,
                },
                {
                    label: "注册",
                    key: "register",
                    children: <LoginForm type={tabType} />,
                },
            ]}
        />
    );
};

type TLoginFormProps = {
    type: ETabType;
};

const LoginForm: React.FC<TLoginFormProps> = ({ type }) => {
    const [form] = Form.useForm();
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        let response: any;
        if (type === ETabType.LOING) {
            response = await login(values);
        } else {
            response = await register(values);
        }
        const {
            data: { result, message: responseMessage, token },
        } = response;
        if (result === 0) {
            message.error(responseMessage);
            return;
        }
        message.success(responseMessage);
        localStorage.setItem("token", token);
        navigate("/dashboard");
    };

    return (
        <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="id" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="请输入您的用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="请输入您的密码" />
            </Form.Item>
            <Space className={styles.space}>
                <Button className={styles.button} type="primary" htmlType="submit">
                    {type === ETabType.LOING ? "登录" : "注册"}
                </Button>
            </Space>
        </Form>
    );
};

const Login = () => {
    return (
        <Card
            cardStyle={{
                height: 400,
                margin: "100px auto",
                backgroundColor: "aliceblue",
            }}
        >
            <div className={styles.icon}>
                <img src="./icon.webp" />
            </div>
            <LoginTabs />
        </Card>
    );
};

export default Login;
