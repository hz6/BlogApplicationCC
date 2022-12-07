import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';

import SearchBlog from './SearchBlog';
import BlogCard from '../asset/BlogCard';

import axios from 'axios';

function Blogs() {
    let [loading, setLoading] = useState(true);
    let [blogs, setBlogs] = useState([]);
    let [page, setPage] = useState(1);
    let [count, setPageCount] = useState(5);

    const pageSize = 6;

    const handlePageChange = (event, value) => {
        if (page !== value) {
            setPage(value);
        } else {
            console.log('already in page ' + value);
        }
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const doc = await axios(`/blogs?page=${page}&size=${pageSize}`);
                console.log('Blogs data: ', doc.data);
                const numOfPage = Math.ceil(doc.data.total / pageSize);
                setBlogs(doc.data.blogs);
                setPageCount(numOfPage);
            } catch (e) {
                console.err(e.message);
            }
            setLoading(false);
        }
        fetchBlogs();
    }, [page])

    return (
        <div>
            <h3>Blogs</h3>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <Stack spacing={1}>
                        {
                            loading ?
                                'Loading blogs...'
                                :
                                blogs.length !== 0 ?
                                    blogs.map((item) => {
                                        return <BlogCard
                                            key={item.id}
                                            title={item.title}
                                            publishedAt={item.published_at}
                                            image={item.image}
                                            slug={item.slug}
                                        />
                                    })
                                    :
                                    'No posts'
                        }
                        <Pagination color="primary" page={page} count={count} onChange={handlePageChange} />
                        <Typography>Page {page}</Typography>
                    </Stack>
                </div>
                <div>
                    <SearchBlog />
                </div>
            </div>
        </div>
    )
}

export default Blogs