import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const OrderSchema = new Schema({
    buyer: str,
    dealer: str,
    product: str,
    productId: str,
    image: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        required: true,
    },
    pickup: {
        type: String,
        required: true,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default models.Order || model("Order", OrderSchema);