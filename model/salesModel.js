"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var mongoose_1 = __importStar(require("mongoose"));
var SalesSchema = new mongoose_1.Schema({
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
    }
});
exports["default"] = mongoose_1["default"].model("salesdata", SalesSchema);
//# sourceMappingURL=salesModel.js.map