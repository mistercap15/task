import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import './ShowList.css';

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setShows(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="show-list">
      <h1>Show List</h1>
      <div className="row">
        {shows.map(show => (
          <div className="col-md-4 mb-3" key={show.show.id}>
            <Card>
              <CardImg top src={show.show.image?.medium} alt={show.show.name} />
              <CardBody>
                <CardTitle>{show.show.name}</CardTitle>
                <CardText dangerouslySetInnerHTML={{ __html: show.show.summary }} />
               
               <button> <Link to={`/show/${show.show.id}`}>Show Details</Link> </button>

              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
