import Product from "../../../models/Product";
import db from "../../../models/db";

export default async function handler(req, res) {
    const { method } = req;
    await db();
    if (method === "GET") {
        const { offer } = req.query;
        const { dealer } = req.query;
        const { search } = req.query;
        const { _id } = req.query;
        try {
            if (offer === "true" && dealer) {
                const products = await Product.find({ offer: true, dealer });
                res.status(200).json(products);
            } else if (offer === "true") {
                const products = await Product.find({ offer: true });
                res.status(200).json(products);
            } else if (search && dealer) {
                const products = await Product.find({
                    dealer,
                    $or: [
                        { name: search },
                        { name: search.charAt(0).toUpperCase() + search.slice(1) },
                        { search: { $in: [search] } },
                        { search: { $in: [search.toUppercase] } },
                        { search: { $in: [search.toLowerCase()] } },
                        {
                            search: {
                                $in: [search.charAt(0).toUpperCase() + search.slice(1)],
                            },
                        },
                    ],
                });
                res.status(200).json(products);
            } else if (search) {
                const products = await Product.find({
                    $or: [
                        { name: search },
                        { name: search.charAt(0).toUpperCase() + search.slice(1) },
                        { search: { $in: [search] } },
                        { search: { $in: [search.toUppercase] } },
                        { search: { $in: [search.toLowerCase()] } },
                        {
                            search: {
                                $in: [search.charAt(0).toUpperCase() + search.slice(1)],
                            },
                        },
                    ],
                });
                res.status(200).json(products);
            } else if (_id) {
                const products = await Product.findById(_id);
                res.status(200).json(products);
            } else if (dealer) {
                const products = await Product.find({ dealer });
                res.status(200).json(products);
            } else {
                const products = await Product.find({});
                res.status(200).json(products);
            }
        } catch (error) {
            res.status(400).json({ success: false });
        }
    } else if (method === "POST") {
        try {
            const product = await Product.create(req.body);
            res.status(201).json({ success: true, data: product });
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "PUT") {
        const { _id } = req.query;
        try {
            const product = await Product.findByIdAndUpdate(_id, req.body, {
                new: true,
            });
            res.status(201).json({ success: true, data: product });
        } catch (error) {
            res.status(400).json(error);
        }
    } else if (method === "DELETE") {
        try {
            const product = await Product.findByIdAndDelete(req.query._id);
            res.status(201).json({ success: true, data: product });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    } else {
        res.status(400).json({ success: false });
    }
}