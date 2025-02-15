import type TypedEmitter from 'typed-emitter';
import type { InternalRoomOptions, RoomConnectOptions, RoomOptions } from '../options';
import { DataPacket_Kind, DisconnectReason, ParticipantPermission } from '../proto/livekit_models';
import LocalParticipant from './participant/LocalParticipant';
import type Participant from './participant/Participant';
import type { ConnectionQuality } from './participant/Participant';
import RemoteParticipant from './participant/RemoteParticipant';
import RTCEngine from './RTCEngine';
import type LocalTrackPublication from './track/LocalTrackPublication';
import type RemoteTrack from './track/RemoteTrack';
import RemoteTrackPublication from './track/RemoteTrackPublication';
import { Track } from './track/Track';
import type { TrackPublication } from './track/TrackPublication';
export declare enum ConnectionState {
    Disconnected = "disconnected",
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting"
}
/** @deprecated RoomState has been renamed to [[ConnectionState]] */
export declare const RoomState: typeof ConnectionState;
declare const Room_base: new () => TypedEmitter<RoomEventCallbacks>;
/**
 * In LiveKit, a room is the logical grouping for a list of participants.
 * Participants in a room can publish tracks, and subscribe to others' tracks.
 *
 * a Room fires [[RoomEvent | RoomEvents]].
 *
 * @noInheritDoc
 */
