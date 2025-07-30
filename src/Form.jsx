import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    country: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const countryOptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Argentina", label: "Argentina" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Belgium", label: "Belgium" },
    { value: "Brazil", label: "Brazil" },
    { value: "Canada", label: "Canada" },
    { value: "China", label: "China" },
    { value: "Denmark", label: "Denmark" },
    { value: "Egypt", label: "Egypt" },
    { value: "France", label: "France" },
    { value: "Germany", label: "Germany" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Italy", label: "Italy" },
    { value: "Japan", label: "Japan" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Mexico", label: "Mexico" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Norway", label: "Norway" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Russia", label: "Russia" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Singapore", label: "Singapore" },
    { value: "South Africa", label: "South Africa" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Thailand", label: "Thailand" },
    { value: "Turkey", label: "Turkey" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Zimbabwe", label: "Zimbabwe" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/submit-form', formData);
      setMessage(response.data.message);
      setFormData({ name: '', email: '', number: '', country: '' });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="number"
          placeholder="Enter mobile number"
          value={formData.number}
          onChange={handleChange}
          required
        />

        <Select
          options={countryOptions}
          value={countryOptions.find(c => c.value === formData.country) || null}
          onChange={(selectedOption) => {
            setFormData(prev => ({
              ...prev,
              country: selectedOption ? selectedOption.value : ''
            }));
          }}
          onInputChange={(inputValue) => {
            setFormData(prev => ({
              ...prev,
              country: inputValue
            }));
          }}
          onBlur={() => {
            const match = countryOptions.find(
              option => option.label.toLowerCase() === formData.country.toLowerCase()
            );
            if (match) {
              setFormData(prev => ({
                ...prev,
                country: match.value
              }));
            }
          }}
          placeholder="Select or type country"
          isClearable
          isSearchable
        />

        <button type="submit">Submit</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Form;
