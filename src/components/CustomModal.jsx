import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Alert } from 'react-bootstrap';

// Predefined valid data lists

function CustomModal({ bulkData, show, handleClose, handleBulkDataSubmit , validCategories , validCountries , validLanguages , validNiches }) {
    const [errors, setErrors] = useState([]);


    // Function to validate data
    const validateData = () => {


        const validCategoryNames = validCategories
        .filter(category => category.activeindicator === 'Active') 
        .map(catgory => catgory.categoryName    );

        const validCountryNames = validCountries
        .filter(country => country.activeindicator === 'Active') 
        .map(country => country.countryName);

        const validLanguageNames = validLanguages
        .filter(lang => lang.activeindicator === 'Active') 
        .map(lang => lang.langName);

        const validNicheNames = validNiches
        .filter(niche => niche.activeindicator === 'Active') 
        .map(niche => niche.nicheName);

        const validationErrors = bulkData.map((data, index) => {
            const rowErrors = {};

            // Validate Category
            if (!validCategoryNames.includes(data.Category)) {
                rowErrors.Category = 'Invalid Category';
            }

            // Validate Niche
            if (!validNicheNames.includes(data.Niche)) {
                rowErrors.Niche = 'Invalid Niche';
            }

            // Validate Language
            if (!validLanguageNames.includes(data.Language)) {
                rowErrors.Language = 'Invalid Language';
            }

            // Validate Country
            if (!validCountryNames.includes(data.Country)) {
                rowErrors.Country = 'Invalid Country';
            }

            // Return row errors only if there are any
            return Object.keys(rowErrors).length > 0
                ? { rowIndex: index + 1, errors: rowErrors }
                : null;
        }).filter(row => row !== null); // Only keep rows with errors

        setErrors(validationErrors);
    };

    // Validate data when the modal opens
    useEffect(() => {
        if (show) {
            validateData();
        }
    }, [show, bulkData]);
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Data Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Display validation errors */}
                {errors.length > 0 && (
                    <Alert variant="danger">
                        <h2>Validation Errors:</h2>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>
                                    Row {error.rowIndex}:
                                    {Object.entries(error.errors).map(([field, message], i) => (
                                        <span key={i} style={{ marginLeft: '10px' }}>
                                            {field} - {message}
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                        <div className="row bg-light p-3 border rounded">
                            <div className="col-12">
                            <h3 className='mb-2'>Accept only these- </h3>
                            </div>
                            <div className="col-3">
                                <h4>Niche</h4>
                                    {
                                        validNiches && validNiches.map((niche)=>{
                                            return <p className='text-dark'>{niche.nicheName}</p>
                                        })
                                    }
                            </div>
                            <div className="col-3">
                                <h4>Language</h4>
                                    {
                                        validLanguages && validLanguages.map((lang)=>{
                                            return <p className='text-dark'>{lang.langName}</p>
                                        })
                                    }
                            </div>
                            <div className="col-3">
                                <h4>Category</h4>
                                    {
                                        validCategories && validCategories.map((cat)=>{
                                            return <p className='text-dark'>{cat.categoryName}</p>
                                        })
                                    }
                            </div>
                            <div className="col-3">
                                <h4>Country</h4>
                                    {
                                        validCountries && validCountries.map((country)=>{
                                            return <p className='text-dark'>{country.countryName}</p>
                                        })
                                    }
                            </div>
                            <div className="col-12">
                                <p><span className='fw-bold text-dark'>Note- </span>please go to csv file and change according to these</p>
                            </div>
                        </div>
                    </Alert>
                )}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Row N.</th>
                            <th>Price</th>
                            <th>Website</th>
                            <th>DA</th>
                            <th>PA</th>
                            <th>Spam Score</th>
                            <th>DR</th>
                            <th>Ahref Traffic</th>
                            <th>SEMRush Traffic</th>
                            <th>Niche</th>
                            <th>Type</th>
                            <th>Language</th>
                            <th>Category</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bulkData && bulkData.map((data, ind) => {
                                const rowError = errors.find(error => error.rowIndex === ind + 1);
                                return (
                                    <tr key={ind} style={{ backgroundColor: rowError ? '#f8d7da' : 'transparent' }}>
                                        <td>{ind + 1}</td>
                                        <td>${data.Price}</td>
                                        <td>{data.Website}</td>
                                        <td>{data.DA}</td>
                                        <td>{data.PA}</td>
                                        <td>{data.SpamScore}</td>
                                        <td>{data.DR}</td>
                                        <td>{data.AhrefTraffic}</td>
                                        <td>{data.SEMRushTraffic}</td>
                                        <td>{data.Niche}</td>
                                        <td>{data.Type}</td>
                                        <td>{data.Language}</td>
                                        <td>{data.Category}</td>
                                        <td>{data.Country}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleBulkDataSubmit} disabled={errors.length > 0}>
                    Save
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;
