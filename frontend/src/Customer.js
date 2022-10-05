import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { CustomersContenxt } from './App.js';
import checkMark from './imgs/check_mark.png';
import axios from 'axios';
import Meta from './Meta.js';
const Customer = () => {
    const { customers } = React.useContext(CustomersContenxt);
    const { customer_name } = useParams();
    const navigate = useNavigate();
    const transferedAmt = React.useRef();
    const recepientCustomer = React.useRef('ali');
    const [resMsg, setResMsg] = React.useState();
    const [balanceCheck, setBalanceCheck] = React.useState();
    const [isLoading, setLoading] = React.useState(false);
    const clients = customers.filter(
        (customer) => customer.name !== customer_name
    );
    const customerCurrentBalance = customers.find(
        (customer) => customer.name === customer_name
    );
    const toggle = {
        display: resMsg ? 'none' : 'block',
    };
    const transfer_fun = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
            .put(
                `https://hamid-bankapp.herokuapp.com/customers/${customer_name}`,
                {
                    amt: parseInt(transferedAmt.current.value),
                    customerName: recepientCustomer.current.value,
                }
            )
            .then((res) => {
                console.log(res.data);
                setResMsg(res.data.msg);
            })
            .catch(({ response }) => {
                setLoading(false);
                setBalanceCheck(response.data);
            });
    };
    const insertToTransfers = (event) => {
        event.preventDefault();
        axios
            .put('https://hamid-bankapp.herokuapp.com/transfers', {
                sender: customer_name,
                recepient: recepientCustomer.current.value,
                amount: parseInt(transferedAmt.current.value),
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        navigate('/customers');
    };
    return (
        <>
            <Meta title='transaction page' content='' />
            {resMsg && (
                <Row className='d-flex justify-content-center my-5'>
                    <Col className='col-sm-8 col-md-6 col-lg-4 text-center'>
                        <div className=' shadow-sm p-3 mb-5 bg-white rounded my-5 mx-auto gap-2 '>
                            <img
                                src={`${checkMark}`}
                                alt=''
                                style={{ width: '20%' }}
                            />
                            <h4>Transaction Completed Successfully</h4>
                            <div className='text-secondary'>
                                <p> Transaction Id: {uuidv4()}</p>
                                <p>From: {customer_name}</p>
                                <p>To: {recepientCustomer.current.value}</p>
                                <p>
                                    Amount:
                                    {parseInt(transferedAmt.current.value)}
                                </p>
                            </div>
                            <Button
                                variant='success'
                                className='w-25'
                                onClick={insertToTransfers}
                            >
                                ok
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}

            <Row className='d-flex justify-content-center my-5'>
                <Col className='col-sm-8 col-md-6 col-lg-4'>
                    <Container style={toggle}>
                        {balanceCheck && (
                            <Alert variant='danger'>{balanceCheck}</Alert>
                        )}
                        <Form
                            onSubmit={transfer_fun}
                            className='shadow-sm p-3 mb-5 bg-white rounded'
                        >
                            <Form.Group>
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    type='text'
                                    disabled
                                    readOnly
                                    placeholder={customer_name}
                                />
                                <Form.Label>Current Balance</Form.Label>
                                <Form.Control
                                    disabled
                                    readOnly
                                    placeholder={
                                        customerCurrentBalance.current_balance
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> Send To</Form.Label>
                                <Form.Select ref={recepientCustomer}>
                                    {clients.map((customer) => (
                                        <option>{customer.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type='number'
                                    ref={transferedAmt}
                                    required
                                />
                            </Form.Group>
                            <Button
                                type='submit'
                                className='my-3 w-100'
                                disabled={isLoading}
                                size='lg'
                            >
                                {isLoading ? ' processing' : ' Transfer'}
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </>
    );
};

export default Customer;
