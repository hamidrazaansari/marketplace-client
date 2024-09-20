import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddNote({ handleRenderAddNote, noteForEdit }) {
    const [isStatusActive, setIsStatusActive] = useState(true);
    const [activeindicator, setActiveIndicator] = useState('Active');  const [content, setContent] = useState('');

  // Check if we are editing or adding
  const isEditing = !!noteForEdit;

  // Set form values when editing
  useEffect(() => {
    if (noteForEdit) {
        setActiveIndicator(noteForEdit.activeindicator);
        setIsStatusActive(noteForEdit.activeindicator === 'Active');
        setContent(noteForEdit.content);
    }
  }, [noteForEdit]);

  const handleStatusChange = (e) => {
    setIsStatusActive(e.target.checked);
    setActiveIndicator(e.target.checked ? 'Active' : 'Inactive');
  };

  // Handle form submission (for both add and update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing note (PUT request)
        await axios.put(`http://3.110.194.148:5000/api/notes/${noteForEdit._id}`, { activeindicator, content });
        Swal.fire({
          icon: "success",
          title: "Note updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // Add new note (POST request)
        await axios.post('http://3.110.194.148:5000/api/notes', { activeindicator, content });
        Swal.fire({
          icon: "success",
          title: "New note added successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }

      handleRenderAddNote();
    } catch (error) {
      console.log('Error submitting note:', error);
    }
  };

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-2 mb-2'>
        <div className='csv-heading'>
          <h3>
            <IoMdArrowRoundBack className='me-1 mb-1' style={{ cursor: "pointer" }} onClick={handleRenderAddNote} /> 
            {isEditing ? 'Edit Note' : 'Add New Note'}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
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
        <div className="mb-3">
          <label className="form-label">Note Content</label>
          <textarea
            className="form-control"
            placeholder="Enter note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit" className='px-4'>
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </form>
    </>
  );
}

export default AddNote;
