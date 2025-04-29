import React, { useState } from "react";
import "./App.css";
import NoteWidget from "./Widgets/NoteWidget.tsx";

interface Note {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const addNote = () => {
    const newNote: Note = { id: Date.now(), text: "New note" };
    setNotes((prev) => [...prev, newNote]);
    setMenuOpen(false);
  };

  const removeNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="board">
      {notes.map((note) => (
        <NoteWidget
          key={note.id}
          initialText={note.text}
          onClose={() => removeNote(note.id)}
        />
      ))}

      {/* Slide-in menu */}
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <button className="menu-item" onClick={addNote}>
          <span className="menu-icon">📝</span>
          Note
        </button>
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={toggleMenu}>
        {menuOpen ? "-" : "+"}
      </button>
    </div>
  );
};

export default App;
