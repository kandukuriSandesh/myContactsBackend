const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:[true,'ID is required field'],
      ref:'User'
   },
   name:{
    type:'string',
    required:[true, 'Name is required field']
   },
   email:{
    type:'string',
    required:[true, 'email is required field']
   },
   phoneNo:{
    type:'string',
    required:[true, 'phoneNo is required field']
   },
}) 

module.exports = mongoose.model('Contact',contactSchema)