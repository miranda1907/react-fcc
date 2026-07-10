const { useState } = React;

export function EventRSVPForm() {
  const [name, setName] = useState('');
  const [email,setEmail]= useState('');
  const [number, setNumber] =useState('');
  const [diet, setDiet] = useState('');
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    setSubmitted(true);    
  }
  

  return <div>
  <h1>Event RSVP Form</h1>
  <form onSubmit={handleSubmit}>
  <label>
  Name: 
  <input type="text" required onChange={(e) => setName(e.target.value)}/>
  </label>
  <label>
  Email:
  <input type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required onChange={(e)=> setEmail(e.target.value)}/>
  </label>
  <label>
  Number of attendees:
  <input type="number" min="1" required onChange={(e) => setNumber(e.target.value)}/>
  </label>
  <label>
  Dietary preferences:
  <input type="text" onChange={(e) => setDiet(e.target.value)}/>
  </label>
  <label>
  Bringing additional guests:
  <input type="checkbox" onChange={(e) => setChecked(e.target.checked)}/>
  </label>
  <button type="submit" disabled={!name || !email || !number}>Submit</button>
  </form>

  {submitted && (<div>
    <p>RSVP Submitted!</p>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>Number of attendees: {number}</p>
    <p>Dietary preferences: {diet || 'None'}</p>
    <p>Bringing additional guests: {checked ? 'Yes' : 'No'}</p>
    </div>)

  }
   </div>   
}
