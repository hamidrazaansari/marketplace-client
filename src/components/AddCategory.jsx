import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Button } from 'react-bootstrap';
import axios from 'axios';

function AddCategory({ handleRenderAddCategory, categoryForEdit }) {
  const [isStatusActive, setIsStatusActive] = useState(true);
  const [activeindicator, setActiveIndicator] = useState('Active');
  const [categoryName, setCategoryName] = useState('');

  // Check if we are editing or adding
  const isEditing = !!categoryForEdit;

  // Set form values when editing
  useEffect(() => {
    if (categoryForEdit) {
      setCategoryName(categoryForEdit.categoryName);
      setActiveIndicator(categoryForEdit.activeindicator);
      setIsStatusActive(categoryForEdit.activeindicator === 'Active');
    }
  }, [categoryForEdit]);

  // Handle status change (active/inactive)
  const handleStatusChange = (e) => {
    setIsStatusActive(e.target.checked);
    setActiveIndicator(e.target.checked ? 'Active' : 'Inactive');
  };

  // Handle form submission (for both add and update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing language (PUT request)
         await axios.put(`http://3.110.194.148:5000/api/category/${categoryForEdit._id}`, { categoryName, activeindicator });
          alert('category updated successfully');

      } else {
        // Add new language (POST request)
         await axios.post('http://3.110.194.148:5000/api/category', { categoryName, activeindicator });
        alert('New category added successfully');
      }
      handleRenderAddCategory();

      // handleRenderAddLang(); // Go back to language list after adding/updating
    } catch (error) {
      console.log('Error while sending data:', error);
    }
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-2 mb-2'>
        <div className='csv-heading'>
          <h3>
            <IoMdArrowRoundBack className='me-1 mb-1' style={{ cursor: "pointer" }} onClick={handleRenderAddCategory} /> 
            {isEditing ? 'Edit Category' : 'Add New Category'}
          </h3>
        </div>
        <div>
          <button className='clear-btn me-4'><IoMdAdd className='me-1 '/>Upload CSV</button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{isEditing ? 'Edit Category' : 'Add New Category'}</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category"
                      value={categoryName}
                      onChange={(e) => { setCategoryName(e.target.value) }}
                    />
                  </div>
                  <div className="mb-3 col-4">
                    <label className="form-label">Status</label>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="statusCheckbox"
                        checked={isStatusActive}
                        onChange={handleStatusChange}
                      />
                      <label className="form-check-label" htmlFor="statusCheckbox">
                        {activeindicator}
                      </label>
                    </div>
                  </div>
                </div>
                <Button variant="primary" type="submit" className='px-4'>
                  {isEditing ? 'Update' : 'Save'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
