import React, { useEffect, useState } from 'react';
import './App.css';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

function App() {
    const [phoneNum, setPhoneNum] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const tg = window.Telegram.WebApp;

        // 初始化 Web App
        tg.ready();

        // 监听用户分享手机号
        tg.onEvent('contact', (contact) => {
            alert('Phone Number: ' + contact.phone_number);
            alert('Full Name: ' + contact.first_name + ' ' + contact.last_name);
            setPhoneNum(contact.phone_number);
            setUsername(contact.first_name + ' ' + contact.last_name);
        });

        tg.onEvent('authData', (authData) => {
            alert('Received auth data: ' + authData);

            // 假设 authData 是用户授权信息的 JSON 字符串
            try {
                const parsedData = JSON.parse(authData);
                // 处理返回的授权数据
                // 比如：将手机号、用户名等信息提取出来
                alert('User Auth Data: ' + JSON.stringify(parsedData));
            } catch (error) {
                alert('Error parsing auth data: ' + error);
            }
        });
    }, []);

    // 点击按钮时调用 requestContact
    const requestPhoneNumber = () => {
        const tg = window.Telegram.WebApp;
        tg.requestContact(); // 请求用户分享手机号
    };

    const handleTelegramLogin = () => {
        const tg = window.Telegram.WebApp;

        // 使用 Telegram 登录按钮来触发授权登录
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
            // 点击授权后，你可以获取到 authData
            const authData = tg.authData;  // 这里存放的是用户授权的数据
            console.log('Received AuthData:', authData);
            alert('User Auth Data: ' + JSON.stringify(authData));
        });
    };

    return (
        <div className="App">
            <Header style={{ height: '10vh' }}>
                <h1 style={{ color: 'white' }}>Telegram Mini App</h1>
            </Header>
            <Content style={{ height: '60vh' }}>
                <Button style={{ marginTop: '10vh' }} onClick={requestPhoneNumber}>
                    授权获取手机号
                </Button>
                <div style={{ marginLeft: '50vh', marginRight: '50vh' }}>
                    <TextArea style={{ marginTop: '5vh' }} size={'small'} value={phoneNum} />
                    <TextArea style={{ marginTop: '5vh' }} size={'small'} value={username} />
                </div>
                <Button style={{ marginTop: '10vh' }} onClick={handleTelegramLogin}>
                    授权登录
                </Button>
            </Content>
            <Footer style={{ height: '30vh' }}>
                <a href="tg://resolve?domain=@genshin_impact_ru_off">
                    <Button>原神，启动！</Button>
                </a>
                <a href="tg://resolve?domain=@unibowlcheck_bot">
                    <Button>Unibowl，启动！</Button>
                </a>
            </Footer>
        </div>
    );
}

export default App;
