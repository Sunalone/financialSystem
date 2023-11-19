import React from "react";
import { Button, Popconfirm } from "antd";
import type { PopconfirmProps } from "antd";
import "./styles.less";

interface TOperateButtonProps extends Omit<PopconfirmProps, "trigger"> {
    buttonText?: string;
    danger?: boolean; // 新增代码
}

const OperateButton: React.FC<TOperateButtonProps> = (props) => {
    const { buttonText, title, danger, ...restProps } = props; // 新增代码

    return (
        <Popconfirm title={title} trigger="click" okText="确定" cancelText="取消" {...restProps}>
            {/* 新增代码 */}
            <Button type="link" danger={danger}>
                {buttonText}
            </Button>
        </Popconfirm>
    );
};

export default OperateButton;
