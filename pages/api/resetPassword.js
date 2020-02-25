import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    console.log("Entered password change function");
    console.log("Received currentPassword ", currentPassword);
    console.log("Received newPassword ", newPassword);

    // If there is no authorization header, send back an error
    if(!(req.headers.authorization)) {
        return res.status(401).send("No authorization token");
    }

    try {
        // Get user ID from JSON web token
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        
        console.log("User ID from token is ", userId);
        
        // Check to see if user exists with provided ID from token
        // Since password was set to select:false in the schema, it's not returned by default. 
        // Using .select() on the .findOne method allows us to specify that we want password anyway.
        const user = await User.findOne({ _id: userId }).select('+password');
        console.log("User found is ", user);
        // If not, return error
        if(!user) {
            return res.status(404).send("Error retrieving logged in user");
        }

        console.log("Password from database: ", user.password);
        console.log("Type of currentPassword", typeof currentPassword);
        // Check to see if the submitted current password matches the one in DB
        const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
        console.log("passwordsMatch? ", passwordsMatch);

        // If so, update user with new password
        if(passwordsMatch) {
            console.log("Current password matches the one stored in DB!");
            // First, hash the new password
            const hash = await bcrypt.hash(newPassword, 10);

            // Update user with hashed new password
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $set: { password: hash } }
            );

            console.log("Update user is ", updatedUser);

            // Send email to user with their updated password
            const mailgun = require("mailgun-js");
            
            const mg = mailgun({apiKey: process.env.MG_API_KEY, domain: process.env.MG_DOMAIN});
            const data = {
                from: 'FeedSeek <noreply@feed-seek.com>',
                to: `${ user.email }, noreply@feed-seek.com`,
                subject: 'Your FeedSeek password was updated',
                text: `Your FeedSeek password was successfully changed.

If you did not complete this action, please visit https://feed-seek.com/forgot to reset your password immediately.

Thank you,
The FeedSeek Team`
            };
            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
            
            res.status(201).send('Updated password');
        } else {
            res.status(401).send("Password incorrect");
        }

    } catch(error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
}