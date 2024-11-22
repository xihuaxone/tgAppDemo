import React, {useEffect, useState} from "react";
import {Button, Input, Space, Table} from "antd";
import axiosClient from "../../utils/axiosClientJs";
import DefaultButton, {buttonTypeEnum} from "../components/DefaultButton";
import {useNavigate} from "react-router-dom";
import BpmnImg from "../components/BpmnImg";
import Link from "antd/es/typography/Link";
import {BLACK, GRAY, GREEN} from "../../globalColorEnum";

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
            title: '部署id',
            dataIndex: 'deploymentId',
            key: 'deploymentId',
            align: "center",
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (text, record) => {
                let statusColor = record.status === "OFFLINE" ? GRAY : GREEN
                return (
                    <div style={{color: statusColor}}>{text}</div>
                )
            }
        },
        // {
        //     title: '流程图',
        //     dataIndex: ['modelDTO', 'img'],
        //     key: 'image',
        //     align: "center",
        //     render: (_, record) => (
        //         <Link to={"http://localhost:10183/export/image/" + record.modelDTO.id}>下载</Link>
        //         // <BpmnImg byteArray={record.image}></BpmnImg>
        //     )
        // },
        {
            title: '操作',
            dataIndex: 'operations',
            key: 'operations',
            align: "center",
            render: (_, record) => {
                let statusButtonType = record.status === "OFFLINE" ? buttonTypeEnum.SAFE : buttonTypeEnum.DANGER
                let statusSwitchUrl = record.status === "OFFLINE" ? "/model/online" : "/model/offline"
                let statusButtonContent = record.status === "OFFLINE" ? "上线" : "下线"
                return (
                    <Space size="large">
                        <DefaultButton buttonType={buttonTypeEnum.DEFAULT} content="查看" onClick={() => {
                            navigate("/model/view/", {state: {modelId: record.modelDTO.id}})
                        }}/>
                        <DefaultButton buttonType={buttonTypeEnum.WARN} content="编辑" onClick={() => {
                            navigate("/model/edit/", {state: {modelId: record.modelDTO.id}})
                        }}/>
                        <DefaultButton buttonType={statusButtonType} content={statusButtonContent} onClick={() => {
                            axiosClient.post(statusSwitchUrl, {"modelId": record.modelDTO.id})
                                .then(response => {
                                    if (!response.data.success) {
                                        throw Error(response.data.msg);
                                    }
                                })
                                .catch(function (e) {
                                    alert(e);
                                })
                                .finally(() => {
                                    window.location.reload()
                                })
                        }}/>
                    </Space>
                )
            },
        },
    ];

    return (
        <div style={{paddingLeft: "2vw", width: "96vw", justifyContent: "center"}}>
            <Table dataSource={processList} columns={columns}/>
        </div>
    )
}