const express = require("express");
const router = express.Router();

const contactsControllers = require("../controllers/contacts");

router.get("/", contactsControllers.getContacts);

router.get("/:id", contactsControllers.getContact);

module.exports = router;
