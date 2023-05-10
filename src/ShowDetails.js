import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import './ShowDetails.css';

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => setShow(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!show) {
    return <p>Loading...</p>;
  }

  return (
    <div className="show-details">
      <Container>
        <Row>
          <Col md="4" className="mb-3">
            <Card className="show-card">
              <CardImg top src={show.image?.medium} alt={show.name} />
              <CardBody>
                <CardTitle>{show.name}</CardTitle>
                <CardText dangerouslySetInnerHTML={{ __html: show.summary }} />
            <button><Link to={`/book/${show.id}`} className="btn btn-primary">Book Now</Link></button>

              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <h1 className="show-name">{show.name}</h1>
            <p className="show-genres">Genres: {show.genres.join(', ')}</p>
            <p className="show-language">Language: {show.language}</p>
            <p className="show-status">Status: {show.status}</p>
            <p className="show-premiered">Premiered: {show.premiered}</p>
            <p className="show-rating">Rating: {show.rating.average}</p>
            <button>
              <Link to="/" className="btn btn-primary">Back to Show List</Link>
              </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShowDetails;
