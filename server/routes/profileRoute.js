const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = require('../models/users');
const userinfo = require('../models/userInfo');
const  cloudinary  = require('../utils/cloudinary');

router.post('/profile', async (req, res) => {

    const img = req.file
    const userInfo = req.body
    const exist_email = await user.findOne({ email: userInfo.email })
  
    if (exist_email && userInfo.oldUserEmail != userInfo.email) {
      return res.json({ status: 'error', message: 'email exists' })
    }

    const imageUrl='';
  
    cloudinary.uploader.upload(img.path, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Upload failed', error: error });
      }
     imageUrl = result.secure_url
    });

    await user.findOneAndUpdate({ email: userInfo.oldUserEmail }, { name: userInfo.name, email: userInfo.email })
  
    await userinfo.findOneAndUpdate({ email: userInfo.oldUserEmail },
      {
        name: userInfo.name, about: userInfo.about,
        email: userInfo.email, role: userInfo.role,
        address: userInfo.address, education: userInfo.education,
        activity: userInfo.activity, skills: userInfo.skills, experience: userInfo.experience,
        profilepicname: (img ? imageUrl : userInfo.profilepicname)
      })
  
    const updatedUser = await user.findOne({ email: userInfo.email })
    const updatedUserInfo = await userinfo.findOne({ email: userInfo.email })
  
    const token = jwt.sign(
      { user: updatedUser },
      'secret123'
    );
  
    const token2 = jwt.sign(
      { userInfo: updatedUserInfo },
      'secret123'
    );
  
    return res.json({ status: 'success', token, token2, userInfo: updatedUserInfo });
  })

  module.exports = router;
