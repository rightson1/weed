import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const NotificationSchema = new Schema({
    text: str,
    phone: {
        type: String,
        default: "",
    },
    sender: str,
    receiver: str,
    orderId: str,
    image: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default models.Notification || model("Notification", NotificationSchema);