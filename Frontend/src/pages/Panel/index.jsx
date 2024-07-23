import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
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
import { set1, set2 } from './data.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Index = () => {
  const name = useSelector((state) => state.user.name);
  const [open, setOpen] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterJobTitle, setFilterJobTitle] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStartDate, setFilterStartDate] = useState(null); // Changed to null
  const [filterEndDate, setFilterEndDate] = useState(null); // Changed to null
  const [filterBirthday, setFilterBirthday] = useState(null); // Changed to null
  const [filterHireDate, setFilterHireDate] = useState(null); // Changed to null
  const [filterAddress, setFilterAddress] = useState('');
  const [currentView, setCurrentView] = useState('employee-details');
  const [showTable, setShowTable] = useState(false);
  const [filterBuisnessID, setFilterBuisnessID] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    //Return in MM/DD/YYYY format
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
  const handleFilterChangeStartDate = (newDate) => {
    setFilterStartDate(newDate ? newDate.format('YYYY-MM-DD') : null);
  };
  const handleFilterChangeEndDate = (newDate) => {
    setFilterEndDate(newDate ? newDate.format('YYYY-MM-DD') : null);
  };
  const handleFilterChangeBirthday = (newDate) => {
    setFilterBirthday(newDate ? newDate.format('YYYY-MM-DD') : null);
  };
  const handleFilterChangeAddress = (event) => {
    setFilterAddress(event.target.value);
  };
  const handleBuisnessID = (event) => {
    setFilterBuisnessID(event.target.value);
  };
  const handleFilterChangeHireDate = (newDate) => {
    setFilterHireDate(newDate ? newDate.format('YYYY-MM-DD') : null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [employeeData, setEmployeeData] = useState(set2);

  const filteredData = employeeData.filter((employee) => {
    const fullName = `${employee.FirstName} ${employee.MiddleName} ${employee.LastName}`.toLowerCase();
    const employeeHireDate = dayjs(employee.HireDate);
    const employeeBirthDate = dayjs(employee.BirthDate);

    const hireDateMatch = filterHireDate ? dayjs(filterHireDate).isSame(employeeHireDate, 'day') : true;
    const birthdayMatch = filterBirthday ? dayjs(filterBirthday).isSame(employeeBirthDate, 'day') : true;
    const hireDateRangeMatch = (!filterStartDate || employeeHireDate.isAfter(dayjs(filterStartDate).subtract(1, 'day'))) &&
      (!filterEndDate || employeeHireDate.isBefore(dayjs(filterEndDate).add(1, 'day')));

    return (
      (filterName === '' || fullName.includes(filterName.toLowerCase())) &&
      (filterJobTitle === '' || employee.JobTitle.toLowerCase().includes(filterJobTitle.toLowerCase())) &&
      (filterDepartment === '' || employee.Department.toLowerCase().includes(filterDepartment.toLowerCase())) &&
      hireDateRangeMatch &&
      hireDateMatch &&
      birthdayMatch &&
      (filterAddress === '' ||
        [employee.AddressLine1, employee.AddressLine2, employee.City, employee.State].filter(Boolean).some(field => field.toLowerCase().includes(filterAddress.toLowerCase())))
    );
  });

  const salesReportData = set1;

  const filteredSalesReportData = salesReportData.filter((report) => {
    const fullName = `${report.FirstName} ${report.MiddleName} ${report.LastName}`.toLowerCase();
    const reportDate = dayjs(report.OrderDate);
    const startDate = filterStartDate ? dayjs(filterStartDate) : null;
    const endDate = filterEndDate ? dayjs(filterEndDate) : null;
    return (
      (filterName === '' || fullName.includes(filterName.toLowerCase())) &&
      (filterBuisnessID === '' || report.BusinessID.toString().includes(filterBuisnessID)) &&
      (startDate === null || reportDate.isAfter(startDate.subtract(1, 'day'))) &&
      (endDate === null || reportDate.isBefore(endDate.add(1, 'day')))
    );
  });

  const [openSideBar, setOpenSideBar] = useState(false);
  const toggleSidebar = () => {
    setOpenSideBar(prevVal => !prevVal);
  };

  const avgSale = salesReportData.map(report => report.SubTotal); // Calculate avgSale data here
  const totalSale = salesReportData.map(report => report.TotalDue); // Calculate totalSale data here

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
                <h1 id="search-container-header">Employee Details</h1>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Hire Date"
                        value={filterHireDate ? dayjs(filterHireDate) : null}
                        onChange={handleFilterChangeHireDate}
                        renderInput={(params) => <CustomTextField {...params} margin="normal" id="search-field" />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Birth Date"
                        value={filterBirthday ? dayjs(filterBirthday) : null}
                        onChange={handleFilterChangeBirthday}
                        renderInput={(params) => <CustomTextField {...params} margin="normal" id="search-field" />}
                      />
                    </LocalizationProvider>
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
                  <TableContainer style={{ marginTop: 40 }}>
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
                          <TableCell>Birth Date</TableCell>
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
                <div id="sales-report-toggle">
                  {/* Add any other UI elements here */}
                </div>
                <div id="top-section">
                  <h1 id="table-header">Sales Report</h1>
                  <ToggleButtonGroup
                    color="primary"
                    value={showTable ? 'table' : 'graph'}
                    exclusive
                    onChange={(event, newValue) => setShowTable(newValue === 'table')}
                    aria-label="View toggle"
                    style={{ width: "300px", }}
                  >
                    <ToggleButton value="graph">Visual Display</ToggleButton>
                    <ToggleButton value="table">Tablular Entries</ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <div id="table" style={{ width: '100%' }}>
                  <div id="search-card2">
                    <div id="filter-container2">
                      <CustomTextField
                        label="Employee Name"
                        variant="outlined"
                        value={filterName}
                        onChange={handleFilterChangeName}
                        margin="normal"
                        id="search-field"
                      />
                      <CustomTextField
                        label="Buisness ID"
                        variant="outlined"
                        value={filterBuisnessID}
                        onChange={handleBuisnessID}
                        margin="normal"
                        id="search-field"
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Start Date"
                          value={filterStartDate ? dayjs(filterStartDate) : null}
                          onChange={handleFilterChangeStartDate}
                          renderInput={(params) => <CustomTextField {...params} margin="normal" id="search-field" />}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="End Date"
                          value={filterEndDate ? dayjs(filterEndDate) : null}
                          onChange={handleFilterChangeEndDate}
                          renderInput={(params) => <CustomTextField {...params} margin="normal" id="search-field" />}
                        />
                      </LocalizationProvider>
                      <Button variant="contained" style={{ backgroundColor: '#7f47df', height: '55px', marginBottom: '10px' }}>Get Sales</Button>
                    </div>
                  </div>
                </div>
                {showTable ? (
                  <div id="table">
                    <TableContainer id="second" style={{ width: 'calc(100%' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Seller Name F</TableCell>
                            <TableCell>Seller Name M</TableCell>
                            <TableCell>Seller Name L</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell>Business ID</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell>Tax</TableCell>
                            <TableCell>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredSalesReportData.length > 0 ? (
                            filteredSalesReportData.map((report, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{formatDate(report.OrderDate)}</TableCell>
                                <TableCell>{report.FirstName}</TableCell>
                                <TableCell>{report.MiddleName}</TableCell>
                                <TableCell>{report.LastName}</TableCell>
                                <TableCell>{report.Status}</TableCell>
                                <TableCell>{report.AccountNumber}</TableCell>
                                <TableCell>{report.BusinessID}</TableCell>
                                <TableCell>{report.SubTotal}</TableCell>
                                <TableCell>{report.TaxAmt}</TableCell>
                                <TableCell>{report.TotalDue}</TableCell>
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
                  <div id="graph-container">
                    <LineChartComponent avgSale={avgSale} totalSale={totalSale} />
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
