import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function DraggableBox(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, ui) => {
    const { x, y } = { ...position, ...ui };
    setPosition({ x, y });
  };

  return (
    <Draggable size={200}>
      <div>{props.children}</div>
    </Draggable>
  )
}