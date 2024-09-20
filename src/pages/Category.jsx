import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';
import AddCategory from '../components/AddCategory';
import CategoryList from '../components/CategoryList';


function Category() {
  const [showAddPanel, setShowAddPanel] = useState(false); 
  const [categoryForEdit , setCategoryForEdit] = useState('')

  // Toggle the visibility of the Add Language panel
  const handleRenderAddCategory = () => {
    setCategoryForEdit(null); // Reset the category for edit
    setShowAddPanel(!showAddPanel);
  };

  const handleEdit = (editCat)=>{
    setCategoryForEdit(editCat)
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
            
            <AddCategory handleRenderAddCategory ={handleRenderAddCategory} categoryForEdit={categoryForEdit}/>

            ) : (
              // Render the table when Add Panel is not shown
              <CategoryList handleRenderAddCategory={handleRenderAddCategory} onEdit={handleEdit}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
