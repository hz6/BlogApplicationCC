import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import parse from 'html-react-parser';

import axios from 'axios';


function SingleBlog() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchOneBlog = async () => {
            setLoading(true);
            try {
                const doc = await axios.get(`/blog/${slug}`);
                setBlog(doc.data.blog)
            } catch (e) {
                console.error('Blog fetch error:', e.message);
            }
            setLoading(false);
        }
        fetchOneBlog();
    }, []);

    return (
        <div>
            <h1>{blog?.title}</h1>
            <NavLink style={{ color: '#4169E1', fontSize: 15 }} to="/">Back to home</NavLink>
            <br />
            {
                loading ?
                    'Loading the Blog...'
                    :
                    blog != null ?
                        <div
                            className='embedded'
                            style={{ padding: 40, fontSize: 15, textAlign: 'left' }}
                        >
                            {
                                // https://medium.com/@uigalaxy7/how-to-render-html-in-react-7f3c73f5cafc
                                parse(blog.content)
                            }
                        </div>
                        :
                        'Blog Not Found'
            }
        </div>
    )
}

export default SingleBlog;