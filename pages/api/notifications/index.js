import Notification from "../../../models/Notification";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();
    if (req.method === "POST") {
        try {
            const notification = await Notification.create(req.body);
            res.status(201).json({ notification });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === "GET") {
        const { name } = req.query;
        const { id } = req.query;

        try {
            if (name) {
                const notifications = await Notification.find({ receiver: name });
                res.status(200).json(notifications);
            } else if (id) {
                const notifications = await Notification.findOne({ _id: id });
                res.status(200).json(notifications);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (method === "DELETE") {
        const { _id } = req.query;
        try {
            const notification = await Notification.findByIdAndDelete(_id);
            res.status(200).json(notification);
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(200).json("Wrong route");
    }
}