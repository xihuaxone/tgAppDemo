import React, { useEffect, useRef, useState } from 'react';

export default function BpmnImg ({ byteArray }) {
    const [imageUrl, setImageUrl] = useState('');
    const imageRef = useRef(null);

    useEffect(() => {
        const blob = new Blob([byteArray], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        imageRef.current=url

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [byteArray]);

    return <img src={imageUrl} ref={imageRef} alt="加载图片" />;


    // const [base64Str, setBase64Str] = useState("");
    // const [imageUrl, setImageUrl] = useState("");
    //
    // // 处理Base64编码字符串的变化
    // const handleBase64StrChange = (event) => {
    //     setBase64Str(event.target.value);
    // };
    //
    // // 将Base64编码的字符串转换为Blob URL
    // const convertBase64ToBlobUrl = () => {
    //     const byteCharacters = atob(base64Str.split(",")[1]);
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     const byteArray = new Uint8Array(byteNumbers);
    //     const blob = new Blob([byteArray], { type: "image/png" });
    //     setImageUrl(URL.createObjectURL(blob));
    // };
    //
    // return (
    //     <div>
    //         {/* 输入Base64编码的字符串 */}
    //         <textarea value={base64Str} onChange={handleBase64StrChange} />
    //
    //         {/* 显示图片 */}
    //         {imageUrl && <img src={imageUrl} alt="uploaded image" />}
    //
    //         {/* 转换Base64编码的字符串 */}
    //         <button onClick={convertBase64ToBlobUrl}>Convert</button>
    //     </div>
    // );
}