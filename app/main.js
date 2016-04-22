import "babel-polyfill";
import Simulator from "./Simulator";
import * as View from "./View";
import THREE from "three";

let debug = false;

View.ready(() => {
	window.addEventListener("keypress", function(e) {
		if (e.which == 96 || e.which == 126) {
			let cons = document.getElementById("console");
			if(cons.style.display == "block") cons.style.display = "none";
			else cons.style.display = "block";
		}
	});

	document.getElementById("debug-btn").addEventListener("click", (event) => {
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

	document.getElementById("connect-btn").addEventListener("click", (event) => {
		event.preventDefault();
		let simulator = new Simulator(document.getElementById("host").value, document.getElementById("port").value, debug);
		if(debug) {
			window.three = THREE;
			window.simulator = simulator;
		}
	});
	console.log("WebSimulator loaded successfully.");

});
