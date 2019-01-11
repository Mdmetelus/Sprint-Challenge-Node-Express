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

//++++++++++++++++++++++++++++++++++++++++
// - post stuff here
//++++++++++++++++++++++++++++++++++++++++
router.post('/', (req,res) => {
    const action = req.body;
    const { id } = req.params;
    actDB.get(id).then( pr => {
        if (!action.description || !action.notes) {
            return res.status(400).json({ message: 'You need to add Description and or Notes', err});
        }
        if( pr ) {
            actDB.insert({id, ...action }).then(nextAction => {
                res.status(201).json(nextAction)
            }).catch(err => {res.status(500).json({error: 'Action not Added', err})
            });
        } else {
            return res.status(404).json({error: 'No proget with that id', err});
        }
    })
});

//++++++++++++++++++++++++++++++++++++++++
// - delete stuff here
//++++++++++++++++++++++++++++++++++++++++
router.delete('./:id', (req, res) => {
    const id = req.params.id;
    actDB.remove(id).then(delEach => {
        if (!delEach) {
            res.status(404).json({error:'no item deleted',err})
        }
        res.status(200).json({ message: "This action was removed" });
    }).catch(err =>
        res.status(500)
            .json({ error: "No item deleted,  Pleease Try again", err }));
});


//++++++++++++++++++++++++++++++++++++++++
// - update  stuff here
//++++++++++++++++++++++++++++++++++++++++



module.exports = router;