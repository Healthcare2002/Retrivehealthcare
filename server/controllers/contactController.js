const Contact = require('../models/Contact');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create contact
        const contact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Error sending message'
        });
    }
}; 