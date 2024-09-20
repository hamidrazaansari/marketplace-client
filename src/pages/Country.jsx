import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';
import CountryList from '../components/CountryList';
import AddCountry from '../components/AddCountry';


function Country() {
  const [showAddPanel, setShowAddPanel] = useState(false); 
  const [countryForEdit , setCountryForEdit] = useState('')

  // Toggle the visibility of the Add Language panel
  const handleRenderAddCountry = () => {
    setCountryForEdit(null)
    setShowAddPanel(!showAddPanel);
  };

  const handleEdit = (editCountry)=>{
    setCountryForEdit(editCountry)
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
            
            <AddCountry handleRenderAddCountry ={handleRenderAddCountry} countryForEdit={countryForEdit}/>

            ) : (
              // Render the table when Add Panel is not shown
              <CountryList handleRenderAddCountry={handleRenderAddCountry} onEdit={handleEdit}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Country;
