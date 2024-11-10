import React, {useEffect, useState} from "react";
import {Button} from "antd";

export const buttonTypeEnum = {
    DANGER: {main: "#bd5353", text: "#ffffff"},
    WARN: {main: "#f6d23f", text: "#191919"},
    DISABLE: {main: "#acacac", text: "#ffffff"},
    DEFAULT: {main: "#2582bd", text: "#ffffff"},
}

export default function DefaultButton({content="", buttonType=buttonTypeEnum.DEFAULT, onClick}) {
    const [color, setColor] = useState()
    const [textColor, setTextColor] = useState()
    useEffect(() => {
        setColor(buttonType.main)
        setTextColor(buttonType.text)
    }, [buttonType])
    return (
        <Button style={{backgroundColor: color, borderColor: color, color: textColor, fontWeight: "bold"}}
                onClick={onClick} >{content}</Button>
    )
}