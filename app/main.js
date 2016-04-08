import "babel-polyfill";
import Simulator from "./Simulator";
import * as View from "./View";

let debug = false;

View.ready(() => {
	View.getById("debug-btn").addEventListener("click", (event) => {
		debug = !debug;
		if(debug) {
			event.target.classList.add("btn-success");
			event.target.classList.remove("btn-danger");
			event.target.innerText = "ON";
		} else {
			event.target.classList.remove("btn-success");
			event.target.classList.add("btn-danger");
			event.target.innerText = "OFF";
		}
	});

    View.getById("connect-btn").addEventListener("click", (event) => {
        event.preventDefault();
        let simulator = new Simulator(View.getById("host").value, View.getById("port").value, debug);
        // if(debug) {
			window.simulator = simulator;
        // }
    });
	console.log("WebSimulator loaded successfully.");

});
