import React, { Component } from 'react'
import axios from 'axios';



import {
    Navbar,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Container,
    Col,
    Form,
    Row,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Spinner
} from 'reactstrap';

import { MdSearch, MdStar } from 'react-icons/md'





class Home extends Component {
    state = {
        carregando: false,
        meteoro: []
    }

    meteoroDaPaixao = async (evento) => {
        evento.preventDefault()

        this.setState({ carregando: true })

        const form = evento.target
        const inputGroup = form.children[0]
        const input = inputGroup.children[0]

        //exemplo de desestruturação
        //const { data: seguidores } = await axios(`https://api.github.com/users/${input.value}/followers`)
        //const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`)
        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=mwDE1tkv1CTISEu6Roge2hI8QOGMgLdm6OHllHnC`)

        //this.setState({ seguidores })
        this.setState({ meteoro: [meteoro.data, ...this.state.meteoro], carregando: false })


    }



    render() {
        return (
            <>
                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.meteoroDaPaixao}>
                                <InputGroup>
                                    <Input type="date" />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size="sm" />) : (<MdSearch size="20" />)}

                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>



                {this.state.carregando ? (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>
                    </Container>
                ) : (
                        <Container className="h-100">
                            <Row className="h-100">
                                {this.state.meteoro.length > 0 ? this.state.meteoro.map((meteoro) => (
                                    <Col className="d-flex" xs="12" md="4">
                                        <Card className="text-white mb-2" color="dark">
                                            <CardImg top width="100%" height="30%" src={meteoro.url} alt={meteoro.title} />
                                            <CardBody >
                                                <CardTitle className="h3 text-center">{meteoro.title}</CardTitle>
                                                <CardSubtitle className="text-muted text-center">{meteoro.date.split('-').reverse().join('/')}</CardSubtitle>
                                                <CardText className="text-justify">{meteoro.explanation}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )) : (
                                        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                                                <MdStar color="#000" size="150" />
                                                <h3>Digite uma data... </h3>
                                        </Container>
                                    )}
                            </Row>
                        </Container>
                    )}


                {/* { this.state.meteoro.length == 0 && (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>
                    </Container>
                )}
                
                */}

                {/* {this.state.carregando && (
                    <Container className="h-100 d-flex flex-column justify-content-center align-itens-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>
                    </Container>
                )}  */}




            </>
        )
    }
}

export default Home;