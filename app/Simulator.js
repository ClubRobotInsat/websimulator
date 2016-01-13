import SimulatorWebSocket from "./SimulatorWebSocket";
import SimulatorGraphics from "./SimulatorGraphics";

export default class Simulator {
  constructor(element, host, port) {
    this.socket = new SimulatorWebSocket(this, host, port);
    this.graphics = new SimulatorGraphics(this, element);
  }
}
