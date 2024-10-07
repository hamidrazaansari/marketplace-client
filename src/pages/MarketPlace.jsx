import React, { useState, useEffect } from 'react'
import { Navbar, Container, Dropdown } from 'react-bootstrap'
import '../assets/css/marketplace.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosInfinite } from "react-icons/io";
import DataTable from '../components/DataTable';
import Select, { components } from 'react-select';
import { FaSkype, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaCheck  } from "react-icons/fa6";
import { TbSearch } from "react-icons/tb";

import logo from '../assets/logo.jpg'
import axios from 'axios'

// Custom MultiValue component
const CustomMultiValue = ({ data, selectProps, ...props }) => {

  const { value } = selectProps;

  if (value.length > 1) {
    return (
      <components.MultiValue {...props}>
        {`${value.length} selected`}
      </components.MultiValue>
    );
  }

  // Default rendering for individual selected items
  return <components.MultiValue {...props} />;
};

function MarketPlace() {

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [langOption, setLangOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const [countryOption, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const [nicheOption, setNicheOption] = useState([]);
  const [selectedNiche, setSelectedNiche] = useState([])

  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');

  const [startDR, setStartDR] = useState('');
  const [endDR, setEndDR] = useState('');

  const [startDA, setStartDA] = useState('');
  const [endDA, setEndDA] = useState('');

  const [startPA, setStartPA] = useState('');
  const [endPA, setEndPA] = useState('');

  const [startSpam, setStartSpam] = useState('');
  const [endSpam, setEndSpam] = useState('');

  const [startAhrefTraffic, setStartAhrefTraffic] = useState('');
  const [endAhrefTraffic, setEndAhrefTraffic] = useState('');

  const [startSEMRushTraffic, setStartSEMRushTraffic] = useState('');
  const [endSEMRushTraffic, setEndSEMRushTraffic] = useState('');
  const [note, setNote] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search input visibility

  // Handle search input
  const handleSearchData = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Toggle search input visibility
  const toggleSearchInput = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://3.110.194.148:5000/api/category'); // Adjust URL as needed
        const activeCategories = categoriesResponse.data
          .filter(category => category.activeindicator === 'Active') // Filter for active categories
          .map(category => ({
            value: category.categoryName,
            label: category.categoryName,
          }));
        setCategoryOptions(activeCategories);
        const languagesResponse = await axios.get('http://3.110.194.148:5000/api/languages');
        const languages = languagesResponse.data
          .filter(lang => lang.activeindicator === 'Active')
          .map(lang => ({
            value: lang.langName,
            label: lang.langName,
          }));
        setLangOptions(languages)

        const countryResponse = await axios.get('http://3.110.194.148:5000/api/country');
        const countries = countryResponse.data
          .filter(country => country.activeindicator === 'Active')
          .map(country => ({
            value: country.countryName,
            label: country.countryName,
          }));
        setCountryOptions(countries)

        const nicheResponse = await axios.get('http://3.110.194.148:5000/api/niche');
        const niches = nicheResponse.data
          .filter(niche => niche.activeindicator === 'Active')
          .map(niche => ({
            value: niche.nicheName,
            label: niche.nicheName,
          }));
        setNicheOption(niches)

      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchOptions();


    const fetchNotes = async () => {
      const notesres = await axios.get('http://3.110.194.148:5000/api/notes')
      setNote(notesres.data)
    }
    fetchNotes();

  }, []);

  // multi-select handlers
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []);
  };
  const handleLanguageChange = (langOption) => {
    setSelectedLanguage(langOption || []);
  };
  const handleCountryChange = (countryOption) => {
    setSelectedCountry(countryOption || []);
  };
  const handleNicheChange = (nicheOption) => {
    setSelectedNiche(nicheOption || []);
  };

  // clear Price Filter
  const handeClearPriceFilter = (e) => {
    setStartPrice('');
    setEndPrice('')
  }

  const handleStartChangePrice = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartPrice(newValue);
    }
  };

  const handleEndChangePrice = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setEndPrice(newValue);
    }
  }

  // clear DR Filter
  const handeClearDRFilter = (e) => {
    setStartDR('');
    setEndDR('')
  }

  const handleStartDRChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartDR(newValue);
    }
  };

  const handleEndDRChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      if (newValue >= 100) {
        setEndDR(100)
      }
      else {
        setEndDR(newValue);
      }
    }
  }

  // clear DA Filter
  const handeClearDAFilter = (e) => {
    setStartDA('');
    setEndDA('')
  }

  const handleStartDAChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartDA(newValue);
    }
  };

  const handleEndDAChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      if (newValue >= 100) {
        setEndDA(100)
      }
      else {
        setEndDA(newValue);
      }
    }
  }

  // clear DA Filter
  const handleCearAllPAFilter = (e) => {
    setStartPA('');
    setEndPA('')
  }

  const handleStartPAChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartPA(newValue);
    }
  };

  const handleEndPAChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      if (newValue >= 100) {
        setEndPA(100)
      }
      else {
        setEndPA(newValue);
      }
    }
  }

  // clear DA Filter
  const handeClearAhrefTrafficFilter = (e) => {
    setStartAhrefTraffic('');
    setEndAhrefTraffic('')
  }

  const handleStartAhrefTrafficChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartAhrefTraffic(newValue);
    }
  };

  const handleEndAhrefTrafficChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setEndAhrefTraffic(newValue)

    }
  }

  // clear DA Filter
  const handeClearSEMRushTrafficFilter = (e) => {
    setStartSEMRushTraffic('');
    setEndSEMRushTraffic('')
  }

  const handleStartSEMRushTrafficChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartSEMRushTraffic(newValue);
    }
  };

  const handleEndSEMRushTrafficChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setEndSEMRushTraffic(newValue)

    }
  }


  const handleStartSpamChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setStartSpam(newValue);
    }
  };

  const handleEndSpamChanges = (e) => {
    const newValue = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(newValue)) {
      setEndSpam(newValue);
    }
  };
  const handleCearAllSpamFilter = (e) => {
    setStartSpam('');
    setEndSpam('')
  }


  // handle clear all Genral filter
  const handleCearAllFilter = () => {
    setSelectedOptions([])
    setSelectedLanguage([])
    setStartPrice('');
    setEndPrice('')
    setSelectedCountry([]);
    setSelectedNiche([])
  }
  const handleCearAllMetricFilter = () => {
    setStartDR('')
    setEndDR('')
    setStartDA('')
    setEndDA('')
    setStartPA('')
    setEndPA('')
    setStartSpam('')
    setEndSpam('')
    setStartAhrefTraffic('')
    setEndAhrefTraffic('')
    setStartSEMRushTraffic('')
    setEndSEMRushTraffic('')
  }
  // clear all genral button hide and show 
  const isAnyFilterActive = () => {
    return (
      selectedOptions.length > 0 ||
      selectedLanguage.length > 0 ||
      selectedCountry.length > 0 ||
      selectedNiche.length > 0 ||
      startPrice !== '' ||
      endPrice !== ''
    );
  };

  const isAnyMatricsFilterActive = () => {
    return (
      startDR !== '' ||
      endDR !== '' ||
      startDA !== '' ||
      endDA !== '' ||
      startPA !== '' ||
      endPA !== '' ||
      startSpam !== '' ||
      endSpam !== '' ||
      startAhrefTraffic !== '' ||
      endAhrefTraffic !== '' ||
      startSEMRushTraffic !== '' ||
      endSEMRushTraffic !== ''
    );
  };

  // const unique = categoryOptions.filter((item, index) => categoryOptions.indexOf(item) === index)
  const uniqueCategory = categoryOptions.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.value === item.value
    ))
  );
  const uniqueLanguage = langOption.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.value === item.value
    ))
  );
  const uniqueCountry = countryOption.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.value === item.value
    ))
  );
  const uniqueNiche = nicheOption.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.value === item.value
    ))
  );

  return (
    <>
      <Container className='d-flex align-items-center justify-content-start'>
        <Navbar.Brand href="#home" className='navbar-brand'>
          <img src={logo} alt="prime pixel logo" height={'110px'} />
        </Navbar.Brand>
      </Container>

      <Container>
        <div className="d-flex justify-content-between align-items-center row">
          <div className="left-box d-flex align-items-center justify-content-center col-md-5 col-12">
            <div>
              <h1>Important Notes.</h1>
              {
                note && note.map((item) => {
                  if (item.activeindicator === "Active") {
                    return (
                      <div key={item._id}>
                        <p><span><FaCheck className='me-2' /></span>{item.content}</p>
                      </div>
                    )
                  }
                })
              }

            </div>
            <div>
              <button className='plus-btn ms-5'>+</button>
            </div>
          </div>
          <div className="right-box d-flex align-items-center justify-content-between col-md-5 col-12">
            <div className="d-flex align-items-center">
              <img src="https://cdn01.meup.com/avatars/94db6a1e-b14f-44b1-b548-15f1e99f44d0.jpg" className='border-0 rounded-circle' height={'60px'} width={'60px'} alt="" />
              <div className='ms-2'>
                <h2 className='m-0'>For Bulk Order- Connect with our sales </h2>
                <h3>Monika Demireva</h3>
                <p className='m-0'>monika.d@esta.com</p>
              </div>
            </div>
            <div className="socal-btn d-flex flex-column ms-5">
              <div className='text-secondary'><FaSkype /></div>
              <div className='text-secondary'><FaLinkedinIn /></div>
              <div className='text-secondary'><FaTwitter /></div>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="filter">
          <h3>Genral Filters</h3>
          <div className="btns d-flex align-items-center flex-wrap">
            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> Price <span>{startPrice ? startPrice : 0}  USD</span> - <span>{endPrice ? endPrice : <IoIosInfinite />}  USD</span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startprice">From</label>
                    <input type="text" value={startPrice} id='startprice' className='form-control' onChange={handleStartChangePrice} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endprice">To</label>
                    <input type="text" value={endPrice} id='endprice' className='form-control' onChange={handleEndChangePrice} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handeClearPriceFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Select
              isMulti
              name="Language"
              options={uniqueLanguage}
              value={selectedLanguage}
              onChange={handleLanguageChange}
              placeholder={`Language`}
              components={{ MultiValue: CustomMultiValue }}
              closeMenuOnSelect={false}
            />

            <Select
              isMulti
              name="Country"
              options={uniqueCountry}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder={`Country`}
              components={{ MultiValue: CustomMultiValue }}
              closeMenuOnSelect={false}
            />

            <Select
              isMulti
              name="Category"
              options={uniqueCategory}
              value={selectedOptions}
              onChange={handleChange}
              placeholder={`Category`}
              components={{ MultiValue: CustomMultiValue }}
              closeMenuOnSelect={false}
            />

            <Select
              isMulti
              name="niche"
              options={uniqueNiche}
              value={selectedNiche}
              onChange={handleNicheChange}
              placeholder={`Niche`}
              components={{ MultiValue: CustomMultiValue }}
              closeMenuOnSelect={false}
            />

            {isAnyFilterActive() && (
              <button className='filter-btn rounded py-2 fw-500' onClick={handleCearAllFilter}>Clear All General Filters</button>
            )}

          </div>
          <h3>Metric filters</h3>
          <div className="btns d-flex align-items-center flex-wrap">
            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> Domain authority (DA) <span>from {startDA ? startDA : 0} DA</span> <span>to {endDA ? endDA : 100} DA</span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startda">From</label>
                    <input type="text" value={startDA} id='startda' className='form-control' onChange={handleStartDAChanges} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endda">To</label>
                    <input type="text" value={endDA} id='endda' className='form-control' onChange={handleEndDAChanges} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handeClearDAFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> Page Authority (PA) <span>from {startPA ? startPA : 0} PA</span> <span>to {endPA ? endPA : 100} PA</span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startpa">From</label>
                    <input type="text" value={startPA} id='startpa' className='form-control' onChange={handleStartPAChanges} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endpa">To</label>
                    <input type="text" value={endPA} id='endpa' className='form-control' onChange={handleEndPAChanges} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handleCearAllPAFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> Spam Score  <span>from {startSpam ? startSpam : 0} Spam</span> <span>to {endSpam ? endSpam : <IoIosInfinite />} Spam</span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startprice">From</label>
                    <input type="text" value={startSpam} id='startprice' className='form-control' onChange={handleStartSpamChanges} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endprice">To</label>
                    <input type="text" value={endSpam} id='endprice' className='form-control' onChange={handleEndSpamChanges} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handleCearAllSpamFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> Domain rating (DR) <span>from {startDR ? startDR : 0} DR</span> <span>to {endDR ? endDR : 100} DR</span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startprice">From</label>
                    <input type="text" value={startDR} id='startprice' className='form-control' onChange={handleStartDRChanges} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endprice">To</label>
                    <input type="text" value={endDR} id='endprice' className='form-control' onChange={handleEndDRChanges} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handeClearDRFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> Ahref traffic <span>from {startAhrefTraffic ? startAhrefTraffic : 0}</span> <span>to {endAhrefTraffic ? endAhrefTraffic : <IoIosInfinite />} </span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startprice">From</label>
                    <input type="text" value={startAhrefTraffic} id='startprice' className='form-control' onChange={handleStartAhrefTrafficChanges} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endprice">To</label>
                    <input type="text" value={endAhrefTraffic} id='endprice' className='form-control' onChange={handleEndAhrefTrafficChanges} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handeClearAhrefTrafficFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant='none' id="dropdown-basic" className='filter-btn d-flex align-items-center justify-content-center' >
                <button className='bg-transparent border-0'><IoIosAddCircleOutline className='me-1' /> SEMRush traffic <span>from {startSEMRushTraffic ? startSEMRushTraffic : 0}</span> <span>to {endSEMRushTraffic ? endSEMRushTraffic : <IoIosInfinite />} </span> </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="input-container mt-2">
                    <label htmlFor="startprice">From</label>
                    <input type="text" value={startSEMRushTraffic} id='startprice' className='form-control' onChange={handleStartSEMRushTrafficChanges} />
                  </div>
                  <div className="input-container mt-2">
                    <label htmlFor="endprice">To</label>
                    <input type="text" value={endSEMRushTraffic} id='endprice' className='form-control' onChange={handleEndSEMRushTrafficChanges} />
                  </div>
                  <div className="input-container mt-3">
                    <button className='clear-btn' type='button' onClick={handeClearSEMRushTrafficFilter}>Clear Filter</button>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {isAnyMatricsFilterActive() && (
              <button className='filter-btn rounded py-2 fw-500' onClick={handleCearAllMetricFilter}>Clear All General Filters</button>
            )}
          </div>

          <div className="btns searchbtn">
            {/* Search button with search icon */}
            <button className="search-button" onClick={toggleSearchInput}>
              <TbSearch size={24} />
            </button>

            {/* Search input with animation */}
            <div className={`search-input-container ${isSearchVisible ? 'visible' : ''}`}>
              <input
                type="text"
                placeholder="Search by Website..."
                className="search-input"
                onChange={handleSearchData}
                value={searchTerm}
              />
            </div>

          </div>

        </div>
      </Container>
      <DataTable
        langOption={selectedLanguage}
        countryOption={selectedCountry}
        selectedOptions={selectedOptions}
        nicheOption={selectedNiche}
        startPrice={startPrice}
        endPrice={endPrice}
        startDA={startDA}
        endDA={endDA}
        startDR={startDR}
        endDR={endDR}
        startSpam={startSpam}
        endSpam={endSpam}
        startPA={startPA}
        endPA={endPA}
        startAhrefTraffic={startAhrefTraffic}
        endAhrefTraffic={endAhrefTraffic}
        startSEMRushTraffic={startSEMRushTraffic}
        endSEMRushTraffic={endSEMRushTraffic}
        searchTerm={searchTerm}
      />
    </>
  )
}

export default MarketPlace