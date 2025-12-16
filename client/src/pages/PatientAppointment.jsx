import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import Button from "react-bootstrap/esm/Button";

const PatientAppointment=()=>{
    const {id} = useParams();
    const [docInfo, setDocInfo]= useState({});
    const [input, setInput] = useState({});
    const loadData=async()=>{
        let api=`${BASE_URL}/patient/pateintappnt/?id=${id}`;
        try {
              const response= await axios.get(api);
              console.log(response.data);
              setDocInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadData();
    }, [])

    const handleInput=(e)=>{
      let name= e.target.name ;
      let value= e.target.value;
      setInput(values=>({...values, [name]:value}));
      console.log(input);
    }


     const handleSubmit=async()=>{
        let api=`${BASE_URL}/patient/appntsave`;
        try {
            const response = await axios.post(api, {docid:id, ...input});
            alert("data save");
        } catch (error) {
             console.log(error);
        }
     }
  
    return(
        <>
        <div className="patient">
          <h1 align="center"> Patient Appointment Form </h1>
           <h4 style={{color:"blue"}} align="center"> Your Doctor : {docInfo.name} <br />Speciality : {docInfo.specailization}</h4>
          <Form style={{width:"400px", margin:"auto", textAlign:"center"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Enter Patient Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" name="name" onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Disease</Form.Label>
        <Form.Control type="text" placeholder="Enter your disease" name="disease" onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter City</Form.Label>
        <Form.Control type="text" placeholder="Enter your city" name="city" onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Phone no</Form.Label>
        <Form.Control type="text" placeholder="Enter your phone no" name="mobile" onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" name="email" onChange={handleInput} />
      </Form.Group>
      <Button onClick={handleSubmit}> Register!</Button>
    </Form>
    <br /> <br />
    </div>
        </>
      )
}

export default PatientAppointment;