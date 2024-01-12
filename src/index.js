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
    if (whitelist.includes(origin)) {
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

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Send Mail Endpoint
app.post('/api/v1/send-mail', upload.none(), async (req, res) => {
  try {
    const { website, email, subject, message } = req.body;

    const mailOptions = {
      from: `"${website || 'From Website'}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      error: null,
      data: { ...req.body },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
      data: null,
    });
  }
});

// Start the server
app.listen(PORT, (data) => {
  console.log(`The website is live on ${window.location.origin}:${PORT}`);

});
