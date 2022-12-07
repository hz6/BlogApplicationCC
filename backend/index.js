const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('./db/dbConn');
const { Blog } = require('./db/models');
const PORT = 4000;
const app = express();

require('./db/dbConn');

app.use(express.json());

// Fetch a batch of blogs
app.get('/blogs', async (req, res) => {

    let { page, size } = req.query;
    if (!page) page = 1;
    if (!size) size = 6;

    const skip = (page - 1) * size;
    const limit = parseInt(size);

    try {

        const { rows, count } = await Blog.findAndCountAll({
            offset: skip,
            limit: limit,
            where: {
                published_at: { [Op.not]: null }
            },
            order: [
                [sequelize.literal('published_at'), 'DESC']
            ],
        })

        console.log('Blogs Fetch Sucessful');
        res.status(200).send({ blogs: rows, total: count });
    } catch (e) {
        console.log('Blogs Fetch Unsucessful');
        res.status(500).send({ errMsg: 'Server Error' });
    }

});

app.get('/blog/:slug', async (req, res) => {
    const { slug } = req.params
    if (!slug) res.status(400).send({ errMsg: 'Bad Request' });

    try {
        const data = await Blog.findOne({
            where: {
                slug: slug
            }
        });
        res.status(200).send({
            blog: data
        });
    } catch (e) {
        res.status(404).send({ errMsg: 'Blog Not Found' });
    }

})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});