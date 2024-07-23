import React, { useState } from 'react';
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
const Index = () => {
  const name = useSelector((state) => state.user.name);
  const [open, setOpen] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterJobTitle, setFilterJobTitle] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterBirthday, setFilterBirthday] = useState('');
  const [filterAddress, setFilterAddress] = useState('');
  const [currentView, setCurrentView] = useState('employee-details'); // Default to 'employee-details'
  const [showTable, setShowTable] = useState(false); // State to toggle between graph and table

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

  const employeeData = [
    // Existing data
    {
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      startDate: '2023-01-15',
      birthday: '1990-05-12',
      address: '1234 Elm Street, Springfield'
    },
    {
      firstName: 'Jane',
      middleName: 'B.',
      lastName: 'Smith',
      jobTitle: 'Project Manager',
      department: 'Product',
      startDate: '2022-07-19',
      birthday: '1985-11-30',
      address: '5678 Oak Avenue, Springfield'
    },
    // Manually added data
    {
      firstName: 'Alice',
      middleName: 'C.',
      lastName: 'Johnson',
      jobTitle: 'Data Scientist',
      department: 'Analytics',
      startDate: '2024-02-10',
      birthday: '1988-03-25',
      address: '91011 Maple Street, Metropolis'
    },
    {
      firstName: 'Bob',
      middleName: 'D.',
      lastName: 'Williams',
      jobTitle: 'UX Designer',
      department: 'Design',
      startDate: '2023-05-22',
      birthday: '1992-06-15',
      address: '1213 Pine Lane, Gotham'
    },
    {
      firstName: 'Carol',
      middleName: 'E.',
      lastName: 'Davis',
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      startDate: '2022-11-30',
      birthday: '1984-08-05',
      address: '1415 Oak Drive, Star City'
    },
    {
      firstName: 'David',
      middleName: 'F.',
      lastName: 'Miller',
      jobTitle: 'Systems Analyst',
      department: 'IT',
      startDate: '2024-03-18',
      birthday: '1990-12-01',
      address: '1617 Cedar Avenue, Riverdale'
    },
    {
      firstName: 'Eve',
      middleName: 'G.',
      lastName: 'Wilson',
      jobTitle: 'HR Specialist',
      department: 'Human Resources',
      startDate: '2023-08-14',
      birthday: '1986-04-20',
      address: '1819 Birch Street, Smallville'
    },
    {
      firstName: 'Frank',
      middleName: 'H.',
      lastName: 'Moore',
      jobTitle: 'Sales Executive',
      department: 'Sales',
      startDate: '2024-01-09',
      birthday: '1989-09-30',
      address: '2021 Elm Road, Metropolis'
    },
    {
      firstName: 'Grace',
      middleName: 'I.',
      lastName: 'Taylor',
      jobTitle: 'Customer Support',
      department: 'Support',
      startDate: '2023-04-25',
      birthday: '1991-07-16',
      address: '2223 Maple Court, Gotham'
    },
    {
      firstName: 'Henry',
      middleName: 'J.',
      lastName: 'Anderson',
      jobTitle: 'Product Designer',
      department: 'Design',
      startDate: '2024-06-12',
      birthday: '1987-11-22',
      address: '2425 Pine Boulevard, Star City'
    },
    {
      firstName: 'Ivy',
      middleName: 'K.',
      lastName: 'Thomas',
      jobTitle: 'Business Analyst',
      department: 'Business',
      startDate: '2022-09-08',
      birthday: '1993-02-18',
      address: '2627 Oak Lane, Riverdale'
    }
  ];

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

  const salesReportData = [
    {
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      orderDate: '2024-01-01',
      status: 'Completed',
      account: 'AC12345',
      billToAddress: '1234 Elm Street, Springfield',
      subtotal: 1500,
      tax: 150,
      total: 1650,
    },
    {
      firstName: 'Jane',
      middleName: 'B.',
      lastName: 'Smith',
      orderDate: '2024-01-02',
      status: 'Pending',
      account: 'AC12346',
      billToAddress: '5678 Oak Avenue, Springfield',
      subtotal: 1200,
      tax: 120,
      total: 1320,
    },
    {
      firstName: 'Alice',
      middleName: 'C.',
      lastName: 'Johnson',
      orderDate: '2024-01-03',
      status: 'Completed',
      account: 'AC12347',
      billToAddress: '9101 Maple Road, Shelbyville',
      subtotal: 1800,
      tax: 180,
      total: 1980,
    },
    {
      firstName: 'Bob',
      middleName: 'D.',
      lastName: 'Brown',
      orderDate: '2024-01-04',
      status: 'In Progress',
      account: 'AC12348',
      billToAddress: '1213 Birch Lane, Capital City',
      subtotal: 1600,
      tax: 160,
      total: 1760,
    },
    {
      firstName: 'Charlie',
      middleName: 'E.',
      lastName: 'Davis',
      orderDate: '2024-01-05',
      status: 'Completed',
      account: 'AC12349',
      billToAddress: '1415 Pine Street, Springfield',
      subtotal: 1400,
      tax: 140,
      total: 1540,
    },
    {
      firstName: 'Daniel',
      middleName: 'F.',
      lastName: 'Evans',
      orderDate: '2024-01-06',
      status: 'Pending',
      account: 'AC12350',
      billToAddress: '1617 Cedar Avenue, Shelbyville',
      subtotal: 1700,
      tax: 170,
      total: 1870,
    },
    {
      firstName: 'Eve',
      middleName: 'G.',
      lastName: 'Franklin',
      orderDate: '2024-01-07',
      status: 'Completed',
      account: 'AC12351',
      billToAddress: '1819 Spruce Boulevard, Capital City',
      subtotal: 1100,
      tax: 110,
      total: 1210,
    },
    {
      firstName: 'Frank',
      middleName: 'H.',
      lastName: 'Green',
      orderDate: '2024-01-08',
      status: 'In Progress',
      account: 'AC12352',
      billToAddress: '2021 Fir Lane, Springfield',
      subtotal: 1900,
      tax: 190,
      total: 2090,
    },
    {
      firstName: 'Grace',
      middleName: 'I.',
      lastName: 'Harris',
      orderDate: '2024-01-09',
      status: 'Completed',
      account: 'AC12353',
      billToAddress: '2223 Willow Street, Shelbyville',
      subtotal: 1300,
      tax: 130,
      total: 1430,
    },
    {
      firstName: 'Henry',
      middleName: 'J.',
      lastName: 'Johnson',
      orderDate: '2024-01-10',
      status: 'Pending',
      account: 'AC12354',
      billToAddress: '2425 Chestnut Avenue, Capital City',
      subtotal: 1250,
      tax: 125,
      total: 1375,
    },
    {
      firstName: 'Ivy',
      middleName: 'K.',
      lastName: 'King',
      orderDate: '2024-01-11',
      status: 'Completed',
      account: 'AC12355',
      billToAddress: '2627 Redwood Road, Springfield',
      subtotal: 1550,
      tax: 155,
      total: 1705,
    },
    {
      firstName: 'Jack',
      middleName: 'L.',
      lastName: 'Lewis',
      orderDate: '2024-01-12',
      status: 'In Progress',
      account: 'AC12356',
      billToAddress: '2829 Magnolia Boulevard, Shelbyville',
      subtotal: 1450,
      tax: 145,
      total: 1595,
    },
    {
      firstName: 'Karen',
      middleName: 'M.',
      lastName: 'Miller',
      orderDate: '2024-01-13',
      status: 'Completed',
      account: 'AC12357',
      billToAddress: '3031 Poplar Lane, Capital City',
      subtotal: 1750,
      tax: 175,
      total: 1925,
    },
  ];

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
            width: openSideBar ? 240 : 75,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: openSideBar ? 240 : 75,
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
                    {index % 2 === 0 ? <AccountCircle style={{ fontSize: 35, marginLeft: 3, marginRight: 20 }} /> : <BarChartIcon style={{ fontSize: 35, marginLeft: 3, marginRight: 20 }} />}
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
                <div id="table" style={{ width: '100%' }}>
                  <h1 id="table-header">Employee Details</h1>
                  <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>First Name</TableCell>
                          <TableCell>Middle Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Job Title</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>Birthday</TableCell>
                          <TableCell>Address</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.length > 0 ? (
                          filteredData.map((employee, index) => (
                            <TableRow key={index}>
                              <TableCell>{employee.firstName}</TableCell>
                              <TableCell>{employee.middleName}</TableCell>
                              <TableCell>{employee.lastName}</TableCell>
                              <TableCell>{employee.jobTitle}</TableCell>
                              <TableCell>{employee.department}</TableCell>
                              <TableCell>{employee.startDate}</TableCell>
                              <TableCell>{employee.birthday}</TableCell>
                              <TableCell>{employee.address}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} align="center">No results found</TableCell>
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
