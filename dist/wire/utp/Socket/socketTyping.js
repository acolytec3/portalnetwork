"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AckResult = exports.ConnectionDirection = exports.ConnectionState = exports.logScope = exports.defaultDataResendsBeforeFailure = exports.initialRcvRetransmitTimeout = exports.defaultInitialSynTimeout = exports.checkTimeoutsLoopInterval = exports.mtuSize = exports.reorderBufferMaxSize = void 0;
exports.reorderBufferMaxSize = 1024;
//   # Maximal number of payload bytes per packet. Total packet size will be equal to
//   # mtuSize + sizeof(header) = 600 bytes
//   # TODO for now it is just some random value. Ultimatly this value should be dynamically
//   # adjusted based on traffic.
exports.mtuSize = 580;
//   # How often each socket check its different on going timers
exports.checkTimeoutsLoopInterval = 500;
//   # Defualt initial timeout for first Syn packet
exports.defaultInitialSynTimeout = 3000;
//   # Initial timeout to receive first Data data packet after receiving initial Syn
//   # packet. (TODO it should only be set when working over udp)
exports.initialRcvRetransmitTimeout = 10000;
//   # Number of times each data packet will be resend before declaring connection
//   # dead. 4 is taken from reference implementation:
exports.defaultDataResendsBeforeFailure = 4;
exports.logScope = {
    topics: "utp_socket",
};
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["SynSent"] = 0] = "SynSent";
    ConnectionState[ConnectionState["SynRecv"] = 1] = "SynRecv";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
    ConnectionState[ConnectionState["ConnectedFull"] = 3] = "ConnectedFull";
    ConnectionState[ConnectionState["Reset"] = 4] = "Reset";
    ConnectionState[ConnectionState["Destroy"] = 5] = "Destroy";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
var ConnectionDirection;
(function (ConnectionDirection) {
    ConnectionDirection[ConnectionDirection["Outgoing"] = 0] = "Outgoing";
    ConnectionDirection[ConnectionDirection["Ingoing"] = 1] = "Ingoing";
})(ConnectionDirection = exports.ConnectionDirection || (exports.ConnectionDirection = {}));
var AckResult;
(function (AckResult) {
    AckResult[AckResult["PacketAcked"] = 0] = "PacketAcked";
    AckResult[AckResult["PacketAlreadyAcked"] = 1] = "PacketAlreadyAcked";
    AckResult[AckResult["PacketNotSentYet"] = 2] = "PacketNotSentYet";
})(AckResult = exports.AckResult || (exports.AckResult = {}));
;
