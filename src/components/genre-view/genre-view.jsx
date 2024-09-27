import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './genre-view.scss';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <Row className="GenreView justify-content-md-center">
                <Col md={6}>
                    <div className="genre-view">
                        <div className="genre-name">
                            <span className="label">Genre: </span>
                            <span className="value">{genre.Name}</span>
                        </div>
                        <div className="genre-description">
                            <span className="label">Description: </span>
                            <span className="value">{genre.Description}</span>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}