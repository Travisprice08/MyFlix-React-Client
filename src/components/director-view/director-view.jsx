import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import './director-view.scss';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;
        console.log(director)
        return (
            <Row className="DirectorView justify-content-md-center">
                <Col md={6}>
                    <div className="director-view">
                        <div className="director-name">
                            <span className="label">Director: </span>
                            <span className="value">{director.Name}</span>
                        </div>
                        <div className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value">{director.Bio}</span>
                        </div>
                        <div className="director-birth">
                            <span className="label">Born: </span>
                            <span className="value">{director.Birthday}</span>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
                    </div>
                </Col>
            </Row >
        );
    }
}

/*DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func.isRequired
};*/