import Pedi from "../../../models/pedi";
import db from "../../../models/db";

export default async function handler(req, res) {
    const { method } = req;

    await db();
    if (method === "POST") {
        try {
            let name = await Pedi.find();
            name = `pedi-N${name.length + 1}R${Math.floor(Math.random() * 10)}`;
            req.body.name = name;

            const pedi = await Pedi.create(req.body);
            res.status(201).json(pedi);
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "GET") {
        const email = req.query.email;
        const name = req.query.name;
        const code = req.query.code;
        if (email) {
            try {
                const pedi = await Pedi.findOne({ email: email });
                res.status(200).json(pedi);
            } catch (error) {
                res.status(400).json(error);
            }
        } else if (code && name) {
            try {
                const pedi = await Pedi.findOne({ code: { $in: code }, name });
                console.log(pedi);
                if (!pedi) {
                    res.status(400).json({ message: "No Pedi Found" });
                } else {
                    res.status(200).json(pedi);
                }
            } catch (error) {
                res.status(400).json(error);
            }
        } else if (name) {
            console.log("rada");
            try {
                const pedi = await Pedi.findOne({ name: name });
                const { email, password, _id, username, code, ...others } = pedi._doc;
                res.status(200).json(others);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            try {
                const pedi = await Pedi.find({});
                res.status(200).json(pedi);
            } catch (error) {
                res.status(400).json({ success: false });
            }
        }
    } else if (method === "PUT") {
        const { code } = req.body;
        const { crud } = req.query;

        console.log(crud);
        try {
            if (crud) {
                const pedi = await Pedi.findOneAndUpdate({ _id: req.query.crud }, {
                    $pull: { code: req.body.code },
                }, {
                    new: true,
                });
                return res.status(200).json(pedi);
            } else if (code) {
                const pedi = await Pedi.findOneAndUpdate({ _id: req.query._id }, {
                    $push: { code: req.body.code },
                }, {
                    new: true,
                });
                return res.status(200).json(pedi);
            }
            const pedi = await Pedi.findOneAndUpdate({ _id: req.query._id },
                req.body, {
                    new: true,
                }
            );
            if (!pedi) {
                return res.status(400).json({ success: false });
            }
            res.status(200).json(pedi);
        } catch (error) {
            res.status(400).json({ success: false });
        }
    } else {
        res.status(400).json({ success: false });
    }
}