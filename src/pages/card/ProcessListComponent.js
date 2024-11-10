import React, {useEffect, useState} from "react";
import {Button, Input, Space, Table} from "antd";
import axiosClient from "../../utils/axiosClientJs";
import DefaultButton, {buttonTypeEnum} from "../components/DefaultButton";
import {useNavigate} from "react-router-dom";
import BpmnImg from "../components/BpmnImg";
import Link from "antd/es/typography/Link";

export default function ProcessListComponent() {
    const [processList, setProcessList] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/activiti/process/model/list', {
            params: {}
        })
            .then(response => {
                if (!response.data.success) {
                    throw Error(response.data.msg);
                }
                setProcessList(response.data.data)
            })
            .catch(function (e) {
                console.log(e);
            })
            .finally(() => {
            })

    }, [])

    const columns = [
        {
            title: 'Model ID',
            dataIndex: ['modelDTO', 'id'],
            key: 'modelId',
            align: "center",
        },
        {
            title: '名称',
            dataIndex: ['modelDTO', 'name'],
            key: 'name',
            align: "center",
            render: (text, record) => (
                <Link href={"http://localhost:10183/export/" + record.modelDTO.id}>{record.modelDTO.name}</Link>
            )
        },
        {
            title: 'key',
            dataIndex: ['modelDTO', 'key'],
            key: 'key',
            align: "center",
        },
        {
            title: '创建时间',
            dataIndex: ['modelDTO', 'createTime'],
            key: 'createTime',
            align: "center",
        },
        {
            title: '更新时间',
            dataIndex: ['modelDTO', 'lastUpdateTime'],
            key: 'lastUpdateTime',
            align: "center",
        },
        {
            title: '版本',
            dataIndex: ['modelDTO', 'version'],
            key: 'version',
            align: "center",
        },
        {
            title: '租户id',
            dataIndex: ['modelDTO', 'tenantId'],
            key: 'tenantId',
            align: "center",
        },
        {
            title: '元数据',
            dataIndex: ['modelDTO', 'metaInfo'],
            key: 'metaInfo',
            align: "center",
        },
        {
            title: '流程图',
            dataIndex: ['modelDTO', 'img'],
            key: 'image',
            align: "center",
            render: (_, record) => (
                <BpmnImg byteArray={record.image}></BpmnImg>
            )
        },
        {
            title: '操作',
            dataIndex: 'operations',
            key: 'operations',
            align: "center",
            render: (_, record) => (
                <Space size="large">
                    <DefaultButton buttonType={buttonTypeEnum.DEFAULT} content="查看" onClick={() => {
                        navigate("/model/view/", {state: {modelId: record.modelDTO.id}})
                    }}/>
                    <DefaultButton buttonType={buttonTypeEnum.WARN} content="编辑" onClick={() => {
                        navigate("/model/edit/", {state: {modelId: record.modelDTO.id}})
                    }}/>
                    <DefaultButton buttonType={buttonTypeEnum.DANGER} content="删除" onClick={() => {
                        alert("暂时不支持删除")
                    }}/>
                </Space>
            ),
        },
    ];

    return (
        <div style={{paddingLeft: "2vw", width: "96vw", justifyContent: "center"}}>
            <Table dataSource={processList} columns={columns}/>
        </div>
    )
}