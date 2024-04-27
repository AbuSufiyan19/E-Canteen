
const ContactUs = require('../models/contactus');

// Assuming your route for handling the contact form submission is '/contact'
exports.submitContactForm = async (req, res) => {
  try {
    // Extract data from the form submission
    const { name, email, phone, subject, message } = req.body;

    // Create a new ContactUs document with the extracted data
    const newContact = new ContactUs({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Save the new contact entry to the database
    await newContact.save();

    // Redirect or send a success response, as needed
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message. Please try again.');
  }
};