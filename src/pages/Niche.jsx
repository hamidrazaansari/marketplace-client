import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';
import NicheList from '../components/NicheList';
import AddNiche from '../components/AddNiche';

function Niche() {
  const [showAddPanel, setShowAddPanel] = useState(false); 
  const [nicheForEdit, setNicheForEdit] = useState('')

  // Toggle the visibility of the Add Niche panel
  const handleRenderAddNiche = () => {
    setNicheForEdit(null)
    setShowAddPanel(!showAddPanel);
  };

  const handleEdit = (editNiche) => {
    setNicheForEdit(editNiche);
    setShowAddPanel(true);
  }

  return (
    <div className="admin-panel">
      <NavBar />

      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">

            {/* Conditionally render the panel */}
            {showAddPanel ? (
              <AddNiche handleRenderAddNiche={handleRenderAddNiche} nicheForEdit={nicheForEdit} />
            ) : (
              // Render the table when Add Panel is not shown
              <NicheList handleRenderAddNiche={handleRenderAddNiche} onEdit={handleEdit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Niche;
