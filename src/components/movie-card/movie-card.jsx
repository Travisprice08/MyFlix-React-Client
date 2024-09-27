import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <div>
                <Card>
                    <Card.Img variant="top" src={movie.imageUrl} />
                    <Card.Body>
                        <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                            {/*<Card.Text>{movie.Description}</Card.Text>*/}
                        </Link>
                        {/*<Button variant="link">Open</Button>*/}
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

/*MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired,
    //onMovieClick: PropTypes.func.isRequired
};*/