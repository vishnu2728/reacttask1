import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import StudentList from "./component/AddEditStudentModal/AddEditStudentModal";
import AddEditStudentModal from "./component/StudentList/StudentList";

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("/students.json")
      .then((response) => response.json())
      .then((data) => setStudents(data.students))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const addOrUpdateStudent = () => {
    if (editId === null) {
      // Add student
      const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        age: parseInt(age),
        number,
        email,
      };
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    } else {
      // Update student
      const updatedStudents = students.map((student) =>
        student.id === editId
          ? { ...student, name, age: parseInt(age), number, email }
          : student
      );
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setEditId(null);
    }

    setName("");
    setAge("");
    setNumber("");
    setEmail("");
    setShow(false);
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name);
    setAge(student.age.toString());
    setNumber(student.number);
    setEmail(student.email);
    setShow(true);
  };

  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const handleClose = () => {
    setEditId(null);
    setName("");
    setAge("");
    setNumber("");
    setEmail("");
    setShow(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Student List</h2>
      <StudentList
        students={students}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />

      <Button variant="primary" onClick={() => setShow(true)}>
        Add Student
      </Button>
      <AddEditStudentModal
        show={show}
        handleClose={handleClose}
        editId={editId}
        name={name}
        age={age}
        number={number}
        email={email}
        setName={setName}
        setAge={setAge}
        setNumber={setNumber}
        setEmail={setEmail}
        addOrUpdateStudent={addOrUpdateStudent}
      />
    </div>
  );
};

export default App;