

import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';

const SearchDoctor = () => {
  const [input, setInput] = useState({});
  const [mydata, setMydata] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const api = `${BASE_URL}/doctor/searchdoctor`;
      const response = await axios.post(api, input);
      setMydata(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-3">Search Doctor</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter Doctor Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Doctor Name"
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Select Specialization</Form.Label>
                <Form.Select name="speciality" onChange={handleInput}>
                  <option value="">Select Specialization</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="ENT">ENT</option>
                  <option value="Neuro Surgeon">Neuro Surgeon</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Plastic Surgeon">Plastic Surgeon</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" className="w-100" onClick={handleSubmit}>
                Search
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {mydata.length > 0 && (
        <Row>
          <Col>
            <h4 className="mb-3 text-center">Doctor Results</h4>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                {mydata.map((doc, index) => (
                  <tr key={doc._id || index}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{doc.address}</td>
                    <td>{doc.city}</td>
                    <td>{doc.email}</td>
                    <td>{doc.mobile}</td>
                    <td>{doc.specailization || doc.speciality}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SearchDoctor;
