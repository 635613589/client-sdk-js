import type TypedEmitter from 'typed-emitter';
import { Checker, CheckInfo, InstantiableCheck } from './checks/Checker';
export type { CheckInfo };
declare const ConnectionCheck_base: new () => TypedEmitter<ConnectionCheckCallbacks>;
export declare class ConnectionCheck extends ConnectionCheck_base {
    token: string;
    url: string;
    private checkResults;
    constructor(url: string, token: string);
    private getNextCheckId;
    private updateCheck;
    isSuccess(): boolean;
    getResults(): CheckInfo[];
    createAndRunCheck<T extends Checker>(check: InstantiableCheck<T>): Promise<CheckInfo>;
    checkWebsocket(): Promise<CheckInfo>;
    checkWebRTC(): Promise<CheckInfo>;
    checkTURN(): Promise<CheckInfo>;
    checkReconnect(): Promise<CheckInfo>;
    checkPublishAudio(): Promise<CheckInfo>;
    checkPublishVideo(): Promise<CheckInfo>;
}
declare type ConnectionCheckCallbacks = {
    checkUpdate: (id: number, info: CheckInfo) => void;
};
//# sourceMappingURL=ConnectionCheck.d.ts.map
