const nodemailer = require("nodemailer");

class Mailer {
  constructor() {
    this.output = "";
    this.transporter = nodemailer.createTransport({
      host: "mail.vinove.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "apoorva.singh@mail.vinove.com", // generated ethereal user
        pass: "apoorva@123" // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    this.mailOptions = {
      from: '"Nodemailer Contact" <apoorva.singh@mail.vinove.com>', // sender address
      to: "", // list of receivers
      subject: "Node Contact Request", // Subject line
      text: "Hello world?", // plain text body
      html: "" // html body
    };
    /*  send mail with defined transport object */
  }
  createTemplate(user, token) {
    let url = `https://localhost:3000/register/verifyemail/${token}`;
    this.mailOptions.html = `<p> Follow link below to verify your email token is valid for 1 hour:${user.email} 
    <a href= ${url}>Verify</a></p>`;
    this.mailOptions.text = `Follow link below to verify your email :${user.email} , 
    for slow browser connection ${url}`;
  }
  setReceivers(email) {
    this.mailOptions.to = email;
  }
  sendMailer() {
    this.transporter.sendMail(this.mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }
}

const MailerObj = new Mailer();

module.exports = MailerObj;
