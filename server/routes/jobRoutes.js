const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userinfo = require('../models/userInfo');
const hiringdb = require('../models/hiring')
const applicantdb = require('../models/applicants')

router.use('/hire', async (req, res) => {

  const { jobrole, about, hirerName, email, address, payment, category, workmode, experience, reqskills } = req.body

  await hiringdb.create({
    jobrole, about, hirer_name: hirerName, hirer_email: email,
    address, payment, category, workmode, experience, reqskills, h_date: Date.now()
  })

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

  return res.json({ status: 'success', token3, token4, hiringList, globeHiringList })

})

router.delete('/deletejobpost', async (req, res) => {

  const { id, hirer_email } = req.body;

  try {

    await hiringdb.findByIdAndDelete(id);
    await applicantdb.deleteOne({ jobpostId: id });

    const hiringList = await hiringdb.find({ hirer_email: hirer_email }).sort({ h_date: -1 })
    const applicantList = await applicantdb.find({ hirer_email: hirer_email })

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

    return res.json({ status: 'success', token3, token4, hiringList, globeHiringList })

  } catch (error) {
    console.error('Error deleting hiring record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/searchjob', async (req, res) => {
  const { search, searchCity, filter } = req.body
  try {
    const query = {
      jobrole: { $regex: search, $options: "i" },
      address: { $regex: searchCity, $options: "i" },
      ...(filter.category !== 'None' && { category: { $regex: filter.category, $options: "i" } }),
      ...(filter.workmode !== 'None' && { workmode: { $regex: filter.workmode, $options: "i" } }),
    }

    const found_post = await hiringdb.find(query).sort({ h_date: -1 });
    if (found_post) {
      return res.json({ status: 'success', found_post });
    }
  }
  catch (err) {
    return res.status(500).json({ error: err })
  }
})

router.post('/jobdetails', async (req, res) => {

  const { applicant_email, jobpostId } = req.body

  try {
    const found_post = await applicantdb.findOne({ jobpostId, applicant_email })

    if (found_post) {
      return res.json({ status: 'success' })
    }
  }
  catch (err) {
    return res.status(500).json({ error: err })
  }
})

router.post('/apply', async (req, res) => {

  const { jobpostId, hirer_email, applicant_email } = req.body

  try {

    const existjob = await hiringdb.findOne({ _id: jobpostId })

    if (existjob.hirer_email == hirer_email) {

      await applicantdb.create({
        jobpostId,
        hirer_email,
        applicant_email
      })

      return res.json({ status: "success" })
    }

    else {
      return res.json({ status: 'error', message: 'Something went wrong.' })
    }


  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/applicants', async (req, res) => {

  const { jobpostId } = req.body

  try {

    const applicantsData = await applicantdb.find({ jobpostId: jobpostId }, { applicant_email: 1, _id: 0 })

    const applicantEmails = applicantsData.map(applicant => applicant.applicant_email);

    const applicants = await userinfo.find({ email: { $in: applicantEmails } })

    return res.json({ status: "success", applicants: applicants })

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;