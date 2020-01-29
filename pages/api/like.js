import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';
import Like from '../../models/Like';

connectDb();

export default async (req, res) => {
    switch(req.method) {
        case "POST":
            await handlePostRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        case "GET":
            await handleGetRequest(req, res);
            break;
        default: 
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}


async function handlePostRequest(req, res) {
    
    const { entity } = req.body;

    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        
        const newLike = await new Like({
            user: userId,
            entity: entity.id,
            entitySectionId: entity.sectionId,
            entityCategories: entity.categories
        }).save();

        res.status(201).json(newLike);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error liking this entity. Oops.");
    }
}

async function handleDeleteRequest(req, res) {
    const { entityId } = req.query;

    // If there is no authorization header, send back an error
    if(!(req.headers.authorization)) {
        return res.status(401).send("No authorization token");
    }

    try {
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        const likes = await Like.deleteOne({
            user: userId,
            entity: entityId
        });

        res.status(200).send("Successfully removed like");
    } catch(error) {
        console.error(error);
        res.status(403).send("Could not remove like. Oops.");
    }
}

async function handleGetRequest(req, res) {
    // If there is no authorization header, send back an error
    if(!(req.headers.authorization)) {
        return res.status(401).send("No authorization token");
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        const likes = await Like.find({ user: userId });
        res.status(200).json(likes);
    } catch(error) {
        console.error(error);
        res.error(403).send("Unable to retrieve likes.");
    }
}