const express = require('express');
const router = express.Router();

const actDB = require('../helpers/actionModel');
const prDB = require('../helpers/projectModel');

//++++++++++++++++++++++++++++++++++++++++++
// get endpoints
//++++++++++++++++++++++++++++++++++++++++++++
router.get('/', (req, res) => {
    actDB.get().then(allActs => {res.status(200).json(allActs)})
        .catch(err=> {
            res.status(500).json({message: 'Failure, no Actions! Try again.'})
        })
});
// [ x ]

router.get('/:id', (req,res) => {
    const id = req.params.id;
    actDB.get(id).then(eachAct => {
        if(eachAct) {
            res.json(eachAct);
        } else {
            res.status(404).json({error: 'Action was not found!', err});
        }
    }).catch(err => { res.status(500).json({error: "Failed, no Action here", err });
    });
    
});
// [ x ]

//++++++++++++++++++++++++++++++++++++++++
// - post stuff here
//++++++++++++++++++++++++++++++++++++++++
router.post('/', (req,res) => {
    const { project_id, description, notes, completed } = req.body;
    const { id } = req.params;
    
    console.log({ project_id, description, notes, completed });
    console.log(project_id);
    
        if (!project_id) {
            res.status(400).json({ error: "Please put an accurate Project ID",err });
          } 
        if (!notes) {
            res.status(400).json({ error: "Please provide notes in your input.",err });
        }
        if (description.length <1 || description.length > 128) {
            res.status(400).json({
              error: "Please provide a description no longer than 128 characters.",err });
        } 
        if (!description) {
            return res.status(400).json({ error: 'You need to add a description.', err });
        }
        
        actDB.insert({ project_id, description, notes, completed })
            .then(nextAction => { res.status(201).json(nextAction);
            })
            .catch(err => {res.status(500).json({error: 'Action not Added', err})
            });
});
// [ x ]

//++++++++++++++++++++++++++++++++++++++++
// - delete stuff here
//++++++++++++++++++++++++++++++++++++++++
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actDB.remove(id).then(delEach => {
        if (!delEach) {
            res.status(404).json({error:'no item deleted',err})
        }
        res.status(204).json({ message: `This action was removed.` });
    }).catch(err =>
        res.status(500)
            .json({ error: "No item deleted,  Pleease Try again", err }));
});
// [ x ]


//++++++++++++++++++++++++++++++++++++++++
// - update  stuff here
//++++++++++++++++++++++++++++++++++++++++
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { project_id, description, notes, completed }  = req.body;

    console.log({ project_id, description, notes, completed });
    console.log(project_id);

    // if (!description || !notes || !completed || !project_id) {
    //     return res.status(400)
    //         .json({ error: 'Inmput Details Missing. Please include all nessesary inputs.', err });
    // }
    if (!project_id) {
        res.status(400).json({ error: "Please put an accurate Project ID",err });
      } 
    if (!notes) {
        res.status(400).json({ error: "Please provide notes in your input.",err });
    }
    if (description.length <1 || description.length > 128) {
        res.status(400).json({
          error: "Please provide a description no longer than 128 characters.",err });
    } 
    if (!description) {
        return res.status(400).json({ error: 'You need to add a description.', err });
    }
    
    actDB.update(id, { project_id, description, notes, completed } )
        .then(newAct => { res.status(200).json(newAct);})
        .catch(err => res.status(500)
            .json({ error: 'No update made. Please Try again', err }));
});



module.exports = router;