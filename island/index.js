let container = document.querySelector("#container");
let canvas = document.querySelector("#game-canvas");
let loadingContainer = document.querySelector("#loading-container");
let progressBarFull = document.querySelector("#progress-bar-full");

let buildUrl = "Build";
let loaderUrl = buildUrl + "/b3ecc1035ef9fc0d94678a985b03ff70.loader.js?v=1.23.17";
let config = {
    dataUrl: buildUrl + "/4bd3d8735ebc09e1bdb62892755732b3.data",
    frameworkUrl: buildUrl + "/9215fb67eb8bf4e00fb11c736c3723b0.framework.js?v=1.23.17",
    codeUrl: buildUrl + "/78910c84abac9226834f204e3f0112c4.wasm?v=1.23.17",
    streamingAssetsUrl: "StreamingAssets"
};

let script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
        loadingContainer.style.display = "none";
        canvas.focus();
    }).catch((message) => {
        alert(message);
    });
};

document.body.appendChild(script)

function closeInstantGame(){
    window.parent.closeInstantGame();
}

// Fix reload crash
window.onbeforeunload = function () {
    if (typeof unityInstance !== 'undefined') {
        unityInstance.Quit(() => {
            console.log("Unity instance destroyed on page unload.");
        });
    }
};
