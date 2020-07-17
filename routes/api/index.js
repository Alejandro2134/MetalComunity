const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        albums: 'http://localhost:3000/api/albums',
    })
})

module.exports = router;