import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import './main-view.scss';


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            //movie: [],

            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUsers(accessToken);

        }
    }

    // src/components/main-view/main-view.jsx
    getMovies(token) {
        axios.get('https://myfilmdb.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUsers(token) {
        axios.get('https://myfilmdb.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //componentWillUnmount {}
    //code executed just before the moment the componeent gets removed from the DOM

    /* When a user successfully logs in, this function updates the `user` property in state
       to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUsers(authData.token);
    }

    //Add log out button
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }



    /*toggleRegister = (e) => {
        e.preventDefault();
        this.setState({
            register: !this.state.register
        })
    }*/



    render() {

        const { movies, user, history } = this.state;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Container>
                        <Navbar>
                            <Navbar.Brand>MyFlix</Navbar.Brand>
                            <ul>
                                <Link to={`/`}>
                                    <Button variant="link">Movies</Button>
                                </Link>
                                <Link to={`/users/${user}`}>
                                    <Button variant="link">Profile</Button>
                                </Link>
                                <Link to={`/`}>
                                    <Button variant="link" onClick={() => this.onLoggedOut()}
                                    >Logout</Button>
                                </Link>
                            </ul>
                        </Navbar>
                    </Container>

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies) {
                            if (movies.length === 0) return <div className="main-view" />;
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movieInfo={m} />
                                </Col>
                            ))
                        }
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/users/:useId" render={() => {
                        if (!user || !movies) return
                        //if (user.token === '') return <Redirect to="/" />
                        return (
                            <Col>
                                <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                                    movies={movies} user={user}
                                    //token={localStorage.getItem('token')}
                                    onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />

                    {/*Error for cannot read propert 'length' of undefined here, added if statement*/}
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return
                        if (movies) {
                            if (movies.length === 0) return <div className="main-view" />
                            return <Col md={8}>
                                <MovieView movieInfo={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }
                    }} />

                    <Route exact path="/genres/:name" render={({ match, history }) => {
                        if (!user) return
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match }) => {
                        if (!user) return
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        );
    }

}

export default MainView;