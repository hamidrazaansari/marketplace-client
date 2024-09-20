import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../assets/css/style.css';
import Swal from 'sweetalert2'
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

const handleSelectAll = () => {};

const header = [
  { title: <input type="checkbox" onChange={(e) => handleSelectAll(e)} />, prop: 'select', sortable: false }, // Checkbox in header
  { title: 'Title', prop: 'title', sortable: true },
  { title: 'Created At', prop: 'created', sortable: true },
  { title: 'Status', prop: 'status', sortable: true },
  { title: 'Action', prop: 'action', sortable: true }
];

function CountryList({ handleRenderAddCountry, onEdit }) {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://3.110.194.148:5000/api/country');
        setCountries(resp.data);
      } catch (error) {
        console.log('Error fetching country data', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, country) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure to delete ${country} ?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
            if (result.isConfirmed) {
        await axios.delete(`http://3.110.194.148:5000/api/country/${id}`);
        setCountries((prevCountries) => prevCountries.filter(item => item._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: `Your ${country} has been deleted.`,
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

  const filteredCountries = countries.filter((item) =>
    item.countryName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const body = filteredCountries.map((item) => {
    return {
      select: <input type="checkbox" onChange={(e) => handleSelectAll(e)} />,
      title: item.countryName || "Unknown",
      created: new Date(item.createdAt).toLocaleDateString(),
      status: item.activeindicator === 'Active' ?
        <button className='active-btn'>Active</button> :
        <button className='inactive-btn'>Inactive</button>,
      action: (
        <>
          <button className='edit-btn' onClick={() => { onEdit(item); }}><FaEdit /></button>
          <button className='delete-btn' onClick={() => { handleDelete(item._id, item.countryName); }}><RiDeleteBin6Line /></button>
        </>
      )
    };
  });

  return (
    <>
      <div className='d-flex align-items-center justify-content-between m-2 mb-2'>
        <div className='csv-heading'>
          <h3><IoMdArrowRoundBack className='me-1 mb-1' onClick={handleBack} />Country</h3>
        </div>
        <div>
          <button className='clear-btn me-4' onClick={handleRenderAddCountry}>
            <IoMdAdd className='me-1' /> Add Country
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
                    placeholder="Search country..."
                    value={search}
                    onChange={handleSearch}
                  />
                  <button className='clear-btn py-2'><FaFilter /></button>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryList;
