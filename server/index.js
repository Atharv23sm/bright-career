const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const path = require('path')
require("./conn/conn");

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoute = require('./routes/profileRoute');

app.use('/', jobRoutes);
app.use('/', authRoutes);
app.use('/', upload.single('file'), profileRoute);

app.listen(process.env.PORT , () => console.log(`Server is running`+process.env.PORT));