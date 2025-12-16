const DoctorModel= require("../models/doctorModel");
const PatientModel= require("../models/patientModel");

const doctorDisplay=async(req, res)=>{
   const {id} =req.query;
   try {
     const Doctor = await DoctorModel.findById(id);
     console.log(Doctor);
     res.status(200).send(Doctor);
   } catch (error) {
      console.log(error);
   }
}

const patientSave=async(req, res)=>{
 
    const {docid, name, disease,  city, mobile, email} = req.body; 
    const Pateint = await PatientModel.create(
        {
            name:name,
           disease:disease, 
           city:city,
           mobile:mobile,
           email:email,
           doctorId:docid
        }
    )
     res.status(200).send({msg:"Your Appointment Booked!"});
}

const CancelAppointment=async(req, res)=>{
   const {id} = req.query;
 try {
    await PatientModel.findByIdAndDelete(id);
    res.status(200).send({msg:"Appointment Cancelled Successfully!"});
 }
    catch (error) {
        console.log(error);
    }
}

module.exports={
    doctorDisplay,
    patientSave,
    CancelAppointment
}