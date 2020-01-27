import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async(req, res) => {
    switch(req.method) {
        case "GET":
            await handleGetRequest(req,res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
    }
}

async function handleGetRequest(req, res) {
    // Check for the Authorization header
    if(!req.headers.authorization) {
        // If none is found, return right away
        return res.status(401).send("No authorization token");
    }

    try {
        // Use the jwt .verify method to verify the token sent over
        // De-structure the userId from the returned object
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // Get this user from the database
        const user = await User.findOne({ _id: userId });
        // If user is found
        if(user) {
            // Return to the _app back-end with the user object found in DB
            res.status(200).json(user);
        } 
        // If user cannot be found
        else {
            res.status(404).send("User not found");
        }
    } catch(error) {
        // If we hit this stage, verification was not successful
        res.status(403).send("Invalid token");
    }
}