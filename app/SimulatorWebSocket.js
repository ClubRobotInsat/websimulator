export default class SimulatorWebSocket {
  constructor(simulator, host, port) {
    this.simulator = simulator;

    this.serverUrl = `ws://${host}:${port}`;

    this.socket = new WebSocket(this.serverUrl);
    this.socket.onopen = (event) => this.onConnect(event);
    this.socket.onclose = (event) => this.onDisconnect(event);
    this.socket.onmessage = (event) => this.onMessage(event);
  }

  onConnect(event) {

  }

  onDisconnect(event) {


  }

  onMessage(event) {

  }
}
