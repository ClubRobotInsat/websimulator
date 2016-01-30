import SimulatorWebSocket from "./SimulatorWebSocket";
import SimulatorGraphics from "./SimulatorGraphics";
import World from "./World";
import WorldObject from "./WorldObject";

import * as ModelLoader from "./ModelLoader";
import * as View from "./View";

export default class Simulator {
  constructor(host, port) {
    try {
      this.socket = new SimulatorWebSocket(this, host, port);
      this.socket.runWhenConnected(() => {
        View.hideConnectionDialog();
        this.graphics = new SimulatorGraphics(this);
        this.world = new World(this.graphics);

        // ModelLoader.load("../models/test.dae").then((model) => {
        //   this.world.addObject(new WorldObject(1, model, 0x00FF00));
        // });

      });
      View.goodIp();
    } catch (e) {
      View.badIp();
      throw e;
    }
  }
}
