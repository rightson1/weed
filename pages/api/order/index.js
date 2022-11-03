import Order from "../../../models/Order";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();
    const { method } = req;

    if (method === "POST") {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "GET") {
        const { buyer } = req.query;
        const { dealer } = req.query;
        const { id } = req.query;
        try {
            if (buyer) {
                const orders = await Order.find({ buyer });
                res.status(200).json(orders);
            } else if (dealer) {
                const orders = await Order.find({ dealer });
                res.status(200).json(orders);
            } else if (id) {
                const order = await Order.findById(id);
                res.status(200).json(order);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "DELETE") {
        const { _id } = req.query;
        console.log(_id);
        try {
            const order = await Order.findByIdAndDelete(_id);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "PUT") {
        const { _id } = req.query;
        try {
            const order = await Order.findByIdAndUpdate(_id, req.body, {
                new: true,
            });
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json({ success: false });
    }
}