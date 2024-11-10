import React, {useState} from "react";
import {Button, Input} from "antd";
import {useNavigate} from "react-router-dom";
import ProcessListComponent from "./card/ProcessListComponent";
import DefaultButton, {buttonTypeEnum} from "./components/DefaultButton";
import axiosClient from "../utils/axiosClientJs";

export default function HomePage() {
    let navigate = useNavigate()
    const [modelId, setModelId] = useState("")

    return (
        <div>
            <DefaultButton buttonType={buttonTypeEnum.DEFAULT} content="新建模型" onClick={() => {
                axiosClient.post("/model/create")
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
            <ProcessListComponent />
            {/*<Input prefix={<p style={{fontWeight: "bolder", marginRight: "1vw"}}>Model id:</p>} id="inputModelId" placeholder="输入modelId"*/}
            {/*       style={{marginTop: "10vh", width: "50vw"}} onInput={() => {*/}
            {/*    setModelId(document.getElementById('inputModelId').value)*/}
            {/*}}></Input>*/}
            {/*<Button style={{marginTop: "70vh", height: "5vh", width: "70vw", fontWeight: "bolder", fontSize: "larger"}} size={"large"} onClick={() => {*/}
            {/*    navigate("/model/edit/", {state: {modelId: modelId}})*/}
            {/*}}>编辑</Button>*/}
        </div>
    )
}