export function ready(fn) {
  if(document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

export function hideConnectionDialog() {
  document.getElementById("connect").classList.add("hidden");
};

export function goodIp() {
  document.getElementById("connect-btn").classList.add("btn-success");
  document.getElementById("connect-btn").classList.remove("btn-danger");
  document.getElementById("bad-ip").classList.add("hidden");
};

export function badIp() {
  document.getElementById("connect-btn").classList.remove("btn-success");
  document.getElementById("connect-btn").classList.add("btn-danger");
  document.getElementById("bad-ip").classList.remove("hidden");
};

export function showInfos() {
  document.getElementById("infos").style.display = "block";
};

export function hideInfos() {
  document.getElementById("infos").style.display = "none";
};

export function disconnected() {
  document.getElementById("disconnected").style.display = "block";
};

export function addToConsole(string, color) {
  let parent = document.createElement("div");
  parent.innerHTML = `<span style="color: #${color.split("x")[1]}"> ${string}</span>`;
  document.getElementById("messages").appendChild(parent);
};
