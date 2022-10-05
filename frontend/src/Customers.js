import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { CustomersContenxt } from './App.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Sipnner.js';
import Meta from './Meta.js';
const Customers = () => {
    const { customers, upDatedCustomers } = React.useContext(CustomersContenxt);
    React.useEffect(() => {
        axios
            .get('https://hamid-bankapp.herokuapp.com/customers')
            .then((res) => upDatedCustomers(res.data));
    }, []);
    return (
        <>
            <Meta title='Customers page' content='' />
            {!customers ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <Container className='my-5 d-flex justify-content-center text-center'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers &&
                                customers.map((customer, id) => (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>
                                            <Link
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                                to={`/customers/${customer.name}`}
                                            >
                                                {customer.name}
                                            </Link>
                                        </td>
                                        <td>{customer.email}</td>
                                        <td>{customer.current_balance}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Container>
            )}
        </>
    );
};

export default React.memo(Customers);
