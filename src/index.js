import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import multer from 'multer';
import transporter from './nodemailer.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const whitelist = process.env.WHITELIST_CORS.split(', ');
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) { //bypassing for postman
      return callback(null, true);
    } else if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Send Mail Endpoint
app.post('/api/v1/send-mail', upload.none(), async (req, res) => {
  const { name, website, email, subject, message } = req.body;

  try {
    const mailOptions = {
      from: `"${website !== undefined ? website : email}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(409).json({
          statusCode: 409,
          type: 'error',
          title: 'Failed to Send Email',
          body: `Dear ${name}, we encountered an issue while attempting to send your email. Please try again later.`,
          error: error || 'Internal Server Error',
          data: null,
        });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({
          statusCode: 200,
          type: 'success',
          title: 'Email Successfully Sent',
          body: `Dear ${name}, your email has been successfully delivered. I will be in touch with you shortly.`,
          data: { ...req.body }
        });
      }
    });

  } catch (error) {
    res.status(404).json({
      statusCode: 404,
      type: 'error',
      title: 'Failed to Send Email',
      body: `Dear ${name}, we encountered an issue while attempting to send your email. Please try again later.`,
      error: error.message || 'Internal Server Error',
      data: null,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`The website is live ==> https://localhost:${PORT}`);
});
