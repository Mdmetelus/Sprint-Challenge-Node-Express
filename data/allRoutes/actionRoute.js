const express = require('express');
const router = express.Router();

const actDB = require('../helpers/actionModel');

//++++++++++++++++++++++++++++++++++++++++++
// get endpoints
//++++++++++++++++++++++++++++++++++++++++++++
router.get('/', (req, res) => {
    actDB.get().then(allActs => {res.status(200).json(allActs)})
        .catch(err=> {
            res.status(500).json({message: 'Failure, no Actions! Try again.'})
        })
});

module.exports = router;