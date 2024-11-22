import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {BLUE, GRAY, GREEN, RED, WHITE, YELLOW} from "../../globalColorEnum";

export const buttonTypeEnum = {
    DANGER: {main: RED, text: WHITE},
    WARN: {main: YELLOW, text: "#191919"},
    SAFE: {main: GREEN, text: "#191919"},
    DISABLE: {main: GRAY, text: WHITE},
    DEFAULT: {main: BLUE, text: WHITE},
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