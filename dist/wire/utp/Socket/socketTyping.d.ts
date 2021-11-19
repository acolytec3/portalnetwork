/// <reference types="node" />
import { Packet } from "../Packets/Packet";
import dgram from 'dgram';
import { Multiaddr } from "multiaddr";
import { Uint16, Uint32 } from "..";
export declare const reorderBufferMaxSize: number;
export declare const mtuSize: number;
export declare const checkTimeoutsLoopInterval: number;
export declare const defaultInitialSynTimeout: number;
export declare const initialRcvRetransmitTimeout: number;
export declare const defaultDataResendsBeforeFailure: Uint16;
export declare const logScope: {
    topics: string;
};
export declare enum ConnectionState {
    SynSent = 0,
    SynRecv = 1,
    Connected = 2,
    ConnectedFull = 3,
    Reset = 4,
    Destroy = 5
}
export declare enum ConnectionDirection {
    Outgoing = 0,
    Ingoing = 1
}
export interface IUtpSocketKeyOptions {
    remoteAddress: Multiaddr;
    rcvId: Uint16;
}
export declare enum AckResult {
    PacketAcked = 0,
    PacketAlreadyAcked = 1,
    PacketNotSentYet = 2
}
export declare type SendCallback = (to: Multiaddr, data: Uint8Array) => void;
export interface ISocketConfigOptions {
    initialSynTimeout?: Duration;
    dataResendsBeforeFailure?: Uint16;
}
export declare type Miliseconds = Uint32;
export declare type Moment = Miliseconds;
export declare type Duration = Miliseconds;
export interface IBody {
    consumed: string;
    done: boolean;
}
export interface IOutgoingPacket {
    packetBytes: Uint8Array;
    transmissions: Uint16;
    needResend: boolean;
    timeSent: Moment;
}
export interface IUtpSocket {
    remoteaddress: Multiaddr;
    ackNr: Uint16;
    connectionIdRcv: Uint16;
    connectionIdSnd: Uint16;
    direction: ConnectionDirection;
    seqNr: Uint16;
    state: ConnectionState;
}
export interface ISocketOptions {
    port: number;
    host: string;
    socket: dgram.Socket;
    syn: Packet | null;
}
export declare type SocketCloseCallBack = () => void;
export declare type ConnectionError = Error;
//# sourceMappingURL=socketTyping.d.ts.map