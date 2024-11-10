import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DefaultButton, {buttonTypeEnum} from "./components/DefaultButton";
import axiosClient from "../utils/axiosClientJs";
import {Col, Layout, Row, Space} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";

export default function ModelEdit() {
    let location = useLocation();
    let navigate = useNavigate()

    let data = location.state;
    let modelId = data["modelId"]

    let url = "http://localhost:10183/modeler.html?modelId=" + modelId

    return (
        <Layout>
            <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%', textAlign: 'right'}}>
                <Space size="middle">
                    <DefaultButton buttonType={buttonTypeEnum.DEFAULT} content="退出" onClick={() => {
                        navigate("/")
                    }}/>
                </Space>
            </Header>
            <Content>
                <iframe title="edit" src={url} style={{width: '100vw', height: '100vh'}}/>
            </Content>
            <Footer>
                <DefaultButton buttonType={buttonTypeEnum.DANGER} content="部署" onClick={() => {
                    axiosClient.post("/deploy/" + modelId)
                        .then(response => {
                            if (!response.data.success) {
                                throw Error(response.data.msg);
                            }
                            alert("部署成功，部署id：" + response.data.data)
                        })
                        .catch(function (e) {
                            console.log(e);
                        })
                        .finally(() => {
                        })
                }}/>
            </Footer>
        </Layout>
    )
}