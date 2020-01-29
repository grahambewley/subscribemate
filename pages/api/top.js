import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';
import Like from '../../models/Like';

connectDb();

export default async (req, res) => {
    switch(req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        default: 
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

async function handleGetRequest(req, res) {
    const { secId, days } = req.query;

    const entitySectionId = Number(secId);
    const countBackDays = Number(days);

    // Get the date to look back as far as
    const startDate = new Date();
    startDate.setDate(startDate.getDate()-countBackDays);

    try {
        const likes = await Like.find({ 
            entitySectionId,
            createdAt: {$gte: startDate}
        });
        
        // Get array of entity IDs only, representing each like 
        const entityArray = likes.map(like => {
            return (like.entity);
        });
        // Map to an object that stores each entity ID as a key and the number of occurences as its value
        var map = entityArray.reduce(function (p, c) {
            p[c] = (p[c] || 0) + 1;
            return p;
        }, {});
        // Get an array of just the keys (entity IDs) from the object above, sorted by number of occurences
        var newTypesArray = Object.keys(map).sort(function (a, b) {
            return map[a] < map[b];
        });
        
        res.status(200).json(newTypesArray);
    } catch(error) {
        console.error(error);
        res.error(403).send("Unable to retrieve top entities.");
    }
}