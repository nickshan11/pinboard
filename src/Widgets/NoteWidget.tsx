import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import "./NoteWidget.css";

interface NoteWidgetProps {
  initialText: string;
  onClose: () => void;
}

const NoteWidget: FC<NoteWidgetProps> = ({ initialText, onClose }) => {
  // Ref for the editable area
  const contentRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  // Start drag
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.preventDefault();
  };

  // During drag
  const onMouseMove = (e: MouseEvent<Document>) => {
    if (!dragging) return;
    setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
  };

  // End drag
  const onMouseUp = () => {
    setDragging(false);
  };

  // Wire up global listeners
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove as any);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove as any);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  return (
    <div
      className="note-widget"
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
      }}
    >
      {/* close button */}
      <button
        className="close-button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
      {/* drag handle */}
      <div className="handle" onMouseDown={onMouseDown} />

      {/* editable content with placeholder */}
      <div
        ref={contentRef}
        className="content"
        data-placeholder={initialText}
        contentEditable={true}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default NoteWidget;
