import nodemailer from "nodemailer";

const sendEmail = async (email, token, type) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Define the URL depending on the type of email (verification or password reset)
  let url = "";
  let subject = "";
  let text = "";

  if (type === "verify") {
    url = `${process.env.DOMAIN}/verify/${token}`;
    subject = "Verify Your Account";
    text = `
      <p>Welcome to Myhome2u!</p>
      <p>Please click the link below to verify your account:</p>
      <a href="${url}">${url}</a>
    `;
  } else if (type === "resetPassword") {
    url = `${process.env.DOMAIN}/resetpassword/${token}`;
    subject = "Reset Your Password";
    text = `
      <p>We received a request to reset your password.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${url}">${url}</a>
    `;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
