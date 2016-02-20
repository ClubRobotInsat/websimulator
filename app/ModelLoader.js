import ColladaLoader from "../vendor/ColladaLoader";

let loader = new ColladaLoader();
loader.options.convertUpAxis = true;

export let load = (path) => {
    return new Promise(function(resolve, reject) {
        try {
            loader.load(path, (model) => {
                resolve(model.dae.geometries[Object.keys(model.dae.geometries)[0]].mesh.geometry3js);
            });
        } catch(e) {
            reject(e);
        }
    });
};
