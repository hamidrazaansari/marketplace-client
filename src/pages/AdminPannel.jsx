import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Button, Modal, Table } from 'react-bootstrap';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';
import { IoMdArrowRoundBack } from "react-icons/io";
import Select from 'react-select';
import Swal from 'sweetalert2';
import CustomModal from '../components/CustomModal';

function AdminPannel({handleRenderAddSites , siteForEdit }) {
    // Check if we are editing or adding
    const isEditing = !!siteForEdit;
  const [formData, setFormData] = useState({
    price: '',
    website: '',
    da: '',
    pa: '',
    spamScore: '',
    dr: '',
    ahrefTraffic: '',
    SEMRushTraffic: '',
    type: '',
    niche: '',
    language: '',
    category: '',
    country: '',
  });

  const [bulkData, setBulkData] = useState([]);
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [langOption, setLangOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [countryOption, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nicheOption, setNicheOption] = useState([]);
  const [selectedNiche , setSelectedNiche] = useState(null);
  const [show, setShow] = useState(false);
  const [errors ,setErrors] = useState('')
  const [allcategory , setAllCategory] =useState('')
  const [allCountry , setAllCountry] =useState('')
  const [allLanguage , setAllLanguage] =useState('')
  const [allNiche , setAllNiche] =useState('')



  // Set form values when editing
  useEffect(() => {
    if (siteForEdit) {
      setFormData({
        price: siteForEdit.price || '',
        website: siteForEdit.website || '',
        da: siteForEdit.da || '',
        pa: siteForEdit.pa || '',
        spamScore: siteForEdit.spamScore || '',
        dr: siteForEdit.dr || '',
        ahrefTraffic: siteForEdit.ahrefTraffic || '',
        SEMRushTraffic: siteForEdit.SEMRushTraffic || '',
        type: siteForEdit.type || '',
        niche: siteForEdit.niche || '',
        language: siteForEdit.language || '',
        category: siteForEdit.category || '',
        country: siteForEdit.country || '',
      });

      // Set selected options for dropdowns when editing
      setSelectedLanguage({ value: siteForEdit.language, label: siteForEdit.language });
      setSelectedCountry({ value: siteForEdit.country, label: siteForEdit.country });
      setSelectedNiche({ value: siteForEdit.niche, label: siteForEdit.niche });
      setSelectedOptions({ value: siteForEdit.category, label: siteForEdit.category });
    }
  }, [siteForEdit]);

  // select unique and active filters
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categoriesResponse = await axios.get('http://3.110.194.148:5000/api/category');
        const categories = categoriesResponse.data
        .filter(category => category.activeindicator === 'Active') 
        .map(category => ({
          value: category.categoryName,
          label: category.categoryName,
        }));
        setCategoryOptions(categories);
        setAllCategory(categoriesResponse.data)

        const languagesResponse = await axios.get('http://3.110.194.148:5000/api/languages');
        const languages = languagesResponse.data
        .filter(lang => lang.activeindicator === 'Active') 
        .map(lang => ({
          value: lang.langName,
          label: lang.langName,
        }));
        setLangOptions(languages);
        setAllLanguage(languagesResponse.data)

        const countryResponse = await axios.get('http://3.110.194.148:5000/api/country');
        const countries = countryResponse.data
        .filter(country => country.activeindicator === 'Active') 
        .map(country => ({
          value: country.countryName,
          label: country.countryName,
        }));
        setCountryOptions(countries);
        setAllCountry(countryResponse.data)

        const nicheResponse = await axios.get('http://3.110.194.148:5000/api/niche');
        const niches = nicheResponse.data
        .filter(niche => niche.activeindicator === 'Active') 
        .map(niche => ({
          value: niche.nicheName,
          label: niche.nicheName,
        }));
        setNicheOption(niches);
        setAllNiche(nicheResponse.data)
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Perform validation for the website field
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/;
    if (name === 'website') {
      if (!urlRegex.test(value)) {
        setErrors({ ...errors, websites: 'Please enter a valid URL.' });
      } else {
        setErrors({ ...errors, websites: '' });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://3.110.194.148:5000/api/data/${siteForEdit._id}`, formData);
        Swal.fire({
          icon: "success",
          title: "Data updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        
      } else {
        await axios.post('http://3.110.194.148:5000/api/data', formData);
        Swal.fire({
          icon: "success",
          title: "Data submitted successfully",
          showConfirmButton: false,
          timer: 1500
        });
        
        
      }

      handleRenderAddSites();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  
  // Handle CSV Upload (Bulk)
  const handleBulkCSVUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setBulkData(results.data);
        handleShow();
      },
    });
  };

  const handleBulkDataSubmit = async () => {
    try {
      await axios.post('http://3.110.194.148:5000/api/bulkData', bulkData);
      Swal.fire({
        icon: "success",
        title: "All data submitted successfully",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {

      console.error('Error submitting bulk data:', error);
    }
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setFormData({
      ...formData,
      language: selectedOption.value
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
    setFormData({
      ...formData,
      category: selectedOption.value
    });
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData({
      ...formData,
      country: selectedOption.value
    });
  };

  const handleNicheChange = (selectedOption) => {
    setSelectedNiche(selectedOption);
    setFormData({
      ...formData,
      niche: selectedOption.value
    });
  };

  const uniqueLanguage = langOption.filter((item, index, self) =>
    index === self.findIndex((t) => t.value === item.value)
  );

  const uniqueCategory = categoryOptions.filter((item, index, self) =>
    index === self.findIndex((t) => t.value === item.value)
  );

  const uniqueCountry = countryOption.filter((item, index, self) =>
    index === self.findIndex((t) => t.value === item.value)
  );

  const uniqueNiche = nicheOption.filter((item, index, self) =>
    index === self.findIndex((t) => t.value === item.value)
  );

  const handlePriceChanges =(e)=>{
    const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
          setFormData({
            ...formData,
            [name]: value
          });
          }
    }

  return (
    <div className="admin-panel">
      <style>
        {
          `.css-13cymwt-control{
  border: 1px solid #4b78bc !important;
  min-height:45px !important;
  background-color: transparent !important;
}
`
        }
      </style>
      <CustomModal
        show={show}
        handleClose={handleClose}
        bulkData={bulkData}
        handleBulkDataSubmit={handleBulkDataSubmit}
        validCategories={allcategory}
        validCountries={allCountry}
        validLanguages={allLanguage}
        validNiches={allNiche}
      />


        <NavBar/>

        <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
            <div className="row">
              <div className="col-12">
                <div className='d-flex align-items-center justify-content-between m-4 mb-2'>
                  <div className='csv-heading'>
                    <h3><IoMdArrowRoundBack className='me-1 mb-1' onClick={handleRenderAddSites}/> Add New Site</h3>
                  </div>
                  <div>
                    <input type="file" accept=".csv" id='bulk' className='d-none' onChange={handleBulkCSVUpload} />
                    <label htmlFor="bulk" className="clear-btn">
                      <FiUpload className='file-upload-icon' />
                      <span>Upload CSV</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Container>
              {/* Form for Individual Record */}
              <form onSubmit={handleSubmit} className='form-manual' >
                <div className='row'>
                  <div className='col-md-6 mb-2'>
                    <label className='mb-1'>Price:</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handlePriceChanges}
                      className='form-control'
                    />
                  </div>

                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Website:</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={`form-control ${errors.websites ? 'is-invalid' : ''}`}

                    />
                    {errors.websites && <div className="invalid-feedback">{errors.websites}</div>}
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>DA:</label>
                    <input
                      type="number"
                      name="da"
                      value={formData.da}
                      onChange={handleInputChange}
                      className='form-control'

                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>PA:</label>
                    <input
                      type="number"
                      name="pa"
                      value={formData.pa}
                      onChange={handleInputChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Spam Score:</label>
                    <input
                      type="number"
                      name="spamScore"
                      value={formData.spamScore}
                      onChange={handleInputChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>DR:</label>
                    <input
                      type="number"
                      name="dr"
                      value={formData.dr}
                      onChange={handleInputChange}
                      className='form-control'

                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Ahref Traffic:</label>
                    <input
                      type="number"
                      name="ahrefTraffic"
                      value={formData.ahrefTraffic}
                      onChange={handleInputChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>SEMRush Traffic:</label>
                    <input
                      type="number"
                      name="SEMRushTraffic"
                      value={formData.SEMRushTraffic}
                      onChange={handleInputChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Type:</label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className='form-control'

                    />
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Niche:</label>
                    <Select
                    
                      name="niche"
                      options={uniqueNiche}
                      value={selectedNiche}
                      onChange={handleNicheChange}
                      placeholder={`Niche`}
                      closeMenuOnSelect={false}
                    />  
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Language:</label>
                    <Select
                      name="Language"
                      options={uniqueLanguage}
                      value={selectedLanguage}
                      onChange={handleLanguageChange }
                      placeholder={`Language`}
                      closeMenuOnSelect={true}
                    /> 
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Category:</label>
                  <Select
                    name="Category"
                    options={uniqueCategory}
                    value={selectedOptions}
                    onChange={handleCategoryChange}
                    placeholder={`Category`}
                    closeMenuOnSelect={false}
                  />                
                  </div>
                  <div className='col-lg-6 mb-2'>
                    <label className='mb-1'>Country:</label>
                    <Select
                      name="Country"
                      options={uniqueCountry}
                      value={selectedCountry}
                      onChange={handleCountryChange }
                      placeholder={`Country`}
                      closeMenuOnSelect={false}
                    />  
                  </div>

                </div>
                <button type="submit" className='clear-btn mt-4'> {isEditing ? 'Update Data' : 'Post Data'} </button>

              </form>
            </Container>
          </div>
        </div>

    </div>
  );
}

export default AdminPannel;
