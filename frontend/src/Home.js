import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import hxImg from './imgs/app_bg.jpg';
import Meta from './Meta.js';
const Home = () => {
    return (
        <Container>
            <Meta title='welcome to hx-bank' content=' ' />
            <div className='shadow-sm p-5 mb-5 rounded'>
                <div style={{ color: 'rgb(69 175 243)', textAlign: 'center' }}>
                    <h1 style={{ letterSpacing: '0.8rem' }}>WELCOME</h1>
                    <span
                        style={{
                            fontSize: '2rem',
                            color: 'rgb(69 175 243 / 80%)',
                        }}
                    >
                        TO HX BANK
                    </span>
                </div>
                <div className='my-5 '>
                    <Row>
                        <Col xs={12} lg={6}>
                            <img
                                src={hxImg}
                                style={{ maxWidth: '100%', height: 'auto' }}
                                alt=''
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <p className='w-100`'>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Vitae sequi quisquam harum
                                rerum dolorum alias officia, libero modi facilis
                                expedita quaerat distinctio autem cupiditate
                                unde reiciendis dolorem voluptatem! Atque,
                                corrupti. Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit. Vitae sequi
                                quisquam harum rerum dolorum alias officia,
                                libero modi facilis expedita quaerat distinctio
                                autem cupiditate unde reiciendis dolorem
                                voluptatem! Atque, corrupti. Lorem ipsum dolor
                                sit, amet consectetur adipisicing elit. Vitae
                                sequi quisquam harum rerum dolorum alias
                                officia, libero modi facilis expedita quaerat
                                distinctio autem cupiditate unde reiciendis
                                dolorem voluptatem! Atque, corrupti. Lorem ipsum
                                dolor sit, amet consectetur adipisicing elit.
                                Vitae sequi quisquam harum rerum dolorum alias
                                officia, libero modi facilis expedita quaerat
                                distinctio autem cupiditate unde reiciendis
                                dolorem voluptatem! Atque, corrupti. dolorem
                                voluptatem! Atque, corrupti. Lorem ipsum dolor
                                sit, amet consectetur adipisicing elit. Vitae
                                sequi quisquam harum rerum dolorum alias.
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default Home;
