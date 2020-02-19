import connectDb from '../../utils/connectDb';
import Source from '../../models/Source';

connectDb();

export default async (req, res) => {
    switch(req.method) {
        case "POST":
            await handlePostRequest(req, res);
            break;
        default: 
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

async function handlePostRequest(req, res) {
    const { source } = req.body;
    try {
        const newSource = await new Source({
            name: source.name,
            type: source.type,
            website: source.website,
            authorName: source.authorName
        }).save();
        res.status(201).json(newSource);
        
    } catch(error) {
        console.error(error);
        res.status(500).send("Error adding this new source. Oops.");
    }
}