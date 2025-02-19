import React, {useEffect, useState} from 'react';
import './App.css';
import {Content, Footer, Header} from "antd/lib/layout/layout";
import {Button} from "antd";
import TextArea from "antd/lib/input/TextArea";

function App() {
    const [phoneNum, setPhoneNum] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        const tg = window.Telegram.WebApp;

        // 初始化 Web App
        tg.ready();

        // 监听用户分享手机号
        tg.onEvent('contact', (contact) => {
            console.log('Phone Number:', contact.phone_number);
            console.log('Full Name:', contact.first_name, contact.last_name);
            setPhoneNum(contact.phone_number)
            setUsername(contact.first_name + contact.last_name)
        });
    }, []);

    // 点击按钮时调用 requestContact
    const requestPhoneNumber = () => {
        const tg = window.Telegram.WebApp;
        tg.requestContact(); // 请求用户分享手机号
    };

    return (
        <div className="App">
            <Header style={{height: '10vh'}}>
                <h1 style={{color: "white"}}>Telegram Mini App</h1>
            </Header>
            <Content style={{height: '60vh'}}>
                <Button style={{marginTop: "10vh"}} onClick={requestPhoneNumber}>授权获取手机号</Button>
                <div style={{marginLeft: "50vh", marginRight: "50vh"}}>
                    <TextArea style={{marginTop: "5vh"}} size={"small"}>{phoneNum}</TextArea>
                    <TextArea style={{marginTop: "5vh"}} size={"small"}>{username}</TextArea>
                </div>
            </Content>
            <Footer style={{height: '30vh'}}>
                <a href="tg://resolve?domain=@genshin_impact_ru_off"><Button>原神，启动！</Button></a>
                <a href="tg://resolve?domain=@unibowlcheck_bot"><Button>Unibowl，启动！</Button></a>
            </Footer>
        </div>
    );
}

export default App;
