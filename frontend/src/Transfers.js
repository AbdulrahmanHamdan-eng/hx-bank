import React from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import Spinner from './Sipnner.js';
import Meta from './Meta.js';
const Transfers = () => {
    const [transactions, setTransactions] = React.useState();
    React.useEffect(() => {
        axios
            .get('https://hamid-bankapp.herokuapp.com/transactions')
            .then((res) => {
                const cloneData = res.data;
                setTransactions(cloneData);
            });
    }, []);
    return (
        <>
            <Meta title='transactions history' content='' />
            {!transactions ? (
                <Spinner />
            ) : (
                <Container className='my-5 d-flex justify-content-center text-center'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Sender</th>
                                <th>Receipient</th>
                                <th>Transfered Amt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, id) => (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{transaction.sender}</td>
                                    <td>{transaction.recepient}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            )}
        </>
    );
};

export default Transfers;
