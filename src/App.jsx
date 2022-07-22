import { useRef, useState } from 'react';
import './App.css';
import validator from 'email-validator';
function App() {
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const error = useRef();
  const error2 = useRef();
  const input11 = useRef();
  const input12 = useRef();
  const input13 = useRef();
  const input14 = useRef();
  const input15 = useRef();
  const input21 = useRef();
  const input22 = useRef();
  const input23 = useRef();
  const [getError, setError] = useState('Hello');
  const [getError2, setError2] = useState('Hello');
  const [getUserStatusBar, setUserStatusBar] = useState(0);
  const [getUsers, setUsers] = useState([]);
  function register(){
    setError('');
    if (validator.validate(input1.current.value) &&
        input2.current.value===input3.current.value) {
      const data = {
        email: input1.current.value,
        pass1: input2.current.value,
        pass2: input3.current.value,
      }
      const options = {
        method: 'POST',
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(data)
      }
      fetch('http://localhost:4000/register', options)
      .then(response => response.json())
      .then(data => console.log(data));
    } else setError('smth wrong');
  }
  function login() {
    setError('');
    if (validator.validate(input4.current.value)) {

      const data = {
        email: input4.current.value,
        pass: input5.current.value,
      }
      const options = {
        method: 'POST',
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(data)
      }
      fetch('http://localhost:4000/login', options)
      .then(response => response.json())
      .then(data => console.log(data));
    } else setError('sum ting wong');
  }

  function middlewareSend(){
    const data = {
      image: input11.current.value,
      title: input12.current.value,
      username: input13.current.value,
      location: input14.current.value,
      age: input15.current.value,
    }
    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:4000/middleware', options)
    .then(response => response.json())
    .then(data => console.log(data));
  }
  function sendUser(){
    const data = {
      image: input21.current.value,
      username: input22.current.value,
      gender: input23.current.value,
    }
    const options = {
      method: 'POST',
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:4000/adduser', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setUserStatusBar(data.users.length);
      setUsers(data.users);
    });
  }
  return (
    <>
      <div className='app'>

        <input ref={input1} type='text' placeholder='email'/><br/>
        <input ref={input2} type='text' placeholder='password'/><br/>
        <input ref={input3} type='text' placeholder='repeat'/><br/>
        <button onClick={register}>register</button><br/><br/>
        <input ref={input4} type='text' placeholder='email'/><br/>
        <input ref={input5} type='text' placeholder='password'/><br/>
        <button onClick={login}>login</button><br/>
        <h1 ref={error}>{getError}</h1>
      </div>
      <div className='middleware'>
        <input ref={input11} type='text' placeholder='photo url'></input><br/>
        <input ref={input12} type='text' placeholder='title'></input><br/>
        <input ref={input13} type='text' placeholder='username'></input><br/>
        <input ref={input14} type='text' placeholder='location'></input><br/>
        <input ref={input15} type='text' placeholder='age'></input><br/>
        <button className='' onClick={middlewareSend}>Submit</button>
        <h1 ref={error2}>{getError2}</h1>
      </div><br/>
      <div className='listApp' >
        <div>
          <progress class="progress is-primary is-large" value={getUserStatusBar} max="10"/>
          {getUserStatusBar}/10
        </div>
        <div className='form'>
          <input className='input is-primary' ref={input21} type='text' placeholder='photo'/>
          <input className='input is-primary' ref={input22} type='text' placeholder='name'/>
          <input className='input is-primary' ref={input23} type='text' placeholder='gender'/>
          <button className='button is-primary' onClick={sendUser} >Add</button>
        </div>
        <div className='entries'>
          {getUsers.map((user, i)=>
              <div key={i} className='columns' style={user.gender==='male' ? {backgroundColor:'cyan'} : {backgroundColor:'pink'}}>
                <figure class="image is-128x128 ">
                  <img src={user.image} alt={'adf'}/>
                </figure>
                {user.username}<br/> {user.gender}
              </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
