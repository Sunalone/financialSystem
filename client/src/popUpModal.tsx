import React from "react";
import { render } from "react-dom";
import { Modal } from "antd";
import type { ModalProps } from "antd";

type TModalProps = Omit<ModalProps, "open">;
type TPromiseResponse = {
    message: string;
    isSuccess: boolean;
};

const container = document.createDocumentFragment();

export default class PopUpModal {
    private open = false;

    private renderModal(modalOptions?: TModalProps) {
        render(
            <Modal open={this.open} {...modalOptions}>
                Hello World
            </Modal>,
            container
        );
    }

    private closeModal() {
        this.open = false;
        this.renderModal();
    }

    popUp() {
        return new Promise<TPromiseResponse>((resolve, reject) => {
            this.open = true;
            this.renderModal({
                title: "详情",
                okText: "确定",
                cancelText: "取消",
                onOk: () => {
                    this.closeModal();
                    resolve({
                        message: "成功",
                        isSuccess: true,
                    });
                },
                onCancel: () => {
                    this.closeModal();
                    reject({
                        message: "失败",
                        isSuccess: false,
                    });
                },
            });
        });
    }
}
