const express = require("express");
const router  = express.Router();
const request = require('request');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = '533626800211-r0pto59jqhr899v2r85sgb6pqbc9oc0v.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04W96k6ftmT7SCgYIARAAGAQSNwF-L9IrMw1xIzEtqmB0ZTTMQ8NuHv0m8hmxNxROxCTj5CHM-FeKFV6nFLR258LCDU1IvutOq0g';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(html) {
  try {
    const accessTokenret = await oAuth2Client.getAccessToken();
    var accessToken = accessTokenret.token
    // console.log("accessToken", accessToken)

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'notificationupdater@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshTkoen: REFRESH_TOKEN,
        accessToken: accessToken,
      }
    })

    const mailOptions = {
      from: 'Personal Website <notificationupdater@gmail.com>',
      to: 'christopherjmacgregor@gmail.com',
      subject: 'New Personal Website Contact Request',
      text: 'Error with HTML, check database for customer info',
      html: html,
    };

    const result = await transport.sendMail(mailOptions)
    return result

  } catch (error) {
    return error;
  }
}

async function checkCaptcha(req) {
  const captcha = req.body['g-recaptcha-response'];
  // console.log(captcha);

  // brute force check that captcha has been filled out
  if (
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ){
    req.flash("msg", "Please out captcha");
    throw new Error("empty captcha");
  }

  // check request response
  const captchaSecret = "6LfYRQUeAAAAAFbN5ymowRWJEPVlu77FHQ4V7CxW";
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captcha}`;

  request(verifyURL, (err, response, body) => {
    body = JSON.parse(body);
    if (!body.success) {
      console.log(body);
      req.flash("msg", "Oops, something went wrong. Please try again!");
      throw new Error("bad captcha response");
    }
  });
}

// redirect to contact section
router.get('/contact', function(req,res) {
  res.redirect("/#contact");
});

router.post("/contact", async(req,res) => {
  const html = `
    <p>New Contact Request</P>
    <h3>Contact Info</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    try {
      await checkCaptcha(req);
      sendMail(html);
      req.flash("msg", "Thank you for reaching out!");
    } catch (e) {
      console.log("ERROR: " + e.message)
    } finally {
      res.redirect("/#contact");
    }
});

module.exports = router;
