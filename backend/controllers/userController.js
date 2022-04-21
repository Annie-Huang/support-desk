// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please include all fields' });
  }

  res.send('Register Route');
};

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = (req, res) => {
  res.send('Login Route');
};

module.exports = {
  registerUser,
  loginUser,
};
