import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { IoMdArrowRoundBack, IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2'

import {
    DatatableWrapper,
    TableHeader,
    TableBody,
    Filter,
    PaginationOptions,
    Pagination
  } from 'react-bs-datatable';

  const header = [
    { title: <input type="checkbox" onChange={(e) => handleSelectAll(e)} />, prop: 'select', sortable: false }, // Checkbox in header
    { title: 'Notes', prop: 'notes', sortable: true },
    { title: 'Created At', prop: 'created', sortable: true },
    { title: 'Status', prop: 'status', sortable: true },
    { title: 'Action', prop: 'action', sortable: true }
  ];

function NotesList({ handleRenderAddNote, onEdit }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const resp = await axios.get('http://3.110.194.148:5000/api/notes');
        setNotes(resp.data);
      } catch (error) {
        console.log('Error fetching notes', error);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure to delete Note ?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }); 
      if (result.isConfirmed) {
        await axios.delete(`http://3.110.194.148:5000/api/notes/${id}`);
        setNotes(notes.filter((note) => note._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: `Your Note has been deleted.`,
          icon: "success"
        });
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      Swal.fire({
        title: "Error!",
        text: "There was a problem deleting the data.",
        icon: "error"
      });
    }
  };


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const body = notes.map((item) => {
    return {
      select: <input type="checkbox" onChange={(e) => handleSelectAll(e)} />,
      notes: item.content || "Unknown",
      created: new Date(item.createdAt).toLocaleDateString(),
      status: item.activeindicator === 'Active' ?
        <button className='active-btn'>Active</button> :
        <button className='inactive-btn'>Inactive</button>,
      action: (
        <>
          <button className='edit-btn' onClick={() => { onEdit(item); }}><FaEdit /></button>
          <button className='delete-btn' onClick={() => { handleDelete(item._id); }}><RiDeleteBin6Line /></button>
        </>
      )
    };
  });

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-2 mb-2'>
        <div className='csv-heading'>
          <h3><IoMdArrowRoundBack className='me-1 mb-1' onClick={handleRenderAddNote} /> Notes</h3>
        </div>
        <div>
          <button className='clear-btn me-4' onClick={handleRenderAddNote}>
            <IoMdAdd className='me-1' /> Add Note
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <input
          type="text"
          className="form-control mb-3 w-25"
          placeholder="Search notes..."
          value={search}
          onChange={handleSearch}
        />
                <Table>
                  <DatatableWrapper
                    body={body}
                    headers={header}
                    paginationOptionsProps={{
                      initialState: {
                        rowsPerPage: 5,
                        options: [5, 10, 15],
                      },
                    }}
                  >
                    <Filter />
                    <TableHeader />
                    <TableBody />
                    <PaginationOptions />
                    <Pagination />
                  </DatatableWrapper>
                </Table>
      </div>
    </>
  );
}

export default NotesList;
