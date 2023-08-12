const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendForgotPasswordMail = (mailPayload) => {
  const testEmail = `<html>
  <body>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
      <div class="Unsubscribe--addressLine">
        <p class="Unsubscribe--senderName"
          style="font-size:15px;line-height:20px;color:blue"
        >
          PASSWORD RESET CODE
        </p>
        <hr>
        <p style="font-size:12px;line-height:20px">
          <span class="Unsubscribe--senderAddress">Please use this code to reset the password for your Verifyr account.</span>
        </p>
        <p>Here is your code : ${mailPayload.pin}</p>
      </div>
      <p> Thanks <br> The VERIFYR account team</p>
    </div>
  </body>
</html>`;

  const msg = {
    to: mailPayload.to,
    from: {
      name: "EMMANUEL",
      email: "aimuelemmanuel@gmail.com",
    },
    subject: mailPayload.subject,
    html: testEmail,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log("mail sent");
      console.log(response[0].statusCode);
      //console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendScheduledMail = (payload) => {
  const textMail = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #777777;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Forgot Password</h1>
    <p>I am sending you this email to remind you to shut up. 😏</p>
    <a class="button" href="#">Click To Shut Up</a>
  </div>
</body>
</html>
`;
  const msg = {
    to: payload.to,
    from: {
      name: "EMMANUEL",
      email: "aimuelemmanuel@gmail.com",
    },
    subject: payload.subject,
    html: textMail,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log("mail sent");
      console.log(response[0].statusCode);
      //console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendForgotPasswordMail, sendScheduledMail };
