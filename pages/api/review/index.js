import Review from "../../../models/Review";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();
    if (req.method === "POST") {
        try {
            const review = await Review.create(req.body);
            res.status(201).json({ review });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        const { name } = req.query;
        console.log(name);
        try {
            const reviews = await Review.find({ receiver: name });
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(200).json("Wrong route");
    }
}