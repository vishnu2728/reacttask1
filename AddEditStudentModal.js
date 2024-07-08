import React, { useState } from 'react';
import { Modal, Button, Form, Fade } from 'react-bootstrap';

const AddEditStudentModal = ({ show, handleClose, editId, name, age, number, email, setName, setAge, setNumber, setEmail, addOrUpdateStudent }) => {
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [formError, setFormError] = useState('');
  const [emailError, setEmailError] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };
  const validateForm = () => {
    let isValid = true;
    setFormError('');

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }else if(!isValidName(name)){
      setNameError("only alphabets")
      isValid=false;
    } 
    else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Email is Invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!age.trim()) {
      setAgeError('Age is required');
      isValid = false;
    } else {
      setAgeError('');
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        setAgeError('Age must be a positive number');
        isValid = false;
      }
    }

    if (!number.trim()) {
      setNumberError('Number is required');
      isValid = false;
    } else if (!/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/.test(number)) {
      setNumberError('Number must be up to 10 digits');
      isValid = false;
    } else {
      setNumberError('');
    }

    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      addOrUpdateStudent();
      handleClose();
    } else {
      setFormError('Please fill in all required fields correctly.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editId === null ? 'Add Student' : 'Edit Student'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
            {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
            {ageError && <Form.Text className="text-danger">{ageError}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNumber">
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter number"
            />
            {numberError && <Form.Text className="text-danger">{numberError}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
          </Form.Group>
          {formError && <Form.Text className="text-danger">{formError}</Form.Text>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {editId === null ? 'Add Student' : 'Update Student'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditStudentModal;