import React, { useState } from 'react';
import AddLanguage from '../components/AddLanguage';
import LanguageList from '../components/LanguageList';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';


function Language() {
  const [showAddPanel, setShowAddPanel] = useState(false); 
  const [langForEdit , setLangForEdit] = useState('')

  // Toggle the visibility of the Add Language panel
  const handleRenderAddLang = () => {
    setLangForEdit(null)
    setShowAddPanel(!showAddPanel);
  };

  const handleEdit = (editLang)=>{
     setLangForEdit(editLang)
     setShowAddPanel(true)
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
            
            <AddLanguage handleRenderAddLang ={handleRenderAddLang} langForEdit={langForEdit}/>

            ) : (
              // Render the table when Add Panel is not shown
              <LanguageList handleRenderAddLang={handleRenderAddLang} onEdit={handleEdit}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Language;
