import React from "react";

import Layout from "../components/generic/layout";
import EmployeeList from "../components/employees/EmployeeList";

const Home = () => {
    return (
        <Layout>
            <EmployeeList />
        </Layout>
    );
};

export default Home;
