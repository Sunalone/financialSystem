import React from "react";
import useModalHook from "../useModalHook";
import { Button } from "antd";
import PopUpModal from "../popUpModal";

const Test = () => {
    const { renderModal } = useModalHook();
    const Modal = new PopUpModal();

    const modalOptions = {
        title: "详情",
        okText: "确定",
        cancelText: "取消",
    };

    const onclickButton = () => {
        Modal.popUp()
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Button onClick={onclickButton}>打开class弹窗</Button>
            <Button onClick={() => renderModal(true, modalOptions)}>打开hook弹窗</Button>
        </>
    );
};

export default Test;
