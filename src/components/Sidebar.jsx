import React from 'react'
import '../assets/css/style.css'
import { MdDashboard } from "react-icons/md";
import {Accordion} from 'react-bootstrap'
import { IoMdSettings } from "react-icons/io";
import {Link} from 'react-router-dom';
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";


function Sidebar() {
  return (
    <div>
         <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html">
            <MdDashboard className='me-2'/>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <Accordion>
              <Accordion.Item eventKey="0" className='accordionItem'>
                <Accordion.Header className='accordionHeader'><IoMdSettings className='me-2'/> Setting</Accordion.Header>
                <Accordion.Body className='p-0'>
                    <ul className="nav my-0">
                    <li className="nav-item">
                         <Link className="nav-link" to={'/lang'}>
                            <i className="ti-layout-list-post menu-icon"></i>
                            <span className="menu-title">Language</span>
                         </Link>
          </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={'/category'}>
                            <i className="ti-layout-list-post menu-icon"></i>
                            <span className="menu-title">Category</span>
                         </Link>
                    </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={'/country'}>
                            <i className="ti-layout-list-post menu-icon"></i>
                            <span className="menu-title">Country</span>
                         </Link>
                    </li>
                    <li className="nav-item">
                         <Link className="nav-link" to={'/niche'}>
                            <i className="ti-layout-list-post menu-icon"></i>
                            <span className="menu-title">Niche</span>
                         </Link>
                    </li>
                    </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/sites'}>
              <FaDatabase className='me-3'/>
              <span className="menu-title">Sites</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/notes'}>
              <MdOutlineSpeakerNotes className='me-3'/>
              <span className="menu-title">Notes</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar