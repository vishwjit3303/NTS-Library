
import asyncHandler from "express-async-handler";
import Book from "../models/book.js";
import Activity from "../models/UserActivityLogs.js";

export const recommendation = asyncHandler(async (req, res) => {
    const userId = req?.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const data = await Activity.find({ userId });

    if (!data || data.length === 0) {
        return res.status(404).json({ message: "No reading activity found for the user" });
    }

    const readBookIds = data.map(item => item.bookId.toString()).filter(Boolean);
    const genres = data.map(item => item.genre).filter(Boolean);
    const authors = data.map(item => item.author).filter(Boolean);
    const tags = data.flatMap(item => item.tags || []);

    if (genres.length === 0 && authors.length === 0 && tags.length === 0) {
        return res.status(400).json({ message: "Insufficient user data to generate recommendations" });
    }

    const mode = (arr) => {
        const freq = {};
        let max = 0, result = null;
        for (let val of arr) {
            freq[val] = (freq[val] || 0) + 1;
            if (freq[val] > max) {
                max = freq[val];
                result = val;
            }
        }
        return result;
    };

    const topGenre = mode(genres);
    const topAuthor = mode(authors);
    const topTag = mode(tags);

    let recommendations = await Book.find({
        _id: { $nin: readBookIds },
        genre: topGenre
    }).limit(10);

    if (!recommendations || recommendations.length === 0) {
        recommendations = await Book.find({
            _id: { $nin: readBookIds },
            $or: [
                { author: topAuthor },
                { tags: { $in: [topTag] } }
            ]
        }).limit(10);
    }

    if (!recommendations || recommendations.length === 0) {
        return res.status(404).json({ message: "No recommended books found" });
    }

    res.status(200).json(recommendations);
});
