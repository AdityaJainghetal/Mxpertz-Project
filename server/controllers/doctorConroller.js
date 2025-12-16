const DoctorModel = require("../models/doctorModel");
const PateintModel = require("../models/patientModel");
const brpypt = require("bcryptjs");

const doctorRegistration = async (req, res) => {
  const { name, address, city, mobile, speciality, email, password } = req.body;

  try {
    const existingDoctor = await DoctorModel.findOne({ email: email });
    if (existingDoctor) {
      return res.status(400).send({ msg: "Email already registered!" });
    }
    const salt = await brpypt.genSalt(10);
    const hashedPassword = await brpypt.hash(password, salt);
    const Doctor = await DoctorModel.create({
      name: name,
      address: address,
      city: city,
      mobile: mobile,
      specailization: speciality,
      email: email,
      password: hashedPassword,
    });
    res.status(201).send({ msg: "Doctor Successfully Registered!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error. Please try again later." });
  }
};

const doctorHomeDisplay = async (req, res) => {
  try {
    const Doctor = await DoctorModel.find();
    res.status(200).send(Doctor);
  } catch (error) {
    console.log(error);
  }
};

const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Doctor = await DoctorModel.findOne({ email: email });
    if (!Doctor) {
      return res.status(400).send({ msg: "Invalid Email!" });
    }
    const isMatch = await brpypt.compare(password, Doctor.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid Credentials!" });
    }
    res.status(200).send(Doctor);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error. Please try again later." });
  }
};

const doctorSearch = async (req, res) => {
  const { name, speciality } = req.body;

  const Doctor = await DoctorModel.find({
    $or: [{ name: name }, { specailization: speciality }],
  });
  console.log(Doctor);
  res.status(200).send(Doctor);
};

const patientlist = async (req, res) => {
  const { docid } = req.query;
  try {
      const Pateint = await PateintModel.find({ doctorId: docid });
      res.status(200).send(Pateint);
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  doctorRegistration,
  doctorHomeDisplay,
  doctorLogin,
  doctorSearch,
  patientlist,
};
