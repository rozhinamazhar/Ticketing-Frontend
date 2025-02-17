import logo from './pacman.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker'

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [emailOption, setEmailOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalRecipientEmail = emailOption === 'other' ? recipientEmail : emailOption;

    // Prepare data to send
    const data = {
      name,
      description,
      time,
      recipientEmail: finalRecipientEmail,
    };

    // Send data to API
    fetch('http://localhost:3002/submit-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        setResponseMessage(json.message);  // Show success message
      })
      .catch(error => {
        setResponseMessage('Error: ' + error.message);  // Show error message
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} style={{ width: 350, height: 350}}></img>
        <h1>Submit a Ticket</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </label>
          <br />
          <label>
            Description:
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
            />
          </label>
          <br />
          <label>
            Time:
            <input 
              type="time" 
              value={time} 
              onChange={e => setTime(e.target.value)} 
              required 
            />
          </label>
          <br />
           {/* Email Select Dropdown */}
           <label>
            Recipient Email:
            <select
              value={emailOption}
              onChange={(e) => setEmailOption(e.target.value)}
              required
            >
            <option value=" ">Select an email</option>
            <option value="mohammad.karg@mtnirancell.ir">Mohammad Kargaree</option>
            <option value="rozhina.m@mtnirancell.ir">Rozhina Mazhar</option>
            <option value="mehdi.khal@mtnirancell.ir">Mehdi Khalili</option>
            <option value="amir.man@mtnirancell.ir">Amir Mansouri</option>
            <option value="other">Other (type your email)</option> {/* Option to type a custom email */}
            </select>
          </label>
          {emailOption === 'other' && (
            <label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Enter custom email"
                required
              />
            </label>
          )}

          <br />
          <button type="submit">Submit Ticket</button>
        </form>

        {/* Show success or error message */}
        {responseMessage && <p>{responseMessage}</p>}
      </header>
    </div>
  );
}

export default App;