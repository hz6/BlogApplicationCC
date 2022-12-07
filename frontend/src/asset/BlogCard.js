import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

function BlogCard({ title, publishedAt, image, slug }) {
    return (
        <div style={{ width: 400, padding: 20, border: "#fff 1px solid", }}>
            <h5>{title}</h5>

            <img style={{ width: 350 }} src={image} alt="blog" />
            <p style={{ fontSize: 20 }}>{moment(publishedAt).format('MMMM Do YYYY')}</p>
            <NavLink style={{ color: '#4169E1', fontSize: 15 }} to={`/${slug}`}>View Detail</NavLink>
        </div>
    )
}

export default BlogCard