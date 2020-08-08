import React from 'react';
import Layout from "../components/generic/layout";
import Services from "../components/home/service providers/services";
import LocationContextProvider from '../contexts/LocationContext';

const ServiceProviders = () => {
    return (
        <Layout>
            <LocationContextProvider>
                <Services />
            </LocationContextProvider>
        </Layout>
    );
}
 
export default ServiceProviders;