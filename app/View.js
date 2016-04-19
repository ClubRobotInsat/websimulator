export function ready(fn) {
    if(document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

export function getById(i) {
    return document.getElementById(i);
};

export function getByClass(c) {
    return Array.prototype.slice.call(document.getElementsByClassName(c));
};

export function hideConnectionDialog() {
    getById("connect").classList.add("hidden");
};

export function goodIp() {
    getById("connect-btn").classList.add("btn-success");
    getById("connect-btn").classList.remove("btn-danger");
    getById("bad-ip").classList.add("hidden");
};

export function badIp() {
    getById("connect-btn").classList.remove("btn-success");
    getById("connect-btn").classList.add("btn-danger");
    getById("bad-ip").classList.remove("hidden");
};

export function showInfos() {
    getById("infos").style.display = "block";
};

export function hideInfos() {
    getById("infos").style.display = "none";
};

export function disconnected() {
    getById("disconnected").style.display = "block";
};

export function addToConsole(string) {
  let parent = document.createElement("div");
  let node = document.createTextNode(string);
  parent.appendChild(node);
  getById("messages").appendChild(parent);
};
