import React, { useRef, useEffect, FC } from "react";
import "./NoteWidget.css";

interface NoteWidgetProps {
  initialText: string;
}

const NoteWidget: FC<NoteWidgetProps> = ({ initialText }) => {
  // useRef for div element
  const noteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = noteRef.current;
    if (div) {
      div.innerText = initialText;
    }
  }, [initialText]);

  const handleInput = () => {
    const div = noteRef.current;
    if (div) {
      // future: use div.innerText to save changes
    }
  };

  return (
    <div
      ref={noteRef}
      className="note-widget"
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={handleInput}
    />
  );
};

export default NoteWidget;
