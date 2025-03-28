const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/xchange360', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  userId: String,
  wallet: String,
  email: String,
  phoneNumber: String,      // Ensure consistency with schema and frontend
  linkedAccounts: Object,
  firstName: String,         // Added first name
  lastName: String,          // Added last name
  profileImage: String       // Added profile image
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { userId, wallet, email, phoneNumber, linkedAccounts } = req.body;

  try {
    const existing = await User.findOne({ userId });

    console.log("🔥 Incoming POST:", req.body); // Add this
    
    if (existing) {
      existing.wallet = wallet;
      existing.email = email;
      existing.phoneNumber = phoneNumber;   // Ensure consistent field naming
      existing.linkedAccounts = linkedAccounts;
      await existing.save();
    } else {
      await User.create({
        userId,
        wallet,
        email,
        phoneNumber,
        linkedAccounts,
        firstName: "",     // Initialize with empty string
        lastName: "",
        profileImage: ""
      });
    }

    res.status(200).send('User saved/updated');
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Server error');
  }
});

// ✅ GET route to fetch user by ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ userId: id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).send('Server error');
  }
});

// ✅ PUT route to update first name, last name, and profile image
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, profileImage } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      { firstName, lastName, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
