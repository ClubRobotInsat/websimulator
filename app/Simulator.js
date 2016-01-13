import SimulatorWebSocket from "./SimulatorWebSocket";

export default class Simulator {
  constructor(element, host, port) {
    this.socket = new SimulatorWebSocket(this, host, port);
  }
}
