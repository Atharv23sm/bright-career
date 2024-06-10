const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../models/users');
const userinfo = require('../models/userInfo');
const hiringdb = require('../models/hiring')
const applicantdb = require('../models/applicants')

router.post('/signup', async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.json({ status: 'error', message: 'Hold up! You\'re already registered. Simply log in to continue.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      name,
      email,
      password: hashedPassword
    });

    await userinfo.create({
      name,
      about: '',
      email,
      role: '',
      address: '',
      education: '',
      activity: '',
      skills: '',
      experience: '',
      profilepicname: ""
    });

    return res.json({ status: 'success', message: 'User registered successfully' });

  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {

    const exist_user = await user.findOne({ email });

    if (!exist_user) {
      return res.json({ status: 'error', message: 'Oops! Email not registered. Try another.' });
    }
    else {
      const checkPassword = await bcrypt.compare(password, exist_user.password);

      if (!checkPassword) {
        return res.json({ status: 'error', message: 'Password is incorrect. Please retry.' });
      }
      
      else {

        const token = jwt.sign(
          { user: exist_user },
          'secret123'
        );

        const find_userInfo = await userinfo.findOne({ email });

        const token2 = jwt.sign(
          { userInfo: find_userInfo },
          'secret123'
        );

        const hiringList = await hiringdb.find({ hirer_email: email }).sort({ h_date: -1 })
        const applicantList = await applicantdb.find({ hirer_email: email })

        const token3 = jwt.sign(
          {
            hiringList: hiringList,
            applicantList: applicantList
          },
          'secret123'
        );

        const globeHiringList = await hiringdb.find().sort({ h_date: -1 })

        const token4 = jwt.sign(
          { globeHiringList: globeHiringList },
          'secret123'
        );

        return res.json({ status: 'success', message: 'Login successful', token, token2, token3, token4, user: exist_user, userInfo: find_userInfo, globeHiringList });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
