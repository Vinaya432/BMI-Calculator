
import { useState ,useEffect} from 'react';
import './App.css'
import {Stack,TextField,Button,colors} from '@mui/material';
// import { pink } from '@mui/material/colors';



function App() {

  const [bmiMessage,setBmiMessage] = useState('')

  const [bmi,setBmi] = useState(0);
  const [height,setHeight] = useState(0);
  const [weight,setWeight] = useState(0) ;

const [validHeight,setValidHeight] = useState(true);
const [validWeight,setvalidWeight] = useState(true);

useEffect(() => {
  // This effect will be triggered whenever bmi changes
  if(!height || !weight){
    setBmiMessage('')
  }else{
    if (bmi < 18.5) {
      setBmiMessage('You are Underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiMessage('You are Normal weight');
    } else if (bmi >= 25 && bmi < 30) {
      setBmiMessage('You are Overweight');
    } else {
      setBmiMessage('You are Obese');
    }
  }
}, [bmi]);

const validUserInput=(e)=>{
  const {name,value} = e.target;
  console.log(`${name} , ${value}`);

  if(!!value.match(/^\d*\.?\d*$/)){
    //valid pattern
    if(name==='height'){
      setHeight(value)
      setValidHeight(true)
    }else{
      setWeight(value)
      setvalidWeight(true)
    }
  }else{
    //invalid pattern
    if(name==='height'){
      setHeight(value);
      setValidHeight(false)
    }else{
      setWeight(value)
      setvalidWeight(false)
    }
  }
}

const ResetButton =() =>{
  setHeight(0);
  setWeight(0);
  setBmi(0);
  setBmiMessage('');

  setValidHeight(true);
  setvalidWeight(true);
}

const Calculateout = (e)=>{
  //calculate bmi
  e.preventDefault();
  if(!height || !weight){
    alert("Please fill Completely")
  }
  else{
    
    setBmi((weight/(height*.01)**2).toFixed(4));
}





}
return (
    <div className=' container position-relative mt-5'>
      <img className='img-fluid w-75 mx-auto d-block opacity-25' src="https://cdn.mos.cms.futurecdn.net/67TxKWLJcmAFg5niEkAvc8.gif" alt="" style={{height:'500px'}} />
      {/* <img className='img-fluid w-25 top-0 position-absolute' src="./images/heart-image-transparent-background-4-removebg-preview.png" alt="jfdgdfkgfdj" /> */}
      {/* <div className="position-absolute img">
      </div> */}
      <div className=' bg-secondary bg-opacity-10  position-absolute top-0' style={{left:'27%',width:'650px'}}>
          <Stack direction="row" >
            <div className=' w-50 d-flex  align-items-center flex-column' style={{height:'500px'}}>
              <h2 className='mt-5 text-danger'>BMI Calculator</h2>
              <p className='text-danger fw-bolder' style={{fontStyle:'italic'}}>We care about your health</p>
             <form onSubmit={Calculateout}>
               <div className='mb-4 mt-5'> 
                   <TextField  id="outlined-height" label="Enter your height(cm)" variant="outlined" name='height' value={height || ""} onChange={e=>validUserInput(e)}/>
               </div>
               { !validHeight&&<div className='mb-3 text-danger fw-bolder'>
                Invalid Height</div>
              }
               <div className='mb-4'>
                  <TextField id="outlined-weight" label="Enter your weight(kg)" variant="outlined" name='weight' value={weight || ""} onChange={e=>validUserInput(e)}/>
                </div>
                { !validWeight&&<div className='mb-3 text-danger fw-bolder'>
                Invalid Weight</div>
               } 
  
                <Stack direction={'row'} spacing={2}>
                  <Button style={{background:'rgb(255, 49, 111)'}} className='me-3 p-2 fw-bold' variant="contained" type='submit' disabled={validHeight&&validWeight?false:true}>Calculate</Button>
                  <Button  className='p-2 text-dark fw-bold' variant="outlined" onClick={ResetButton}>reset</Button>
                </Stack>       
             </form>
            </div>
            <div className=' w-75 d-flex justify-content-center align-items-center' style={{height:'500px'}}>
              <div className='w-50 border shadow mt-5' style={{height:'180px'}}>
                <h3 className='text-center' style={{color:'darkgoldenrod'}}>BMI Score</h3>
                <h1 className='text-center' style={{color:'brown'}}>{bmi}</h1>
                <p className='text-center fw-bold' style={{color:'brown'}}>{bmiMessage}</p>
              </div>
            </div>
         </Stack>
      </div>
    </div>
  )
}

export default App
