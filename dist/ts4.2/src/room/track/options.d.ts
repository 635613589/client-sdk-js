import type { Track } from './Track';
export interface TrackPublishDefaults {
    /**
     * encoding parameters for camera track
     */
    videoEncoding?: VideoEncoding;
    /**
     * @experimental
     */
    backupCodec?: {
        codec: BackupVideoCodec;
        encoding: VideoEncoding;
    } | false;
    /**
     * encoding parameters for screen share track
     */
    screenShareEncoding?: VideoEncoding;
    /**
     * codec, defaults to vp8; for svc codecs, auto enable vp8
     * as backup. (TBD)
     */
    videoCodec?: VideoCodec;
    /**
     * max audio bitrate, defaults to [[AudioPresets.speech]]
     */
    audioBitrate?: number;
    /**
     * dtx (Discontinuous Transmission of audio), defaults to true
     */
    dtx?: boolean;
    /**
     * red (Redundant Audio Data), defaults to true
     */
    red?: boolean;
    /**
     * stereo audio track. defaults determined by capture channel count.
     */
    forceStereo?: boolean;
    /**
     * use simulcast, defaults to true.
     * When using simulcast, LiveKit will publish up to three versions of the stream
     * at various resolutions.
     */
    simulcast?: boolean;
    /**
     * scalability mode for svc codecs, defaults to 'L3T3'.
     * for svc codecs, simulcast is disabled.
     */
    scalabilityMode?: ScalabilityMode;
    /**
     * custom video simulcast layers for camera tracks, defaults to h180, h360, h540
     * You can specify up to two custom layers that will be used instead of
     * the LiveKit default layers.
     * Note: the layers need to be ordered from lowest to highest quality
     */
    videoSimulcastLayers?: Array<VideoPreset>;
    /**
     * custom video simulcast layers for screen tracks
     * Note: the layers need to be ordered from lowest to highest quality
     */
    screenShareSimulcastLayers?: Array<VideoPreset>;
    /**
     * For local tracks, stop the underlying MediaStreamTrack when the track is muted (or paused)
     * on some platforms, this option is necessary to disable the microphone recording indicator.
     * Note: when this is enabled, and BT devices are connected, they will transition between
     * profiles (e.g. HFP to A2DP) and there will be an audible difference in playback.
     *
     * defaults to false
     */
    stopMicTrackOnMute?: boolean;
}
/**
 * Options when publishing tracks
 */
export interface TrackPublishOptions extends TrackPublishDefaults {
    /**
     * set a track name
     */
    name?: string;
    /**
     * Source of track, camera, microphone, or screen
     */
    source?: Track.Source;
}
export interface CreateLocalTracksOptions {
    /**
     * audio track options, true to create with defaults. false if audio shouldn't be created
     * default true
     */
    audio?: boolean | AudioCaptureOptions;
    /**
     * video track options, true to create with defaults. false if video shouldn't be created
     * default true
     */
    video?: boolean | VideoCaptureOptions;
}
export interface VideoCaptureOptions {
    /**
     * A ConstrainDOMString object specifying a device ID or an array of device
     * IDs which are acceptable and/or required.
     */
    deviceId?: ConstrainDOMString;
    /**
     * a facing or an array of facings which are acceptable and/or required.
     */
    facingMode?: 'user' | 'environment' | 'left' | 'right';
    resolution?: VideoResolution;
}
export interface ScreenShareCaptureOptions {
    /**
     * true to capture audio shared. browser support for audio capturing in
     * screenshare is limited: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#browser_compatibility
     */
    audio?: boolean | AudioCaptureOptions;
    /** capture resolution, defaults to full HD */
    resolution?: VideoResolution;
}
export interface AudioCaptureOptions {
    /**
     * specifies whether automatic gain control is preferred and/or required
     */
    autoGainControl?: ConstrainBoolean;
    /**
     * the channel count or range of channel counts which are acceptable and/or required
     */
    channelCount?: ConstrainULong;
    /**
     * A ConstrainDOMString object specifying a device ID or an array of device
     * IDs which are acceptable and/or required.
     */
    deviceId?: ConstrainDOMString;
    /**
     * whether or not echo cancellation is preferred and/or required
     */
    echoCancellation?: ConstrainBoolean;
    /**
     * the latency or range of latencies which are acceptable and/or required.
     */
    latency?: ConstrainDouble;
    /**
     * whether noise suppression is preferred and/or required.
     */
    noiseSuppression?: ConstrainBoolean;
    /**
     * the sample rate or range of sample rates which are acceptable and/or required.
     */
    sampleRate?: ConstrainULong;
    /**
     * sample size or range of sample sizes which are acceptable and/or required.
     */
    sampleSize?: ConstrainULong;
}
export interface AudioOutputOptions {
    /**
     * deviceId to output audio
     *
     * Only supported on browsers where `setSinkId` is available
     */
    deviceId?: string;
}
export interface VideoResolution {
    width: number;
    height: number;
    frameRate?: number;
    aspectRatio?: number;
}
export interface VideoEncoding {
    maxBitrate: number;
    maxFramerate?: number;
}
export declare class VideoPreset {
    encoding: VideoEncoding;
    width: number;
    height: number;
    constructor(width: number, height: number, maxBitrate: number, maxFramerate?: number);
    get resolution(): VideoResolution;
}
export interface AudioPreset {
    maxBitrate: number;
}
declare const codecs: readonly [
    "vp8",
    "h264",
    "av1"
];
declare const backupCodecs: readonly [
    "vp8",
    "h264"
];
export declare type VideoCodec = typeof codecs[number];
export declare type BackupVideoCodec = typeof backupCodecs[number];
export declare function isBackupCodec(codec: string): codec is BackupVideoCodec;
/**
 * scalability modes for svc, only supprot l3t3 now.
 */
export declare type ScalabilityMode = 'L3T3';
export declare namespace AudioPresets {
    const telephone: AudioPreset;
    const speech: AudioPreset;
    const music: AudioPreset;
    const musicStereo: AudioPreset;
    const musicHighQuality: AudioPreset;
    const musicHighQualityStereo: AudioPreset;
}
/**
 * Sane presets for video resolution/encoding
 */
export declare const VideoPresets: {
    readonly h90: VideoPreset;
    readonly h180: VideoPreset;
    readonly h216: VideoPreset;
    readonly h360: VideoPreset;
    readonly h540: VideoPreset;
    readonly h720: VideoPreset;
    readonly h1080: VideoPreset;
    readonly h1440: VideoPreset;
    readonly h2160: VideoPreset;
};
/**
 * Four by three presets
 */
export declare const VideoPresets43: {
    readonly h120: VideoPreset;
    readonly h180: VideoPreset;
    readonly h240: VideoPreset;
    readonly h360: VideoPreset;
    readonly h480: VideoPreset;
    readonly h540: VideoPreset;
    readonly h720: VideoPreset;
    readonly h1080: VideoPreset;
    readonly h1440: VideoPreset;
};
export declare const ScreenSharePresets: {
    readonly h360fps3: VideoPreset;
    readonly h720fps5: VideoPreset;
    readonly h720fps15: VideoPreset;
    readonly h1080fps15: VideoPreset;
    readonly h1080fps30: VideoPreset;
};
export {};
//# sourceMappingURL=options.d.ts.map
