import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

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
  linkedAccounts: Object,
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { userId, wallet, email, linkedAccounts } = req.body;

  try {
    const existing = await User.findOne({ userId });

    if (existing) {
      existing.wallet = wallet;
      existing.email = email;
      existing.linkedAccounts = linkedAccounts;
      await existing.save();
    } else {
      await User.create({ userId, wallet, email, linkedAccounts });
    }

    res.status(200).send('User saved/updated');
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});










