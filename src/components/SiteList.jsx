import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2'


import '../assets/css/style.css';
import {
  DatatableWrapper,
  TableHeader,
  TableBody,
  Filter,
  PaginationOptions,
  Pagination
} from 'react-bs-datatable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const header = [
  { title: 'Action', prop: 'action', sortable: true },
  { title: 'Price', prop: 'price', sortable: true },
  { title: 'Website', prop: 'website', sortable: true },
  { title: 'DA', prop: 'da', sortable: true },
  { title: 'PA', prop: 'pa', sortable: true },
  { title: 'Spam Score', prop: 'spamScore', sortable: true },
  { title: 'DR', prop: 'dr', sortable: true },
  { title: 'Ahref Traffic', prop: 'ahrefTraffic', sortable: true },
  { title: 'SEMRush Traffic', prop: 'SEMRushTraffic', sortable: true },
  { title: 'Type', prop: 'type', sortable: true },
  { title: 'Niche', prop: 'niche', sortable: true },
  { title: 'Language', prop: 'language', sortable: true },
  { title: 'Category', prop: 'category', sortable: true },
  { title: 'Country', prop: 'country', sortable: true },
];

function SiteList({handleRenderAddSites , onEdit}) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  // Fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.110.194.148:5000/api/data'); // Adjust URL as needed
        const serverData = response.data;

        // Format the data to retain _id for deletion purpose
        const formattedData = serverData.map(item => ({
          _id: item._id,  // Retain the _id for delete operation
          action: (
            <>
              <button className='delete-btn' onClick={() => { handleDelete(item._id, item.website); }}>
                <RiDeleteBin6Line />
              </button>
              <button className='edit-btn' onClick={() => { onEdit(item); }}><FaEdit /></button>

            </>
          ),
          price: <p className='fw-bold'>${item.price}</p>,
          website: (
            <div className="d-flex">
              <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a>
              <span className="text-primary"><TbSend /></span>
            </div>
          ),
          da: <button className="dr">{item.da}</button>,
          pa: <button className="dr">{item.pa}</button>,
          spamScore: <button className="da">{item.spamScore}</button>,
          dr: <button className="dr">{item.dr}</button>,
          ahrefTraffic: <button className="traffic">{item.ahrefTraffic}</button>,
          SEMRushTraffic: <button className="traffic">{item.SEMRushTraffic}</button>,
          type: <div className="type">{item.type} <span>{item.duration}</span></div>,
          niche: item.niche,
          language: <button className="language">{item.language}</button>,
          category: <button className="category">{item.category}</button>,
          country: item.country,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id, web) => {
    try {
      // Display confirmation alert and wait for the user's response
      const result = await Swal.fire({
        title: `Are you sure to delete ${web} ?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      // Check if the user confirmed the action
      if (result.isConfirmed) {
        // Proceed with the deletion
        await axios.delete(`http://3.110.194.148:5000/api/data/${id}`);
  
        // Update state to remove the deleted item from the list
        setData(prevData => prevData.filter(item => item._id !== id));
  
        // Display success message after deletion
        Swal.fire({
          title: "Deleted!",
          text: `Your ${web} has been deleted.`,
          icon: "success"
        });
      }
    } catch (error) {
      console.error('Error deleting data:', error);
  
      // Handle error with an error alert
      Swal.fire({
        title: "Error!",
        text: "There was a problem deleting the data.",
        icon: "error"
      });
    }
  };
  

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-2 mb-2'>
        <div className='csv-heading'>
          <h3><IoMdArrowRoundBack className='me-1 mb-1' onClick={handleBack} />Sites</h3>
        </div>
        <div>
          <button className='clear-btn me-4' onClick={handleRenderAddSites}>
            <IoMdAdd className='me-1' /> Add New Sites
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <div className='d-flex align-items-center justify-content-between'>
                  <input
                    type="text"
                    className="form-control mb-3 w-25"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                  />
                  <button className='clear-btn py-2'><FaFilter /></button>
                </div>
                <Table>
                  <DatatableWrapper
                    body={data}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SiteList;
