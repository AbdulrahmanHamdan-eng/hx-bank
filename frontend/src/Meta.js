import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, content }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={content} />
        </Helmet>
    );
};
Meta.defaultProps = {
    title: 'hx-bank',
    description: 'hx-bank services',
};
export default Meta;
