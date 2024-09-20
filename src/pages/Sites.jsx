import React , {useState} from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';
import SiteList from '../components/SiteList';
import AdminPannel from './AdminPannel';


function Sites() {
  const [showAddPanel, setShowAddPanel] = useState(false); 
  const [siteForEdit , setSiteForEdit] = useState('')

  // Toggle the visibility of the Add Language panel
  const handleRenderAddSites = () => {
    setSiteForEdit(null)
    setShowAddPanel(!showAddPanel);
  };

  const handleEdit = (editData)=>{
    setSiteForEdit(editData)
     setShowAddPanel(true)
  }
  return (
    <div className="admin-panel">
      <NavBar />

              {/* Conditionally render the panel */}
              {showAddPanel ? (
            
            <AdminPannel handleRenderAddSites ={handleRenderAddSites} siteForEdit={siteForEdit}/>

            ) : (

            <div className="container-fluid page-body-wrapper">
              <Sidebar />
            <div className="main-panel">
              <div className="content-wrapper">
 
              <SiteList handleRenderAddSites={handleRenderAddSites} onEdit={handleEdit}/>
                       
              </div>
            </div>
            </div>
        )}
    </div>
  );
}

export default Sites;
