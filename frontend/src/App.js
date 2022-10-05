import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './Customer.js';
import Customers from './Customers.js';
import Home from './Home.js';
import Transfers from './Transfers.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Meta from './Meta.js';
export const CustomersContenxt = React.createContext('');
function App() {
    const [customers, setCustomers] = React.useState();
    React.useEffect(() => {
        async function getData() {
            const { data } = await axios.get(
                'https://hamid-bankapp.herokuapp.com/customers'
            );
            const cloneData = data;
            setCustomers(cloneData);
        }
        getData();
    }, []);
    function upDatedCustomers(customers) {
        setCustomers(customers);
    }

    return (
        <>
            <div style={{ minHeight: '90vh' }}>
                <CustomersContenxt.Provider
                    value={{ upDatedCustomers, customers }}
                >
                    <Router>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route
                                path='/customers'
                                element={<Customers />}
                            ></Route>
                            <Route
                                path='/customers/:customer_name'
                                element={<Customer />}
                            ></Route>
                            <Route
                                path='/transactions'
                                element={<Transfers />}
                            ></Route>
                        </Routes>
                    </Router>
                </CustomersContenxt.Provider>
                <Footer />
            </div>
        </>
    );
}

export default App;
