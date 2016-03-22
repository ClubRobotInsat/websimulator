import SimulatorWebSocket from "./SimulatorWebSocket";
import SimulatorGraphics from "./SimulatorGraphics";
import World from "./World";
import WorldObject from "./WorldObject";

import * as ModelLoader from "./ModelLoader";
import * as View from "./View";

export default class Simulator {
    constructor(host, port, debug=false) {
        this.debug = debug;
        try {
            this.socket = new SimulatorWebSocket(this, host, port);
            if(this.debug) {
                View.hideConnectionDialog();
                this.graphics = new SimulatorGraphics(this);
                this.world = new World(this.graphics);
            } else {
                this.socket.runWhenConnected(() => {
                    View.hideConnectionDialog();
                    this.graphics = new SimulatorGraphics(this);
                    this.world = new World(this.graphics);
                });
            }
            
            View.goodIp();
        } catch (e) {
            View.badIp();
            throw e;
        }
    }
}
