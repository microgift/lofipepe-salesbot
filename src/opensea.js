"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.init = void 0;
var stream_js_1 = require("@opensea/stream-js");
var ws_1 = __importDefault(require("ws"));
// import fetch from "node-fetch";
var config_js_1 = require("./config.js");
// import Cache from "./cache.js";
var salesModel_1 = __importDefault(require("../model/salesModel"));
var OPENSEA_API = process.env.OPENSEA_API || "";
var openSeaClient = new stream_js_1.OpenSeaStreamClient({
    token: OPENSEA_API,
    connectOptions: {
        transport: ws_1["default"]
    }
});
//init the client
var init = function () {
    openSeaClient.connect();
};
exports.init = init;
//get subscribed guild id from parse.js
openSeaClient.onItemSold("*", function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var takerAddress, makerAddress, takerF, takerL, takerF2, c, makerF, makerL, makerF2, c2, nameNFT, NFTLink, price, token, split, contract, tokenId, stakeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!event.payload.collection.slug.includes(config_js_1.OPENSEA_SLUG))
                    return [2 /*return*/];
                takerAddress = event.payload.taker.address;
                makerAddress = event.payload.maker.address;
                takerF = takerAddress.slice(0, 4);
                takerL = takerAddress.length;
                takerF2 = takerAddress.slice(takerL - 4, takerL);
                c = takerF + "..." + takerF2;
                makerF = makerAddress.slice(0, 4);
                makerL = makerAddress.length;
                makerF2 = makerAddress.slice(makerL - 4, makerL);
                c2 = makerF + "..." + makerF2;
                nameNFT = event.payload.item.metadata.name;
                NFTLink = event.payload.item.permalink;
                price = event.payload.sale_price / Math.pow(10, 18) +
                    " ".concat(event.payload.payment_token.symbol);
                token = event.payload.item.nft_id;
                split = token.split("/");
                contract = split[1];
                tokenId = split[2];
                stakeData = new salesModel_1["default"]({
                    contract: contract,
                    tokenId: tokenId,
                    nameNFT: nameNFT,
                    link: NFTLink,
                    imageUrl: event.payload.item.metadata.image_url,
                    price: price,
                    takerName: takerAddress,
                    makerName: makerAddress,
                    timestamp: Date.now()
                });
                return [4 /*yield*/, stakeData.save()];
            case 1:
                _a.sent();
                //  delete one
                return [4 /*yield*/, salesModel_1["default"].deleteOne()];
            case 2:
                //  delete one
                _a.sent();
                console.log("Processed sale: ", nameNFT);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=opensea.js.map