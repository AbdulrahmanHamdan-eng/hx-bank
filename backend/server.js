import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import pkg from 'pg';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { Client } = pkg;
const postgres_db = new Client({
    // user: `postgres`,
    // host: 'localhost',
    // database: `postgres`,
    // password: `postgres`,
    // port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    // idleTimeoutMillis: 20000,
});

postgres_db.connect(function (err) {
    if (err) throw err;
    console.log('database working flawlessly');
});
app.get('/customers', async (req, res) => {
    const customers = await postgres_db.query('SELECT * FROM customers');
    res.send(customers.rows);
});
app.put('/transfers', (req, res) => {
    const sender = req.body.sender;
    const recepient = req.body.recepient;
    const amount = req.body.amount;
    postgres_db.query(
        `INSERT INTO transfers (sender,recepient,amount) VALUES ('${sender}','${recepient}',${amount});`,
        (err) => {
            if (err) throw err;
            res.send(
                'transaction has been added to transactions history successfully'
            );
        }
    );
});

app.get('/transactions', async (req, res) => {
    const transfers = await postgres_db.query('SELECT * FROM transfers');
    res.send(transfers.rows);
});

app.put(`/customers/:customer_name`, async (req, res) => {
    const customers = await postgres_db.query('SELECT * FROM customers');
    const client = req.params.customer_name;
    const customer = customers.rows.find(
        (customer) => customer.name === client
    );
    const recepient = customers.rows.find(
        (customer) => customer.name === req.body.customerName
    );
    if (req.body.amt > customer.current_balance) {
        res.status(400).send(
            'Your transaction can not be completed due to insufficient balance'
        );
        return;
    }
    if (req.body.amt <= 0) {
        res.status(400).send(
            'please enter non zero value to complete the transaction'
        );
        return;
    }
    postgres_db.query(
        `UPDATE customers SET current_balance=${
            req.body.amt + recepient.current_balance
        } WHERE name='${req.body.customerName}' `
    );
    postgres_db.query(
        `UPDATE customers SET current_balance=${
            customer.current_balance - req.body.amt
        } WHERE name='${client}'`
    );
    res.json({
        msg: 'Your Transaction has been completed successfully',
        customers: customers.rows,
    });
});
app.listen(process.env.PORT || 3300, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

// // "frontend": "react-scripts start",
// //     "backend": "nodemon server.js",
// //     "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
// express.json() Demo Example

// express.json() Demo Example

// Importing the express module
// var express = require('express');
