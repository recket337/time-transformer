import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Info } from './Info';

function App() {
  const [execString, setExecString] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);

  const handleChange = event => {
    setError(false);
    setResult('...');
    const enteredChar = event.nativeEvent.data;

    switch(true) {
      case enteredChar === ' ' && (!execString.length || execString[execString.length - 1] === '+'):
        setExecString(execString.trim())
        break;
      case enteredChar === ' ':
        setExecString(execString + '+');
        break;
      case enteredChar?.toLowerCase() !== enteredChar?.toUpperCase():
        break;
      default:
        setExecString(event.target.value);
        break;
    }
  }

  useEffect(() => {
    const splittedString = execString.split('+');
    let isAllNumbers = true;

    for (const item of splittedString) {
      if (typeof Number(item) !== 'number') {
        isAllNumbers = false;
        break;
      } 
    }

    if (isAllNumbers) {
      const summary = splittedString.reduce((acc, item) => {
        if (item.indexOf('.') === -1) {
          acc+= Number(item);          
        } else {
          
          const splittedNumber = item.split('.');
          console.log(item, splittedNumber)
          acc+= Number(splittedNumber[0]) * 60 + Number(splittedNumber[1]);
        }
        return acc;
      }, 0);
      console.log(summary);
      setResult(Math.floor(summary/60)+ ' hours ' + summary % 60 + ' mins');
    } else {
      setError(true);
      setResult('Something went wrong...');
    }
  }, [execString])

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <header className="App-header">
        <TextField 
          value={execString}
          className='App-input' 
          sx={{ input: { color: 'white' } }}  
          placeholder='type...' 
          onChange={handleChange}
          error={error}
        />
        <Typography 
          sx={{   
            color: "#FFFFFF",
            margin: '25px 0'
          }} 
          className="App-result">
          {result}
        </Typography>
        <Info />
      </header>
    </div>
  );
}

export default App;
