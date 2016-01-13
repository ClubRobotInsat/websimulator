import $ from "jquery";
import Simulator from "./Simulator";

$(() => {
  const host = "localhost";
  const port = "5000";
  let simulator = new Simulator($("body"), host, port);
});
