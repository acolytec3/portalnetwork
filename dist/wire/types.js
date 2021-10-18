export var SubNetwork;
(function (SubNetwork) {
    SubNetwork[SubNetwork["state"] = 20490] = "state";
    SubNetwork[SubNetwork["history"] = 20491] = "history";
    SubNetwork[SubNetwork["txGossip"] = 20492] = "txGossip";
    SubNetwork[SubNetwork["headerGossip"] = 20493] = "headerGossip";
    SubNetwork[SubNetwork["canonIndices"] = 20494] = "canonIndices";
})(SubNetwork || (SubNetwork = {}));
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["PING"] = 1] = "PING";
    MessageType[MessageType["PONG"] = 2] = "PONG";
    MessageType[MessageType["FINDNODES"] = 3] = "FINDNODES";
    MessageType[MessageType["NODES"] = 4] = "NODES";
    MessageType[MessageType["FINDCONTENT"] = 5] = "FINDCONTENT";
    MessageType[MessageType["CONTENT"] = 6] = "CONTENT";
    MessageType[MessageType["OFFER"] = 7] = "OFFER";
    MessageType[MessageType["ACCEPT"] = 8] = "ACCEPT";
})(MessageType || (MessageType = {}));
