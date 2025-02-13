import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req) {

    try {

        const body = await req.json();

        const { name, email, subject, message } = body;

        if(!(name && email && subject && message)){
            return NextResponse.json({ Message: "All fields are required" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: email, 
            to: process.env.EMAIL_USER, 
            subject: `New Contact Request: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          };

          await transporter.sendMail(mailOptions);

          return NextResponse.json({ message: "Email set successfully" }, { status: 200 });

    } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        
    }

}
