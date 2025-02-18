import React, { useEffect } from 'react';
import './App.css';

function App() {
    // 使用 useEffect 初始化 Telegram Web App
    useEffect(() => {
        const tg = window.Telegram.WebApp;

        // 初始化 Web App
        tg.ready();

        // 监听用户分享手机号
        tg.onEvent('contact', (contact) => {
            console.log('Phone Number:', contact.phone_number);
            console.log('Full Name:', contact.first_name, contact.last_name);
        });
    }, []);

    // 点击按钮时调用 requestContact
    const requestPhoneNumber = () => {
        const tg = window.Telegram.WebApp;
        tg.requestContact(); // 请求用户分享手机号
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Telegram Mini App</h1>
                <p>Welcome to my Telegram Mini App built with React!</p>
                <button onClick={requestPhoneNumber}>Share My Phone Number</button>
            </header>
        </div>
    );
}

export default App;
