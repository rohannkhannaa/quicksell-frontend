// Controls.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import tunerIcon from "./tuner.svg";


const Controls = ({ handleGroupingChange, handleSortChanging }) => (
  <div className="controls"> 
    <Navbar className="bg-body-tertiary">
    <Container>
      <Navbar.Collapse id="basic-navbar-nav border border-dark">
        <Nav className="me-auto">
          <img src={tunerIcon} alt="Tuner Icon" />
          <NavDropdown title="Display" id="basic-nav-dropdown">
            <table style={{margin : '0.3rem 1rem'}}>
                <tr>
                    <td style={{color:'grey'}}>Grouping</td>
                    <td style={{minWidth : '4rem'}}></td>
                    <td>
                        <select id = "group" onChange={e => handleGroupingChange(e.target.value)}>
                            <option value="status">Status</option>
                            <option value="userId" >User ID</option>
                            <option value="priority" >Priority</option>
                        </select>
                    </td>
                </tr>
                <tr style={{height:"0.2rem"}}></tr>
                <tr>
                    <td style={{color:'grey'}}>Ordering</td>
                    <td style={{width : '1rem'}}></td>
                    <td>
                    <select id = "order" onChange={e => handleSortChanging(e.target.value)}>
                            <option value="title">Title</option>
                            <option value="priority" >Priority</option>
                        </select>
                    </td>
                </tr>
            </table>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
);

export default Controls;
