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
  Typography
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './styles.scss';
import LineChartComponent from '../../components/LineChartComponent';
import CustomTextField from '../../components/CustomTextField';

const Index = () => {
  const name = useSelector((state) => state.user.name);
  const [open, setOpen] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterJobTitle, setFilterJobTitle] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterBirthday, setFilterBirthday] = useState('');
    const [filterAddress, setFilterAddress] = useState('');
  const [currentView, setCurrentView] = useState('employee'); // State to manage the current view

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
  })

  return (
    <>
      <div id="nav-section">
        <h1>Panel</h1>
        <h2>{name}</h2>
      </div>
      <div id="panel-section">
        <Drawer
          anchor='left'
          open={open}
          onClose={toggleDrawer}
          variant='persistent'
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              marginTop: 8.8,
            },
          }}
        >
          <List>
            {['Employee Details', 'Sales Report'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setCurrentView(text.toLowerCase().replace(' ', '-'))}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AccountCircle /> : <BarChartIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div id="panel-content">
          {currentView === 'employee-details' && (
            <div id="search-container">
            <div id="search-card">
            <h1 id="search-container-header">Filter by</h1>
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
                <TableContainer component={Paper}>
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
            <div id="graph-container">
                <LineChartComponent />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
