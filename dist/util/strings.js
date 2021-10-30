"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortId = void 0;
const shortId = (nodeId) => {
    return nodeId.slice(0, 5) + '...' + nodeId.slice(nodeId.length - 5);
};
exports.shortId = shortId;
