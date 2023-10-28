const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactSchema.js')
//@desc get all contacts
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async (req,res) => {
    
    const contacts = await Contact.find({userId:req.user.id})
    res.status(200).json(contacts)
})

//@desc create new contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async(req,res) => {
    const {name,email,phoneNo} = req.body
    if(!name || !email || !phoneNo){
        res.status(400)
        throw new Error("All fields are mandatory") 
    }
    const contact = await Contact.create({
        name,
        email,
        phoneNo,
        userId:req.user.id
    })

    res.status(200).json(contact)
})

//@desc get contact
//@route Get /api/contacts
//@access public

const getIndividualContact = asyncHandler(async (req,res) => {
    const {name,email,phoneNo} = req.body
    const contact = await Contact.findById(req.params.id)
   console.log(contact.userId.toString(),req.user.id)
    if(contact.userId.toString() !== req.user.id){
        res.status(400);
        throw new Error('unAuthorized to get contact details')
    }
    res.status(200).json(contact)
})

//@desc update contact
//@route PUT /api/contacts
//@access public

const updateContact = asyncHandler(async(req,res) => {
    const {name,email,phoneNo} = req.body

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    if(contact.userId.toString() !== req.user.id){
        res.status(400);
        throw new Error('unAuthorized to update')
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})




//@desc delete contact
//@route DELETE /api/contacts
//@access public

const deleteContact = asyncHandler(async(req,res) => {
    const {name,email,phoneNo} = req.body
   
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error('Contact Not Found')
    }
    if(contact.userId.toString() !== req.user.id){
        res.status(400);
        throw new Error('unAuthorized to delete')
    }
    //await Contact.remove()
     await Contact.deleteOne({_id:req.params.id})
     res.status(200).json(contact)
})

module.exports = {
    getContacts,
    createContact,
    getIndividualContact,
    updateContact,
    deleteContact
}