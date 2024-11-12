import React, {useState} from "react";
import {Button, Col, Input, Row} from "antd";
import {useNavigate} from "react-router-dom";
import ProcessListComponent from "./card/ProcessListComponent";
import DefaultButton, {buttonTypeEnum} from "./components/DefaultButton";
import axiosClient from "../utils/axiosClientJs";

export default function HomePage() {
    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [key, setKey] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")

    return (
        <div>
            <Row style={{marginTop: "10vh", marginBottom: "2vh"}} >
                <Col span={6} style={{padding: "10px"}}>
                    <Input prefix={<p style={{fontWeight: "bolder"}}>name:</p>} id="modelName"
                           placeholder="输入model name"
                           onInput={() => {
                        setName(document.getElementById('modelName').value)
                    }}></Input>
                </Col>
                <Col span={6} style={{padding: "10px"}}>
                    <Input prefix={<p style={{fontWeight: "bolder"}}>key:</p>} id="modelKey" placeholder="输入model key"
                           onInput={() => {
                        setKey(document.getElementById('modelKey').value)
                    }}></Input>
                </Col>
                <Col span={6} style={{padding: "10px"}}>
                    <Input prefix={<p style={{fontWeight: "bolder"}}>category:</p>} id="modelCategory"
                           placeholder="输入model category"
                           onInput={() => {
                        setCategory(document.getElementById('modelCategory').value)
                    }}></Input>
                </Col>
                <Col span={6} style={{padding: "10px"}}>
                    <Input prefix={<p style={{fontWeight: "bolder"}}>description:</p>} id="modelDescription"
                           placeholder="输入description"
                           onInput={() => {
                        setDescription(document.getElementById('modelDescription').value)
                    }}></Input>
                </Col>
            </Row>

            <DefaultButton buttonType={buttonTypeEnum.DEFAULT} content="新建模型" onClick={() => {
                axiosClient.post("/model/create",
                    {"name": name, "key": key, "category": category, "description": description},)
                    .then(response => {
                        if (!response.data.success) {
                            throw Error(response.data.msg);
                        }
                        let modelId = response.data.data
                        navigate("/model/edit/", {state: {modelId: modelId}})
                    })
                    .catch(function (e) {
                        console.log(e);
                    })
                    .finally(() => {
                    })
            }}/>
            <ProcessListComponent/>
        </div>
    )
}