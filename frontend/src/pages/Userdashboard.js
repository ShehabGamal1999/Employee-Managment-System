// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import axios from 'axios';
// import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
// import LoadingSpinner from '../components/Shared/LoadingSpinner';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// const UserDashboard = () => {
//   const { authTokens } = useContext(AuthContext);
//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [employeeSortConfig, setEmployeeSortConfig] = useState({ key: 'FullName', direction: 'asc' });
//   const [departmentSortConfig, setDepartmentSortConfig] = useState({ key: 'Name', direction: 'asc' });
//   const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const employeeResponse = await axios.get('http://127.0.0.1:5001/api/employees', {
//           headers: { authorization: `Bearer ${authTokens.token}` },
//         });
//         const departmentResponse = await axios.get('http://127.0.0.1:5001/api/departments', {
//           headers: { authorization: `Bearer ${authTokens.token}` },
//         });
//         setEmployees(employeeResponse.data);
//         setDepartments(departmentResponse.data);
//       } catch (error) {
//         console.error('Error fetching data', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [authTokens]);

//   const requestEmployeeSort = (key) => {
//     let direction = 'asc';
//     if (employeeSortConfig.key === key && employeeSortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setEmployeeSortConfig({ key, direction });
//   };

//   const requestDepartmentSort = (key) => {
//     let direction = 'asc';
//     if (departmentSortConfig.key === key && departmentSortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setDepartmentSortConfig({ key, direction });
//   };

//   const sortedEmployees = [...employees].sort((a, b) => {
//     const aName = `${a.FirstName} ${a.LastName}`;
//     const bName = `${b.FirstName} ${b.LastName}`;
//     if (aName < bName) {
//       return employeeSortConfig.direction === 'asc' ? -1 : 1;
//     }
//     if (aName > bName) {
//       return employeeSortConfig.direction === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   const sortedDepartments = [...departments].sort((a, b) => {
//     if (a[departmentSortConfig.key] < b[departmentSortConfig.key]) {
//       return departmentSortConfig.direction === 'asc' ? -1 : 1;
//     }
//     if (a[departmentSortConfig.key] > b[departmentSortConfig.key]) {
//       return departmentSortConfig.direction === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   // Filter employees based on search term
//   const filteredEmployees = sortedEmployees.filter(employee => {
//     const fullName = `${employee.FirstName} ${employee.LastName}`.toLowerCase();
//     return fullName.includes(employeeSearchTerm.toLowerCase());
//   });

//   // Filter departments based on search term
//   const filteredDepartments = sortedDepartments.filter(department => {
//     return department.Name.toLowerCase().includes(departmentSearchTerm.toLowerCase());
//   });

//   if (loading) return <LoadingSpinner />;

//   return (
//     <Grid container spacing={3} padding={3}>
//       <Grid item xs={12}>
//         <Typography variant="h4" align="center" gutterBottom>
//           User Dashboard
//         </Typography>
//       </Grid>

//       <Grid item xs={12}>
//         <Typography variant="h5" gutterBottom>
//           Employee List
//         </Typography>
//         <TextField
//           label="Search Employees"
//           variant="outlined"
//           fullWidth
//           value={employeeSearchTerm}
//           onChange={(e) => setEmployeeSearchTerm(e.target.value)}
//           sx={{ mb: 2 }} // Add some margin at the bottom
//         />
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell onClick={() => requestEmployeeSort('FullName')} style={{ cursor: 'pointer' }}>
//                   Name {employeeSortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                 </TableCell>
//                 <TableCell onClick={() => requestEmployeeSort('Department')} style={{ cursor: 'pointer' }}>
//                   Department {employeeSortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                 </TableCell>
//                 <TableCell onClick={() => requestEmployeeSort('HireDate')} style={{ cursor: 'pointer' }}>
//                   Hire Date {employeeSortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredEmployees.map((employee) => (
//                 <TableRow key={employee.Id}>
//                   <TableCell>{`${employee.FirstName} ${employee.LastName}`}</TableCell>
//                   <TableCell>{employee.Department?.Name || 'N/A'}</TableCell>
//                   <TableCell>{employee.HireDate || 'N/A'}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>

//       <Grid item xs={12}>
//         <Typography variant="h5" gutterBottom>
//           Department List
//         </Typography>
//         <TextField
//           label="Search Departments"
//           variant="outlined"
//           fullWidth
//           value={departmentSearchTerm}
//           onChange={(e) => setDepartmentSearchTerm(e.target.value)}
//           sx={{ mb: 2 }} // Add some margin at the bottom
//         />
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell onClick={() => requestDepartmentSort('Name')} style={{ cursor: 'pointer' }}>
//                   Name {departmentSortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                 </TableCell>
//                 <TableCell onClick={() => requestDepartmentSort('Id')} style={{ cursor: 'pointer' }}>
//                   ID {departmentSortConfig.direction === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredDepartments.map((department) => (
//                 <TableRow key={department.Id}>
//                   <TableCell>{department.Name || 'N/A'}</TableCell>
//                   <TableCell>{department.Id || 'N/A'}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>
//     </Grid>
//   );
// };

