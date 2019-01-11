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
// [ x ]

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
// [ x ]

router.get('/:id/actions', (req, res) => {
    const {projectsId} = req.params;
    prDB.getProjectActions(projectsId).then(thisPrsass => {
        if (!thisPrsass.length) {
            return res.status(404).json({error: 'No project/Actions Headers,Try again.', err});
        }
        res.status(200).json(thisPrsass);
    }).catch(err => {
        res.status(500).json({error: 'Failure, no projects! Try again.', err})
    })
});
// [ x ]

//++++++++++++++++++++++++++++++++++++++++
// - post stuff here
//++++++++++++++++++++++++++++++++++++++++
router.post('/', (req, res) => {
    const newPr = req.body;
    console.log(newPr);
    if (req.body.name.length > 128) {
        return res.status(400)
          .json({ error: "Shorten name bellow 128 characters", err });
      }
    if (newPr.description && newPr.name) {
        prDB.insert(newPr).then( nextProject => {
            res.status(201).json({nextProject});
            console.log(nextProject);
            console.log(newPr);
        }).catch(err => { res.status(500).json({error: 'No post imput Added, Try again.', err })})
    } else {
        res.status(404).json({error: 'You are missing either a name or a discription', err})
    }
});
// [ x ]

//++++++++++++++++++++++++++++++++++++++++
// - delete stuff here
//++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    prDB.remove(id).then(delEach => {
        if (!delEach) {
            res.status(404)
                .json({ error: "No project deleted!", err });
          }
        res.status(200).json({message: 'Item Deleted'});
    }).catch( err => {
        res.status(500).json({ error:'Nothing Was Deleted, Please Try again', err })
    });
});
// [ x ]


//++++++++++++++++++++++++++++++++++++++++
// - update  stuff here
//++++++++++++++++++++++++++++++++++++++++
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, completed } = req.body;
    
        prDB.update(id, { name, description, completed })
            .then( refreshedPR => {
            if (refreshedPR === null || refreshedPR === undefined) {
                res.status(404).join({ error: 'No project here, Try again', err });
            }
            res.status(200).json({message:`Updated ${refreshedPR}`});
            })
            .catch(err => {
            res.status(500).json({ error: 'No Project Updated!', err})
        })
    

});
// [ x ]





module.exports = router;