import { default as mongoose, Schema } from 'mongoose'

const SalesSchema = new Schema({
    contract: {
        required: true,
        type: String
    },
    tokenId: {
        required: true,
        type: String
    },
    nameNFT: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String
    },
    imageUrl: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    takerName: {
        required: true,
        type: String
    },
    makerName: {
        required: true,
        type: String
    },
    timestamp: {
        required: true,
        type: Date
    },
});

export default mongoose.model("salesdata", SalesSchema);

