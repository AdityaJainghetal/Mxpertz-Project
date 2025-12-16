import { useState, useEffect } from "react";
import BASE_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Home = () => {
  const [mydata, setMydata] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    let api = `${BASE_URL}/doctor/homedoctorsdisplay`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const patApointment = (id) => {
    navigate(`/patientapp/${id}`);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Welcome To Online Appointment System</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
           
            <th>Address</th>
            <th>City</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Appointment</th>
          </tr>
        </thead>
        <tbody>
          {mydata.map((doc, index) => (
            <tr key={doc._id}>
              <td>{index + 1}</td>
              <td>{doc.name}</td>
             
              <td>{doc.address}</td>
              <td>{doc.city}</td>
              <td>{doc.mobile}</td>
              <td>{doc.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => patApointment(doc._id)}
                >
                  Appointment Now!
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
