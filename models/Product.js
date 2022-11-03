import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const ProductSchema = new Schema({
    name: str,
    price: str,
    quantity: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    search: {
        type: Array,
        default: [],
    },
    dealer: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    offerTitle: {
        type: String,
        default: "",
    },
    pic: {
        type: String,
        default: "",
    },
    offer: {
        type: Boolean,
        default: false,
    },

    discount: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default models.Product || model("Product", ProductSchema);