import React, { useState, useEffect } from 'react';
import '../assets/css/datatable.css';
import { Table } from 'react-bootstrap';
import { TbSend } from "react-icons/tb";
import axios from 'axios';

import {
  DatatableWrapper,
  TableHeader,
  TableBody,
  Filter,
  PaginationOptions,
  Pagination
} from 'react-bs-datatable';

const header = [
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

const DataTable = ({
  countryOption, selectedOptions, startPrice, endPrice, startDR, endDR,
  startDA, endDA, langOption, nicheOption, startPA, endPA, startSpam, endSpam, startAhrefTraffic, 
  endAhrefTraffic, startSEMRushTraffic, endSEMRushTraffic,searchTerm
}) => {
  const [data, setData] = useState([]); 
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [niche, setNiche] = useState('');


  // Fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.110.194.148:5000/api/data');
        const serverData = response.data;

        // Format data for UI
        const formattedData = serverData.map(item => ({
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

        setData(formattedData); // Set formatted data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle filters (Category, Country, Language, Niche)
  useEffect(() => {
    setCategory(selectedOptions?.map(option => option.value).join(',') || '');
  }, [selectedOptions]);

  useEffect(() => {
    setCountry(countryOption?.map(option => option.value).join(',') || '');
  }, [countryOption]);

  useEffect(() => {
    setLanguage(langOption?.map(option => option.value).join(',') || '');
  }, [langOption]);

  useEffect(() => {
    setNiche(nicheOption?.map(option => option.value).join(',') || '');
  }, [nicheOption]);

  // Apply filters to data, including search term
  const displayedData = data.filter(row => {
    // Filter by Search Term (Website)
    const searchFilter = searchTerm ? row.website.props.children[0]?.props.children.toLowerCase().includes(searchTerm) : true;

    const startPriceFilter = startPrice ? row.price.props.children[1] >= startPrice : true;
    const endPriceFilter = endPrice ? row.price.props.children[1] <= endPrice : true;

    const categoryFilter = category ? category.split(',').some(cat => row.category.props.children === cat) : true;
    const countryFilter = country ? country.split(',').some(cat => row.country === cat) : true;
    const languageFilter = language ? language.split(',').some(cat => row.language.props.children === cat) : true;
    const nicheFilter = niche ? niche.split(',').some(cat => row.niche === cat) : true;

    const startDRFilter = startDR ? row.dr.props.children >= startDR : true;
    const endDRFilter = endDR ? row.dr.props.children <= endDR : true;

    const startDAFilter = startDA ? row.da.props.children >= startDA : true;
    const endDAFilter = endDA ? row.da.props.children <= endDA : true;

    const startPAFilter = startPA ? row.pa.props.children >= startPA : true;
    const endPAFilter = endPA ? row.pa.props.children <= endPA : true;

    const startSpamFilter = startSpam ? row.spamScore.props.children >= startSpam : true;
    const endSpamFilter = endSpam ? row.spamScore.props.children <= endSpam : true;

    const startAhrefTrafficFilter = startAhrefTraffic ? row.ahrefTraffic.props.children >= startAhrefTraffic : true;
    const endAhrefTrafficFilter = endAhrefTraffic ? row.ahrefTraffic.props.children <= endAhrefTraffic : true;

    const startSEMRushTrafficFilter = startSEMRushTraffic ? row.SEMRushTraffic.props.children >= startSEMRushTraffic : true;
    const endSEMRushTrafficFilter = endSEMRushTraffic ? row.SEMRushTraffic.props.children <= endSEMRushTraffic : true;

    return searchFilter && categoryFilter && startPriceFilter && endPriceFilter && countryFilter && startDRFilter && endDRFilter && startDAFilter && endDAFilter && languageFilter && nicheFilter && startPAFilter && endPAFilter && startSpamFilter && endSpamFilter && startAhrefTrafficFilter && endAhrefTrafficFilter && startSEMRushTrafficFilter && endSEMRushTrafficFilter;
  });

  return (
    <div className="container mt-5 table-responsive">

      <Table>
        <DatatableWrapper
          body={displayedData}
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
  );
};

export default DataTable;
