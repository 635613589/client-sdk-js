import Queue from 'async-await-queue';
import 'webrtc-adapter';
import { ParticipantInfo, Room, SpeakerInfo, VideoLayer } from '../proto/livekit_models';
import { AddTrackRequest, ConnectionQualityUpdate, JoinResponse, LeaveRequest, SessionDescription, SignalRequest, SignalTarget, SimulateScenario, StreamStateUpdate, SubscribedQualityUpdate, SubscriptionPermissionUpdate, SyncState, TrackPermission, TrackPublishedResponse, TrackUnpublishedResponse, UpdateSubscription, UpdateTrackSettings } from '../proto/livekit_rtc';
interface ConnectOpts {
    autoSubscribe: boolean;
    /** internal */
    reconnect?: boolean;
    /** internal */
    sid?: string;
    /** @deprecated */
    publishOnly?: string;
    adaptiveStream?: boolean;
}
export interface SignalOptions {
    autoSubscribe: boolean;
    /** @deprecated */
    publishOnly?: string;
    adaptiveStream?: boolean;
    maxRetries: number;
}
declare type SignalMessage = SignalRequest['message'];
/** @internal */
export declare class SignalClient {
    isConnected: boolean;
    isReconnecting: boolean;
    requestQueue: Queue;
    queuedRequests: Array<() => Promise<void>>;
    useJSON: boolean;
    /** simulate signaling latency by delaying messages */
    signalLatency?: number;
    onClose?: (reason: string) => void;
    onAnswer?: (sd: RTCSessionDescriptionInit) => void;
    onOffer?: (sd: RTCSessionDescriptionInit) => void;
    onTrickle?: (sd: RTCIceCandidateInit, target: SignalTarget) => void;
    onParticipantUpdate?: (updates: ParticipantInfo[]) => void;
    onLocalTrackPublished?: (res: TrackPublishedResponse) => void;
    onNegotiateRequested?: () => void;
    onSpeakersChanged?: (res: SpeakerInfo[]) => void;
    onRemoteMuteChanged?: (trackSid: string, muted: boolean) => void;
    onRoomUpdate?: (room: Room) => void;
    onConnectionQuality?: (update: ConnectionQualityUpdate) => void;
    onStreamStateUpdate?: (update: StreamStateUpdate) => void;
    onSubscribedQualityUpdate?: (update: SubscribedQualityUpdate) => void;
    onSubscriptionPermissionUpdate?: (update: SubscriptionPermissionUpdate) => void;
    onLocalTrackUnpublished?: (res: TrackUnpublishedResponse) => void;
    onTokenRefresh?: (token: string) => void;
    onLeave?: (leave: LeaveRequest) => void;
    connectOptions?: ConnectOpts;
    ws?: WebSocket;
    private options?;
    private pingTimeout;
    private pingTimeoutDuration;
    private pingIntervalDuration;
    private pingInterval;
    constructor(useJSON?: boolean);
    join(url: string, token: string, opts: SignalOptions, abortSignal?: AbortSignal): Promise<JoinResponse>;
    reconnect(url: string, token: string, sid?: string): Promise<void>;
    connect(url: string, token: string, opts: ConnectOpts, abortSignal?: AbortSignal): Promise<JoinResponse | void>;
    close(): void;
    sendOffer(offer: RTCSessionDescriptionInit): void;
    sendAnswer(answer: RTCSessionDescriptionInit): void;
    sendIceCandidate(candidate: RTCIceCandidateInit, target: SignalTarget): void;
    sendMuteTrack(trackSid: string, muted: boolean): void;
    sendAddTrack(req: AddTrackRequest): void;
    sendUpdateTrackSettings(settings: UpdateTrackSettings): void;
    sendUpdateSubscription(sub: UpdateSubscription): void;
    sendSyncState(sync: SyncState): void;
    sendUpdateVideoLayers(trackSid: string, layers: VideoLayer[]): void;
    sendUpdateSubscriptionPermissions(allParticipants: boolean, trackPermissions: TrackPermission[]): void;
    sendSimulateScenario(scenario: SimulateScenario): void;
    sendPing(): void;
    sendLeave(): Promise<void>;
    sendRequest(message: SignalMessage, fromQueue?: boolean): Promise<void>;
    private handleSignalResponse;
    setReconnected(): void;
    private handleWSError;
    private resetPingTimeout;
    private clearPingTimeout;
    private startPingInterval;
    private clearPingInterval;
}
export declare function toProtoSessionDescription(rsd: RTCSessionDescription | RTCSessionDescriptionInit): SessionDescription;
export {};
//# sourceMappingURL=SignalClient.d.ts.map
