import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddNote from '../components/AddNote';
import NotesList from '../components/NoteList';


function ImpNotes() {
  const [showAddPanel, setShowAddPanel] = useState(false); 
  const [noteForEdit, setNoteForEdit] = useState('');

  // Toggle the visibility of the Add Note panel
  const handleRenderAddNote = () => {
    setNoteForEdit(null)
    setShowAddPanel(!showAddPanel);
  };

  const handleEdit = (editNote) => {
    setNoteForEdit(editNote);
    setShowAddPanel(true);
  };

  return (
    <div className="admin-panel">
        <NavBar/>
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            {showAddPanel ? (
              <AddNote handleRenderAddNote={handleRenderAddNote} noteForEdit={noteForEdit} />
            ) : (
              <NotesList handleRenderAddNote={handleRenderAddNote} onEdit={handleEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImpNotes;
