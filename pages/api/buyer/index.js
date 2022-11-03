import Buyer from "../../../models/Buyer";
import db from "../../../models/db";

export default async function handler(req, res) {
    const { method } = req;
    await db();
    if (method === "GET") {
        const email = req.query.email;
        const { dealer } = req.query;
        const { name } = req.query;
        if (email) {
            try {
                const buyer = await Buyer.findOne({ email: email });
                res.status(200).json(buyer);
            } catch (error) {
                res.status(400).json(error);
            }
        } else if (dealer) {
            try {
                const buyers = await Buyer.find({ dealers: { $in: dealer } }).select(
                    "name "
                );
                res.status(200).json(buyers);
            } catch (error) {
                res.status(400).json(error);
            }
        } else if (name) {
            try {
                const buyers = await Buyer.findOne({ name: name }).select(
                    "name dealers"
                );
                res.status(200).json(buyers);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            try {
                const buyer = await Buyer.find({});
                res.status(200).json(buyer);
            } catch (error) {
                res.status(400).json({ success: false });
            }
        }
    } else if (method === "POST") {
        try {
            let name = await Buyer.find();
            name = `buyer-N0${name.length + 1}`;
            req.body.name = name;
            const buyer = await Buyer.create(req.body);
            res.status(201).json(buyer);
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "PUT") {
        const { _id } = req.query;
        const { type } = req.body;
        try {
            if (type === "add") {
                const buyer = await Buyer.findOneAndUpdate({ _id }, {
                    $push: { dealers: req.body.dealer },
                });
                res.status(201).json(buyer);
            } else {
                const buyer = await Buyer.findOneAndUpdate({ _id }, {
                    $pull: { dealers: req.body.dealer },
                });
                res.status(201).json(buyer);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json({ success: false });
    }
}