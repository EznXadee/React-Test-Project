import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './styles.scss';
import LineChartComponent from '../../components/LineChartComponent';
import CustomTextField from '../../components/CustomTextField';
import { SlMenu } from "react-icons/sl";
import getEmployees from '../../api/getEmployees';
import { set1, set2 } from './data.jsx';



const Index = () => {
  const name = useSelector((state) => state.user.name);
  const [open, setOpen] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterJobTitle, setFilterJobTitle] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterBirthday, setFilterBirthday] = useState('');
  const [filterAddress, setFilterAddress] = useState('');
  const [currentView, setCurrentView] = useState('employee-details');
  const [showTable, setShowTable] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleFilterChangeName = (event) => {
    setFilterName(event.target.value);
  };
  const handleFilterChangeJobTitle = (event) => {
    setFilterJobTitle(event.target.value);
  };
  const handleFilterChangeDepartment = (event) => {
    setFilterDepartment(event.target.value);
  };
  const handleFilterChangeStartDate = (event) => {
    setFilterStartDate(event.target.value);
  };
  const handleFilterChangeBirthday = (event) => {
    setFilterBirthday(event.target.value);
  };
  const handleFilterChangeAddress = (event) => {
    setFilterAddress(event.target.value);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [employeeData, setEmployeeData] = useState(
    set2
  );

  useEffect(() => {
    getEmployees().then((r) => {
      setEmployeeData(r);
    });
  }, []);

  const filteredData = employeeData.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`.toLowerCase();
    return (
      (filterName === '' || fullName.includes(filterName.toLowerCase())) &&
      (filterJobTitle === '' || employee.jobTitle.toLowerCase().includes(filterJobTitle.toLowerCase())) &&
      (filterDepartment === '' || employee.department.toLowerCase().includes(filterDepartment.toLowerCase())) &&
      (filterStartDate === '' || employee.startDate.includes(filterStartDate)) &&
      (filterBirthday === '' || employee.birthday.includes(filterBirthday)) &&
      (filterAddress === '' || employee.address.toLowerCase().includes(filterAddress.toLowerCase()))
    );
  });

  const salesReportData = set1;

  const filteredSalesReportData = salesReportData.filter((report) => {
    const fullName = `${report.firstName} ${report.middleName} ${report.lastName}`.toLowerCase();
    return filterName === '' || fullName.includes(filterName.toLowerCase());
  });
  const [openSideBar, setOpenSideBar] = React.useState(false)
  function toggleSidebar() {
    setOpenSideBar(
      prevVal => !prevVal
    )
  }
  return (
    <>
      <div id="nav-section">
        <Button style={{ color: "white", fontSize: 25, minWidth: 40 }} className="ham-burger" id="ham-burger" onClick={toggleSidebar}>
          <SlMenu />
        </Button>
        <h1>Data Panel</h1>
        <h2>{name}</h2>
      </div>
      <div id="panel-section">
        <Drawer
          anchor='left'
          open={open}
          onClose={toggleDrawer}
          variant='persistent'
          sx={{
            width: openSideBar ? 240 : 72,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: openSideBar ? 240 : 72,
              boxSizing: 'border-box',
              marginTop: 8.9,
              backgroundColor: 'white',
              transition: 'width 0.2s ease-in-out',
            },
          }}
        >
          <List>
            {['Employee Details', 'Sales Report'].map((text, index) => (
              <ListItem key={text} disablePadding style={{ width: 500 }}>
                <ListItemButton onClick={() => setCurrentView(text.toLowerCase().replace(' ', '-'))}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AccountCircle style={{ fontSize: 35, marginLeft: 2, marginRight: 20 }} /> : <BarChartIcon style={{ fontSize: 35, marginLeft: 2, marginRight: 20 }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div id="main-content">
          <div id="panel-content">
            {currentView === 'employee-details' && (
              <div id="search-container">
                <h1 id="search-container-header">Filter by</h1>
                <div id="search-card">
                  <div id="filter-container">
                    <CustomTextField
                      label="Name"
                      variant="outlined"
                      value={filterName}
                      onChange={handleFilterChangeName}
                      margin="normal"
                      id="search-field"
                    />
                    <CustomTextField
                      label="Job Title"
                      variant="outlined"
                      value={filterJobTitle}
                      onChange={handleFilterChangeJobTitle}
                      margin="normal"
                      id="search-field"
                    />
                    <CustomTextField
                      label="Department"
                      variant="outlined"
                      value={filterDepartment}
                      onChange={handleFilterChangeDepartment}
                      margin="normal"
                      id="search-field"
                    />
                    <CustomTextField
                      label="Start Date"
                      variant="outlined"
                      value={filterStartDate}
                      onChange={handleFilterChangeStartDate}
                      margin="normal"
                      id="search-field"
                    />
                    <CustomTextField
                      label="Birthday"
                      variant="outlined"
                      value={filterBirthday}
                      onChange={handleFilterChangeBirthday}
                      margin="normal"
                      id="search-field"
                    />
                    <CustomTextField
                      label="Address"
                      variant="outlined"
                      value={filterAddress}
                      onChange={handleFilterChangeAddress}
                      margin="normal"
                      id="search-field"
                    />
                  </div>
                </div>
                <div id="table">
                  <h1 id="table-header">Employee Details</h1>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Business ID</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Middle Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Job Title</TableCell>
                          <TableCell>Hire Date</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>BirthDate</TableCell>
                          <TableCell>Address Line 1</TableCell>
                          <TableCell>Address Line 2</TableCell>
                          <TableCell>City</TableCell>
                          <TableCell>Postal Code</TableCell>
                          <TableCell>Email Address</TableCell>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>State</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.length > 0 ? (
                          filteredData.map((employee, index) => (
                            <TableRow key={index}>
                              <TableCell>{employee.BusinessID}</TableCell>
                              <TableCell>{employee.FirstName}</TableCell>
                              <TableCell>{employee.MiddleName}</TableCell>
                              <TableCell>{employee.LastName}</TableCell>
                              <TableCell>{employee.JobTitle}</TableCell>
                              <TableCell>{formatDate(employee.HireDate)}</TableCell>
                              <TableCell>{employee.Department}</TableCell>
                              <TableCell>{formatDate(employee.BirthDate)}</TableCell>
                              <TableCell>{employee.AddressLine1}</TableCell>
                              <TableCell>{employee.AddressLine2}</TableCell>
                              <TableCell>{employee.City}</TableCell>
                              <TableCell>{employee.PostalCode}</TableCell>
                              <TableCell>{employee.EmailAddress}</TableCell>
                              <TableCell>{employee.PhoneNumber}</TableCell>
                              <TableCell>{employee.State}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={15} align="center">No results found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

              </div>

            )}
            {currentView === 'sales-report' && (
              <div>
                <div id="sales-report-toggle" style={{ padding: '30px' }}>

                </div>
                <h1 id="table-header">Sales Report</h1>
                <ToggleButtonGroup
                  color="primary"
                  value={showTable ? 'table' : 'graph'}
                  exclusive
                  onChange={(event, newValue) => setShowTable(newValue === 'table')}
                  aria-label="View toggle"
                  style={{ width: '100%' }}
                >
                  <ToggleButton value="graph">Graph</ToggleButton>
                  <ToggleButton value="table">Table</ToggleButton>
                </ToggleButtonGroup>

                {showTable ? (
                  <div id="table" style={{ width: '100%' }}>
                    <div id="header-toggle">
                      <h1 id="table-header">Employee Details</h1>
                      <CustomTextField
                        label="Search by Name"
                        variant="outlined"
                        value={filterName}
                        onChange={handleFilterChangeName}
                        margin="normal"
                        id="search-field"
                      />
                    </div>
                    <TableContainer component={Paper} style={{ width: '100%' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Middle Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell>Bill To Address</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell>Tax</TableCell>
                            <TableCell>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredSalesReportData.length > 0 ? (
                            filteredSalesReportData.map((report, index) => (
                              <TableRow key={index}>
                                <TableCell>{report.firstName}</TableCell>
                                <TableCell>{report.middleName}</TableCell>
                                <TableCell>{report.lastName}</TableCell>
                                <TableCell>{report.orderDate}</TableCell>
                                <TableCell>{report.status}</TableCell>
                                <TableCell>{report.account}</TableCell>
                                <TableCell>{report.billToAddress}</TableCell>
                                <TableCell>{report.subtotal}</TableCell>
                                <TableCell>{report.tax}</TableCell>
                                <TableCell>{report.total}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={10} align="center">No results found</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                ) : (
                  <div id="graph-container" style={{ width: '100%' }}>
                    <LineChartComponent />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Index;
