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
    
    // Let start date begin with today's date;
    let startDate = new Date();

    // If we sent in a number of days to search back for
    if(days) {
        const countBackDays = Number(days);
        // Get the date to look back as far as
        startDate.setDate(startDate.getDate()-countBackDays);
    } else {
        startDate = new Date(0);
    }

    try {
        const likes = await Like.find({ 
            entitySectionId,
            createdAt: {$gte: startDate}
        });
        
        // Get array of likes, storing the liked entity and the create date of the like 
        const allLikesArray = likes.map(like => {
            return ({ 
                entity: like.entity,
                createdAt: like.createdAt
            });
        });
        
        // console.log("allLikesArray: ", allLikesArray);

        // Reduce to an array that stores an object for each entity
        // with the like quantity and most recent like date as properties
        var likeQuantityArray = allLikesArray.reduce(function (workingArray, like) {            
            workingArray[like.entity] = { 
                // If this entity already exists in the array, start from that entitie's likeQuantity, otherwise, start from 0
                // ...then increment
                likeQuantity: (workingArray[like.entity] ? workingArray[like.entity].likeQuantity : 0) + 1,
                // Set the mostRecentLike property to the latest createdAt date
                // (likes are already sorted by date, so just keep storing this and we'll end up with the most recent one)
                mostRecentLike: like.createdAt
            }
            return workingArray;
        }, {});

        // console.log("likeQuantityArray: ", likeQuantityArray);

        // Get an array of just the entity IDs, sorted by number of occurences, then by mostRecentLike date
        var sortedEntitiesByLikes = Object.keys(likeQuantityArray).sort(function (a, b) {
            if(likeQuantityArray[a].likeQuantity == likeQuantityArray[b].likeQuantity) {
                if(likeQuantityArray[a].mostRecentLike > likeQuantityArray[b].mostRecentLike) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                if(likeQuantityArray[a].likeQuantity > likeQuantityArray[b].likeQuantity) { 
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    
        // console.log("sortedEntriesByLikes: ", sortedEntitiesByLikes);

        res.status(200).json(sortedEntitiesByLikes);
        
    } catch(error) {
        console.error(error);
        res.error(403).send("Unable to retrieve top entities.");
    }
}