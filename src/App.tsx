import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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

      {/* Dropdown menu */}
      <div className="btn-group position-fixed top-0 end-0 mt-4 me-4">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Right-aligned menu
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#">
              Menu item
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Menu item
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Menu item
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
