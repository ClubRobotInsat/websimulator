import THREE from "three";
import WorldObject from "./WorldObject";

import * as View from "./View";
import * as ModelLoader from "./ModelLoader";


export default class SimulatorWebSocket {
    constructor(simulator, host, port) {
        this.simulator = simulator;

        this.serverUrl = `ws://${host}:${port}`;
        this.connected = false;
        this.error = false;

        this.socket = new WebSocket(this.serverUrl);

        this.socket.onopen = (event) => this.onConnect(event);
        this.socket.onclose = (event) => this.onDisconnect(event);
        this.socket.onmessage = (event) => this.onMessage(event);
        this.socket.onerror = (event) => this.onError(event);
    }

    runWhenConnected(callback=()=>{}) {
        setTimeout(() => {
            if(this.socket.readyState == 1) {
                callback();
            } else {
                if(!this.connected && ! this.error) this.runWhenConnected(callback);
            }
        }, 5);
    }

    onConnect(event) {
        View.goodIp();
        this.connected = true;
    }


    onDisconnect(event) {
        if(this.connected)
            View.disconnected();
    }

    onMessage(event) {
        let messages = JSON.parse(event.data);
        for (let message of messages) {
            let type = message["type"];
            let id = message["id"];
            if(!type) {
                console.error("Bad message pattern : missing type.");
            } else if(!id) {
                console.error("Bad message pattern : missing id.");
            } else {
                this.simulator.world.handleMessage(type, id, message);
            }
        }
    }

    onError(event) {
        View.badIp();
        this.error = true;
    }
}
