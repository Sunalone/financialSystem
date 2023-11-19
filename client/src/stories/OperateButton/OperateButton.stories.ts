import type { Meta, StoryObj } from "@storybook/react";
import OperateButton from ".";

type Story = StoryObj<typeof meta>;

const meta = {
    title: "OperateButton", // storyBook的菜单Title
    component: OperateButton,
    parameters: {
        layout: "centered", // 组件显示的位置
    },
    tags: ["autodocs"],
} satisfies Meta<typeof OperateButton>;

export const Normal: Story = {
    // 传入组件的props
    args: {
        buttonText: "删除",
        title: "确定要删除该条数据吗？",
    },
};

// 新增代码
export const Danger: Story = {
    args: {
        danger: true,
        buttonText: "删除",
        title: "确定要删除该条数据吗？",
    },
};

export default meta;
