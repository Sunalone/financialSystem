import React from "react";
import { render } from "react-dom";
import { Modal } from "antd";
import type { ModalProps } from "antd";

type TModalProps = Omit<ModalProps, "open">;

const container = document.createDocumentFragment();

const useModalHook = () => {
    const closeModal = () => {
        renderModal(false);
    };

    const renderModal = (open: boolean, modalOptions?: TModalProps) => {
        render(
            <Modal
                open={open}
                onCancel={closeModal}
                {...modalOptions}
                onOk={() => {
                    modalOptions?.onOk?.();
                    closeModal();
                }}
            >
                Hello World
            </Modal>,
            container
        );
    };

    return {
        renderModal,
        closeModal,
    };
};

export default useModalHook;
