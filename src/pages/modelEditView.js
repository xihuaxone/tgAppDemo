import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Layout, Space} from "antd";
import DefaultButton, {buttonTypeEnum} from "./components/DefaultButton";
import axiosClient from "../utils/axiosClientJs";

export default function ModelEditView() {
    let location = useLocation();
    let navigate = useNavigate();
    let data = location.state;
    let modelId = data["modelId"]

    let url = "http://localhost:10183/modeler_v.html?modelId=" + modelId

    return (
    <Layout>
        <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%', textAlign: 'right', backgroundColor: "#fff"}}>
            <Space size="middle">
                <DefaultButton buttonType={buttonTypeEnum.DANGER} content="编辑" onClick={() => {
                    navigate("/model/edit/", {state: {modelId: modelId}})
                }}/>
                <DefaultButton buttonType={buttonTypeEnum.DEFAULT} content="退出" onClick={() => {
                    navigate("/")
                }}/>
            </Space>
        </Header>
        <Content>
            <iframe title="edit" src={url} style={{width: '100vw', height: '100vh'}}/>
        </Content>
        <Footer></Footer>
    </Layout>
    )
}