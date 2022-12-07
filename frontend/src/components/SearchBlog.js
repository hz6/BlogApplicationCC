import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

import axios from 'axios';

import BlogCard from "../asset/BlogCard";

function SearchBlog() {
    let [title, setTitle] = useState('');
    let [loading, setLoading] = useState(false);
    let [searchMsg, setSearchMsg] = useState('Search the blogs');
    let [result, setResult] = useState(null);

    /*
    credit: https://stackoverflow.com/a/1054862/9222182
    */
    const convertToSlug = t => {
        return t.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const handleSearch = async () => {
        if (!title) {
            alert('please input the title');
            return;
        }
        const slug = convertToSlug(title);

        try {
            setLoading(true);
            const doc = await axios.get(`/blog/${slug}`);
            setResult(doc.data.blog);
            setSearchMsg(!result ? 'Not found' : '')
        } catch (e) {
            console.error(e.message);
            setSearchMsg('Error!')
        }
        setLoading(false);
    }

    return (
        <div style={{ padding: 20 }}>
            Search
            <br />
            <TextField style={{ margin: 20 }} size="small" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button style={{ margin: 20 }} variant="contained" onClick={handleSearch}>Search</Button>
            <br />
            {
                loading ?
                    'Loading ...'
                    :
                    result == null ?
                        searchMsg
                        :
                        <BlogCard title={result.title} image={result.image} publishedAt={result.published_at} slug={result.slug} />
            }
        </div>
    )
}

export default SearchBlog