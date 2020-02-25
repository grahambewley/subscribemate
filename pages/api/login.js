import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
    const { email, password } = req.body;
    console.log("Password received is ", password);
    try {
        // Check to see if user exists with provided email
        // Since password was set to select:false in the schema, it's not returned by default. 
        // Using .select() on the .findOne method allows us to specify that we want password anyway.
        const user = await User.findOne({ email }).select('+password');
        // If not, return error
        if(!user) {
            return res.status(404).send("No user exists with that email");
        }
        // Check to see if user's password matches the one in DB
        const passwordsMatch = await bcrypt.compare(password, user.password);
        // If so, generate token
        if(passwordsMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });

            // Send token to client
            res.status(200).json(token);
        } else {
            res.status(401).send("Password incorrect");
        }

    } catch(errorr) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
}