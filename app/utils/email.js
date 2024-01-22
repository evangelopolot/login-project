const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Login System <loginSystem@mail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html, // Include this line for HTML content
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle the error, e.g., log it or throw a custom error
  }
};

module.exports = sendEmail;
