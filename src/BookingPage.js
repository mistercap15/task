import React, { useState, useEffect } from 'react';
import { useParams, useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [bookingData, setBookingData] = useState({ name: '', email: '', date: '', time: '' });

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Booking data:', bookingData);
    // Store booking data in session storage
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    // Show alert message and navigate back to show details page
    alert('Movie booked!');
    navigate(`/show/${id}`);
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="booking-page">
      <Container>
        <Row>
          <Col md="6" className="mb-3">
            <h1>Book Tickets for {movie.name}</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Your name" value={bookingData.name} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Your email" value={bookingData.email} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" placeholder="Select a date" value={bookingData.date} onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="time">Time</Label>
                <Input type="time" name="time" id="time" placeholder="Select a time" value={bookingData.time} onChange={handleInputChange} />
              </FormGroup>
              <Button color="primary" style={{cursor:'pointer'}}>Book Now</Button>
            </Form>
          </Col>
          <Col md="6">
            <img src={movie.image?.medium} alt={movie.name} />
            <h2>{movie.name}</h2>
            <p>{movie.summary}</p>
          </Col>
        </Row>
      </Container>
      <button>
              <Link to="/" className="btn btn-primary">Back to Show List</Link>
              </button>
    </div>
  );
}

export default BookingPage;
