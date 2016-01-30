import "babel-polyfill";
import Simulator from "./Simulator";
import * as View from "./View";
import Vue from "vue";

View.ready(() => {
  View.getById("connect-btn").addEventListener("click", (event) => {
    event.preventDefault();
    let simulator = new Simulator(View.getById("host").value, View.getById("port").value);
  });
});
