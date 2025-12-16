const mongoose = require("mongoose");
const patientSchema= new mongoose.Schema({ 
     name:{type: String, required: true},
     disease:{type: String, required: true}, 
     city:{type: String, required: true},
     mobile:{type: String, required: true},
     email:{type: String, required: true},
     doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
     }
})

module.exports = mongoose.model("patient", patientSchema);