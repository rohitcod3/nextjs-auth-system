import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update the user in the database based on the email type
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
            });
        }

        // Configure the email transporter
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        
        console.log("mailer",process.env.DOMAIN)
        // Define mail options
        const mailOptions = {
            from: 'rohit@gmail.com', // Sender email address
            to: email, // Recipient email address
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: `
                <p>
                    Click <a href="${process.env.DOMAIN}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY" ? "verify your email" : "reset your password"
            }.
                </p>
                <p>
                    Or copy and paste the link below into your browser:
                </p>
                <p>
                    ${process.env.DOMAIN}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}
                </p>
                <p>
                    If you did not request this, please ignore this email. Do not share this link with anyone.
                </p>
            `
        };
        

        // Send the email
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};
