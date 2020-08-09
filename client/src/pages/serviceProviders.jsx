import React from 'react';
import Layout from "../components/generic/layout";
import Services from "../components/home/service providers/services";
import LocationContextProvider from '../contexts/LocationContext';
import SPContextProvider from '../contexts/SPContext';

const ServiceProviders = () => {
    return (
        <Layout>
            <LocationContextProvider>
                <SPContextProvider>
                    <Services />
                </SPContextProvider>
            </LocationContextProvider>
        </Layout>
    );
}
 
export default ServiceProviders;