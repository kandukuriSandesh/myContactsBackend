const express = require('express');
const { getContacts, createContact, getIndividualContact, updateContact, deleteContact } = require('../controllers/contactController');
const tokenAuthHandler = require('../middlewares/tokenAuthorisation');

const router = express.Router();

router.use(tokenAuthHandler)

router.route('/').get(getContacts)

router.route('/').post(createContact)

router.route('/:id').get(getIndividualContact)


router.route('/:id').put(updateContact)

router.route('/:id').delete(deleteContact)


module.exports = router