declare class Room extends Room_base {
    state: ConnectionState;
    /** map of sid: [[RemoteParticipant]] */
    participants: Map<string, RemoteParticipant>;
    /**
     * list of participants that are actively speaking. when this changes
     * a [[RoomEvent.ActiveSpeakersChanged]] event is fired
     */
    activeSpeakers: Participant[];
    /** @internal */
    engine: RTCEngine;
    /** server assigned unique room id */
    sid: string;
    /** user assigned name, derived from JWT token */
    name: string;
    /** the current participant */
    localParticipant: LocalParticipant;
    /** room metadata */
    metadata: string | undefined;
    /** options of room */
    options: InternalRoomOptions;
    private _isRecording;
    private identityToSid;
    /** connect options of room */
    private connOptions?;
    private audioEnabled;
    private audioContext?;
    /** used for aborting pending connections to a LiveKit server */
    private abortController?;
    /** future holding client initiated connection attempt */
    private connectFuture?;
    /**
     * Creates a new Room, the primary construct for a LiveKit session.
     * @param options
     */
    constructor(options?: RoomOptions);
    private maybeCreateEngine;
    /**
     * getLocalDevices abstracts navigator.mediaDevices.enumerateDevices.
     * In particular, it handles Chrome's unique behavior of creating `default`
     * devices. When encountered, it'll be removed from the list of devices.
     * The actual default device will be placed at top.
     * @param kind
     * @returns a list of available local devices
     */
    static getLocalDevices(kind?: MediaDeviceKind, requestPermissions?: boolean): Promise<MediaDeviceInfo[]>;
    /**
     * prepares the connection to the livekit server by sending a HEAD request in order to
     * 1. speed up DNS resolution
     * 2. speed up TLS setup
     * on the actual connection request
     * throws an error if server is not reachable after the request timeout
     * @experimental
     */
    prepareConnection(url: string): Promise<void>;
    connect: (url: string, token: string, opts?: RoomConnectOptions) => Promise<void>;
    /**
     * disconnects the room, emits [[RoomEvent.Disconnected]]
     */
    disconnect: (stopTracks?: boolean) => Promise<void>;
    /**
     * retrieves a participant by identity
     * @param identity
     * @returns
     */
    getParticipantByIdentity(identity: string): Participant | undefined;
    private clearConnectionFutures;
    /**
     * if the current room has a participant with `recorder: true` in its JWT grant
     **/
    get isRecording(): boolean;
    /**
     * @internal for testing
     */
    simulateScenario(scenario: string): void;
    private onBeforeUnload;
    /**
     * Browsers have different policies regarding audio playback. Most requiring
     * some form of user interaction (click/tap/etc).
     * In those cases, audio will be silent until a click/tap triggering one of the following
     * - `startAudio`
     * - `getUserMedia`
     */
    startAudio(): Promise<void>;
    /**
     * Returns true if audio playback is enabled
     */
    get canPlaybackAudio(): boolean;
    /**
     * Returns the active audio output device used in this room.
     *
     * Note: to get the active `audioinput` or `videoinput` use [[LocalTrack.getDeviceId()]]
     *
     * @return the previously successfully set audio output device ID or an empty string if the default device is used.
     */
    getActiveAudioOutputDevice(): string;
    /**
     * Switches all active devices used in this room to the given device.
     *
     * Note: setting AudioOutput is not supported on some browsers. See [setSinkId](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId#browser_compatibility)
     *
     * @param kind use `videoinput` for camera track,
     *  `audioinput` for microphone track,
     *  `audiooutput` to set speaker for all incoming audio tracks
     * @param deviceId
     */
    switchActiveDevice(kind: MediaDeviceKind, deviceId: string): Promise<void>;
    private recreateEngine;
    private onTrackAdded;
    private handleRestarting;
    private handleRestarted;
    private handleDisconnect;
    private handleParticipantUpdates;
    private handleParticipantDisconnected;
    private handleActiveSpeakersUpdate;
    private handleSpeakersChanged;
    private handleStreamStateUpdate;
    private handleSubscriptionPermissionUpdate;
    private handleDataPacket;
    private handleAudioPlaybackStarted;
    private handleAudioPlaybackFailed;
    private handleDeviceChange;
    private handleRoomUpdate;
    private handleConnectionQualityUpdate;
    private acquireAudioContext;
    private createParticipant;
    private getOrCreateParticipant;
    private sendSyncState;
    /**
     * After resuming, we'll need to notify the server of the current
     * subscription settings.
     */
    private updateSubscriptions;
    private setAndEmitConnectionState;
    private emitWhenConnected;
    private onLocalParticipantMetadataChanged;
    private onLocalTrackMuted;
    private onLocalTrackUnmuted;
    private onLocalTrackPublished;
    private onLocalTrackUnpublished;
    private onLocalConnectionQualityChanged;
    private onMediaDevicesError;
    private onLocalParticipantPermissionsChanged;
    emit<E extends keyof RoomEventCallbacks>(event: E, ...args: Parameters<RoomEventCallbacks[E]>): boolean;
}
export default Room;
export declare type RoomEventCallbacks = {
    connected: () => void;
    reconnecting: () => void;
    reconnected: () => void;
    disconnected: (reason?: DisconnectReason) => void;
    /** @deprecated stateChanged has been renamed to connectionStateChanged */
    stateChanged: (state: ConnectionState) => void;
    connectionStateChanged: (state: ConnectionState) => void;
    mediaDevicesChanged: () => void;
    participantConnected: (participant: RemoteParticipant) => void;
    participantDisconnected: (participant: RemoteParticipant) => void;
    trackPublished: (publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
    trackSubscribed: (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
    trackSubscriptionFailed: (trackSid: string, participant: RemoteParticipant) => void;
    trackUnpublished: (publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
    trackUnsubscribed: (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => void;
    trackMuted: (publication: TrackPublication, participant: Participant) => void;
    trackUnmuted: (publication: TrackPublication, participant: Participant) => void;
    localTrackPublished: (publication: LocalTrackPublication, participant: LocalParticipant) => void;
    localTrackUnpublished: (publication: LocalTrackPublication, participant: LocalParticipant) => void;
    participantMetadataChanged: (metadata: string | undefined, participant: RemoteParticipant | LocalParticipant) => void;
    participantPermissionsChanged: (prevPermissions: ParticipantPermission, participant: RemoteParticipant | LocalParticipant) => void;
    activeSpeakersChanged: (speakers: Array<Participant>) => void;
    roomMetadataChanged: (metadata: string) => void;
    dataReceived: (payload: Uint8Array, participant?: RemoteParticipant, kind?: DataPacket_Kind) => void;
    connectionQualityChanged: (quality: ConnectionQuality, participant: Participant) => void;
    mediaDevicesError: (error: Error) => void;
    trackStreamStateChanged: (publication: RemoteTrackPublication, streamState: Track.StreamState, participant: RemoteParticipant) => void;
    trackSubscriptionPermissionChanged: (publication: RemoteTrackPublication, status: TrackPublication.PermissionStatus, participant: RemoteParticipant) => void;
    trackSubscriptionStatusChanged: (publication: RemoteTrackPublication, status: TrackPublication.SubscriptionStatus, participant: RemoteParticipant) => void;
    audioPlaybackChanged: (playing: boolean) => void;
    signalConnected: () => void;
    recordingStatusChanged: (recording: boolean) => void;
};
//# sourceMappingURL=Room.d.ts.map