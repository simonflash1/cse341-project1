const mongodb = require("../routes/data/database");
const ObjectId = require("mongodb").ObjectId;

const getContacts = async (req, res) => {
  //#swagger.tags = ["Contacts"]
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getContact = async (req, res) => {
  //#swagger.tags = ["Contacts"]
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  //#swagger.tags = ["Contacts"]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).json(contact);
  } else {
    res.status(500).json(response.error || "Some error occured while creating the contact");
  }
};


const updateContact = async (req, res) => {
  //#swagger.tags = ["Contacts"]
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occured while updating the contact");
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags = ["Contacts"]
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occured while deleting the contact");
  }
};

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
