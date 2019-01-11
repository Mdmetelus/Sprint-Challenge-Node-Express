const express = require('express');
const router= express.Router();

const prDB = require('../helpers/projectModel');

//++++++++++++++++++++++++++++++++++++++++++
// get endpoints
//++++++++++++++++++++++++++++++++++++++++++++


router.get('/', (req, res) => {
    prDB.get().then(allPrs => {
        res.status(200).json(allPrs);
        console.log(allPrs);
    }).catch(err => {
        res.status(500).json({ error: 'Failure, no projects! Try again.'})
    });
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    prDB.get(id).then(eachPr => {
        if(!eachPr) {
            return res.status(404).json({message:'Error, no project under thi Id.'});
        }
        res.status(200).json(eachPr);
    }).catch( err => {
        res.status(500)
            .json({ error: 'Failure, no projects! Try again.'})});
});

//++++++++++++++++++++++++++++++++++++++++
// - post stuff here
//++++++++++++++++++++++++++++++++++++++++
router.post('/', (req, res) => {
    const project = req.body;
    if (projects.description && project.name) {
        prDB.insert(project).then( nextProject => {
            res.status(201).json(nextProject);
        }).catch(err => { res.status(500).json({error: 'No post imput Added, Try again.', err})})
    } else {
        res.status(404).json({error: 'You are missing either a name or a discriotion', err})
    }
});



module.exports = router;