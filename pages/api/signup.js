import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate name, email, and password values
        if(!isLength(name, { min: 3, max: 10 })) {
            return res.status(422).send("Name must be 3 to 10 characters long.");
        }
        else if(!isLength(password, { min:6 })) {
            return res.status(422).send("Password must be at least 6 characters long");
        }
        else if(!isEmail(email)) {
            return res.status(422).send("Email must be valid");
        }

        // Check to see if user exists already in DB using mongoose schema .findOne method
        const user = await User.findOne({ email });
        if(user) {
            return res.status(422).send(`User already exists with email address ${email}`);
        }

        // If not, hash bassword with bcrypt -- takes thing to be hashed and "salt rounds"
        const hash = await bcrypt.hash(password, 10);
        
        // Create user in database
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save();
        console.log("New user is ", newUser);
        
        // Create token for new use -- using JWT - signed with expiration date and a piece of data
        // that corresponds to the user, plus secret grabbed from environment variable
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Send back token
        res.status(201).json(token);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error signing up user. Please try again later.");
    }
}