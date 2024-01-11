import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import multer from 'multer';
import transporter from './nodemailer.js';

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || '3000';

app.post('/api/v1/send-mail', upload.none(), async (req, res) => {

  try {
    const { name, email, subject, message } = await req.body

    const mailOptions = {
      from: email,
      to: "ankithome8+webmail@gmail.com",
      subject: subject,
      text: "Hello world?",
      html: message
    }
    transporter.sendMail(mailOptions)
    res.status(200).json({
      success: true,
      error: null,
      data: {
        name, email, subject, message
      }
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err,
      data: null
    });
  }
});


app.listen(PORT, () => {
  console.log('The app is running on ' + `http://127.0.0.1:${PORT}`);
});
