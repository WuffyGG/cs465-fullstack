const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

const register = async (req, res) => {
  // Basic validation
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    // Prevent duplicate email
    const existing = await User.findOne({ email: req.body.email }).exec();
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json(err);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Passport error:', err);
      return res.status(500).json(err);
    }

    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      // Authentication failed: info may contain a message
      return res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};