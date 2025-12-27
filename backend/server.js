require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
// 👇 REPLACE THIS STRING WITH YOUR ACTUAL ATLAS CONNECTION LINK
const MONGO_URI = 'mongodb+srv://conceptcore02_db_user:YOUR_PASSWORD@cluster0.abcde.mongodb.net/concept_core_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Route to Save Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "Please fill all fields" });
        }
        
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        
        console.log(`📩 New message from ${name}`);
        res.status(201).json({ success: true, message: "Message saved successfully!" });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



