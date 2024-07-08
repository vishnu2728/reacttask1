import React from 'react';
import { Table, Button } from 'react-bootstrap';

const StudentList = ({ students, editStudent, deleteStudent }) => {
  
  const handleDeleteStudent = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this student?');
    if (isConfirmed) {
      deleteStudent(id);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Number</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.number}</td>
            <td>{student.email}</td>

            <td>
              <Button variant="info" className="me-2" onClick={() => editStudent(student)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentList;