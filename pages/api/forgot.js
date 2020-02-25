import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

connectDb();

export default async (req, res) => {
    const { email } = req.body;

    try {
        
        // Validate email address entered
        if(!isEmail(email)) {
            return res.status(422).send("Email must be valid");
        }

        // Check to ensure that user exists in DB
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).send(`User not found with email address ${email}`);
        }

        // If user exists, generate and hash new password
        var generator = require('generate-password');
        var password = generator.generate({
            length: 10,
            numbers: true
        });

        console.log("Generated new password, it's ", password);
        const hash = await bcrypt.hash(password, 10);
        
        // Update user with new hashed temporary password
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $set: { password: hash } }
        );

        console.log("Update user is ", updatedUser);

        // Send email to user with their updated password
        const mailgun = require("mailgun-js");
        
        const mg = mailgun({apiKey: process.env.MG_API_KEY, domain: process.env.MG_DOMAIN});
        const data = {
            from: 'FeedSeek <noreply@feed-seek.com>',
            to: `${ email }, noreply@feed-seek.com`,
            subject: 'Your temporary FeedSeek password',
            text: `Your FeedSeek password was reset, you'll find your temporary password below. Once logged in, you can reset your password to a new one of your choosing.
            
${ password }

If you did not perform this action, please ignore this message.

Thank you,
The FeedSeek Team`
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });

        res.status(201).send('Updated password');
    } catch(error) {
        console.error(error);
        res.status(500).send("Error resetting password. Please try again later.");
    }
}