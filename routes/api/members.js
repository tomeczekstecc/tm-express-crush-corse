const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');

const router = express.Router();

//get all members
router.get('/', (req, res) => {
  res.json(members);
});

// get a member

//Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please fill what needed' });
  }

members.push(newMember);
  // res.redirect('/')
  res.json(members);
});

//update member

router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updMember.name ? updMember.name : member.name),
          (member.email = updMember.email ? updMember.email : member.email);
        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

//delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id == parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `Member with id of ${req.params.id} was deleted`,
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

module.exports = router;
