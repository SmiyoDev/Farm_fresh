exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email ||!password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existingUser = await query('SELECT * FROM users WHERE email =?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query('INSERT INTO users (email, password) VALUES (?,?)', [email, hashedPassword]);
    if (!result.affectedRows) {
      return res.status(500).json({ message: 'Failed to create user' });
    }
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email ||!password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await query('SELECT * FROM users WHERE email =?', [email]);
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};