// export default UserDashboard;
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from '@mui/material';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const UserDashboard = () => {
  const { authTokens } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeSortConfig, setEmployeeSortConfig] = useState({ key: 'FirstName', direction: 'asc' });
  const [departmentSortConfig, setDepartmentSortConfig] = useState({ key: 'Name', direction: 'asc' });
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get('http://127.0.0.1:5001/api/employees', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        const departmentResponse = await axios.get('http://127.0.0.1:5001/api/departments', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setEmployees(employeeResponse.data);
        setDepartments(departmentResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authTokens]);

  const requestEmployeeSort = (key) => {
    let direction = 'asc';
    if (employeeSortConfig.key === key && employeeSortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setEmployeeSortConfig({ key, direction });
  };

  const requestDepartmentSort = (key) => {
    let direction = 'asc';
    if (departmentSortConfig.key === key && departmentSortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setDepartmentSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const aName = `${a.FirstName} ${a.LastName}`;
    const bName = `${b.FirstName} ${b.LastName}`;
    if (aName < bName) {
      return employeeSortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aName > bName) {
      return employeeSortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const sortedDepartments = [...departments].sort((a, b) => {
    if (a[departmentSortConfig.key] < b[departmentSortConfig.key]) {
      return departmentSortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[departmentSortConfig.key] > b[departmentSortConfig.key]) {
      return departmentSortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter employees based on search term
  const filteredEmployees = sortedEmployees.filter(employee => {
    const fullName = `${employee.FirstName} ${employee.LastName}`.toLowerCase();
    return fullName.includes(employeeSearchTerm.toLowerCase());
  });

  // Filter departments based on search term
  const filteredDepartments = sortedDepartments.filter(department => {
    return department.Name.toLowerCase().includes(departmentSearchTerm.toLowerCase());
  });

  if (loading) return <LoadingSpinner />;

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          User Dashboard
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Employee List
        </Typography>
        <TextField
          label="Search Employees by First Name"
          variant="outlined"
          fullWidth
          value={employeeSearchTerm}
          onChange={(e) => setEmployeeSearchTerm(e.target.value)}
          sx={{ mb: 2 }} // Add some margin at the bottom
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => requestEmployeeSort('FirstName')} style={{ cursor: 'pointer' }}>
                  First Name {employeeSortConfig.key === 'FirstName' ? (employeeSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => requestEmployeeSort('LastName')} style={{ cursor: 'pointer' }}>
                  Last Name {employeeSortConfig.key === 'LastName' ? (employeeSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => requestEmployeeSort('Email')} style={{ cursor: 'pointer' }}>
                  Email {employeeSortConfig.key === 'Email' ? (employeeSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => requestEmployeeSort('Department')} style={{ cursor: 'pointer' }}>
                  Department {employeeSortConfig.key === 'Department' ? (employeeSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => requestEmployeeSort('HireDate')} style={{ cursor: 'pointer' }}>
                  Hire Date {employeeSortConfig.key === 'HireDate' ? (employeeSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => requestEmployeeSort('Salary')} style={{ cursor: 'pointer' }}>
                  Salary {employeeSortConfig.key === 'Salary' ? (employeeSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.Id}>
                  <TableCell>{employee.FirstName}</TableCell>
                  <TableCell>{employee.LastName}</TableCell>
                  <TableCell>{employee.Email}</TableCell>
                  <TableCell>{employee.Department?.Name || 'N/A'}</TableCell>
                  <TableCell>{new Date(employee.HireDate).toLocaleDateString()}</TableCell>
                  <TableCell>{employee.Salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => console.log(`Edit ${employee.Id}`)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => console.log(`Delete ${employee.Id}`)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Department List
        </Typography>
        <TextField
          label="Search Departments"
          variant="outlined"
          fullWidth
          value={departmentSearchTerm}
          onChange={(e) => setDepartmentSearchTerm(e.target.value)}
          sx={{ mb: 2 }} // Add some margin at the bottom
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => requestDepartmentSort('Name')} style={{ cursor: 'pointer' }}>
                  Name {departmentSortConfig.key === 'Name' ? (departmentSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => requestDepartmentSort('Id')} style={{ cursor: 'pointer' }}>
                  ID {departmentSortConfig.key === 'Id' ? (departmentSortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.Id}>
                  <TableCell>{department.Name || 'N/A'}</TableCell>
                  <TableCell>{department.Id || 'N/A'}</TableCell>
                </TableRow>
              ))}
              {filteredDepartments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No departments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;