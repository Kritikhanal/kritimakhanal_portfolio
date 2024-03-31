const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, name, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kritimakhanal77@gmail.com",
        pass: "bvkc opxk sevq gsut",
      },
    });

    const mail_configs = {
      from: "kritimakhanal77@gmail.com",
      to: email,
      subject: `${name}, Thank you for your message`,
      html: `
      <h1>Dear ${name},</h1>
      <p>Thank you for your response and for reaching out to me. We appreciate your interest.</p>
      <p>Your message has been received and we will get back to you as soon as possible.</p>
      <p>If you require further clarification or have additional questions, please feel free to reply to this mail. We're here to ensure you have all the information you need to make an informed decision or proceed with our services.</p>
      <p>Best Regards,</p>
      <p>Kritima Khanal</p>
        <p>MERN developer</p>
      
      `,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
