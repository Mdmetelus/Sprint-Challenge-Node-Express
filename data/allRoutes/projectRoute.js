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
    const { name, description, completed } = req.body;
    if (projects.description && project.name) {
        prDB.insert(project).then( nextProject => {
            res.status(201).json({nextProject});
            console.log(nextProject);
            console.log(project);
        }).catch(err => { res.status(500).json({error: 'No post imput Added, Try again.', err})})
    } else {
        res.status(404).json({error: 'You are missing either a name or a discription', err})
    }
});

//++++++++++++++++++++++++++++++++++++++++
// - delete stuff here
//++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    prDB.remove(id).then(count => {
        res.status(200).json({message: 'Item Deleted'});
    }).catch( err => {
        res.status(500).json({ error:'Nothing Was Deleted, Please Try again', err })
    });
});


//++++++++++++++++++++++++++++++++++++++++
// - update  stuff here
//++++++++++++++++++++++++++++++++++++++++
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const project = req.body;
    if (project.description && project.name) {
        prDB.update(id,project).then( refreshedPR => {
            res.status(204).json({message:`Updated ${refreshedPR}`});
        }).catch(err => {
            res.status(500).json({ error: 'No Project Updated!', err})
        })
    } else {
        res.status(400).json({ error: 'You are missing either a name or a discription!', err})
    }

});






module.exports = router;