// =========================
// ELEMENTS
// =========================

const traceImage = document.getElementById("traceImage");

const cameraFeed =
document.getElementById("cameraFeed");

const startCameraBtn =
document.getElementById("startCameraBtn");

const stopCameraBtn =
document.getElementById("stopCameraBtn");

const imageInput = document.getElementById("imageInput");

const removeBtn = document.getElementById("removeBtn");

const opacitySlider =
document.getElementById("opacitySlider");

const scaleSlider =
document.getElementById("scaleSlider");

const rotateLeft1 =
document.getElementById("rotateLeft1");

const rotateRight1 =
document.getElementById("rotateRight1");

const rotateLeft15 =
document.getElementById("rotateLeft15");

const rotateRight15 =
document.getElementById("rotateRight15");

const resetBtn =
document.getElementById("resetBtn");

const toast =
document.getElementById("toast");

// STATUS

const statusImageLock =
document.getElementById("statusImageLock");

const statusPanelLock =
document.getElementById("statusPanelLock");

const statusRotationLock =
document.getElementById("statusRotationLock");

const statusOpacity =
document.getElementById("statusOpacity");

// =========================
// STATE
// =========================

const state = {

    x: 0,
    y: 0,

    scale: 1,
    rotation: 0,

    opacity: 40,

    imageLocked: false,
    panelLocked: false,
    rotationLocked: false,

    traceMode: false,

    imageLoaded: false
};

// =========================
// TOAST
// =========================

let toastTimer = null;

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}

// =========================
// STATUS BAR
// =========================

function updateStatusBar(){

    statusImageLock.textContent =
        state.imageLocked
            ? "🔒 ON"
            : "🔒 OFF";

    statusPanelLock.textContent =
        state.panelLocked
            ? "📌 ON"
            : "📌 OFF";

    statusRotationLock.textContent =
        state.rotationLocked
            ? "🌍 ON"
            : "🌍 OFF";

    statusOpacity.textContent =
        `${state.opacity}%`;
}

// =========================
// IMAGE TRANSFORM
// =========================

function updateImage(){

    if(!state.imageLoaded) return;

    traceImage.style.opacity =
        state.opacity / 100;

    traceImage.style.transform = `
        translate(${state.x}px, ${state.y}px)
        scale(${state.scale})
        rotate(${state.rotation}deg)
    `;
}

// =========================
// SAVE
// =========================

function saveState(){

    localStorage.setItem(
        "tracear-state",
        JSON.stringify(state)
    );
}

// =========================
// LOAD
// =========================

function loadState(){

    const saved =
        localStorage.getItem(
            "tracear-state"
        );

    if(!saved) return;

    try{

        const parsed =
            JSON.parse(saved);

        Object.assign(
            state,
            parsed
        );

    }
    catch(err){

        console.error(err);

    }

}

// =========================
// AUTO FIT IMAGE
// =========================

function autoFitImage(){

    const vw = window.innerWidth;

    state.scale =
        (vw * 0.8) /
        traceImage.naturalWidth;

    state.x = 0;
    state.y = 0;

    updateImage();

}

// =========================
// IMAGE UPLOAD
// =========================

imageInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if(!file) return;

        const reader =
            new FileReader();

        reader.onload = e => {

            traceImage.src =
                e.target.result;

            traceImage.onload = () => {

                traceImage.style.display =
                    "block";

                state.imageLoaded = true;

                autoFitImage();

                saveState();

                showToast(
                    "Image Loaded"
                );

            };

        };

        reader.readAsDataURL(file);

    }
);

// =========================
// REMOVE IMAGE
// =========================

removeBtn.addEventListener(
    "click",
    () => {

        traceImage.src = "";

        traceImage.style.display =
            "none";

        state.imageLoaded = false;

        showToast(
            "Image Removed"
        );

        saveState();

    }
);

// =========================
// OPACITY
// =========================

opacitySlider.addEventListener(
    "input",
    () => {

        state.opacity =
            parseInt(
                opacitySlider.value
            );

        updateImage();

        updateStatusBar();

        saveState();

    }
);

// =========================
// SCALE
// =========================

scaleSlider.addEventListener(
    "input",
    () => {

        state.scale =
            parseInt(
                scaleSlider.value
            ) / 100;

        updateImage();

        saveState();

    }
);

// =========================
// ROTATION
// =========================

rotateLeft1.addEventListener(
    "click",
    () => {

        if(
            state.rotationLocked
        ) return;

        state.rotation -= 1;

        updateImage();

        saveState();

    }
);

rotateRight1.addEventListener(
    "click",
    () => {

        if(
            state.rotationLocked
        ) return;

        state.rotation += 1;

        updateImage();

        saveState();

    }
);

rotateLeft15.addEventListener(
    "click",
    () => {

        if(
            state.rotationLocked
        ) return;

        state.rotation -= 15;

        updateImage();

        saveState();

    }
);

rotateRight15.addEventListener(
    "click",
    () => {

        if(
            state.rotationLocked
        ) return;

        state.rotation += 15;

        updateImage();

        saveState();

    }
);

// =========================
// RESET
// OPTION B
// PRESERVE OPACITY
// =========================

resetBtn.addEventListener(
    "click",
    () => {

        state.x = 0;
        state.y = 0;

        state.rotation = 0;

        if(state.imageLoaded){

            autoFitImage();

        }

        updateImage();

        saveState();

        showToast(
            "View Reset"
        );

    }
);

// =========================
// WINDOW RESIZE
// =========================

window.addEventListener(
    "resize",
    () => {

        if(
            !state.imageLoaded
        ) return;

        updateImage();

    }
);

// =========================
// STARTUP
// =========================

loadState();

opacitySlider.value =
    state.opacity;

updateStatusBar();

showToast(
    "TraceAR Ready"
);

// =========================
// EXTRA ELEMENTS
// =========================

const controlPanel =
document.getElementById("controlPanel");

const panelHeader =
document.getElementById("panelHeader");

const panelContent =
document.getElementById("panelContent");

const panelToggle =
document.getElementById("panelToggle");

const panelLockBtn =
document.getElementById("panelLockBtn");

const imageLockBtn =
document.getElementById("imageLockBtn");

const rotationLockBtn =
document.getElementById("rotationLockBtn");

const traceModeBtn =
document.getElementById("traceModeBtn");

const fullscreenBtn =
document.getElementById("fullscreenBtn");

const minimizeBtn =
document.getElementById("minimizeBtn");

// =========================
// PANEL STATE
// =========================

let panelX = 20;
let panelY = 20;

let panelDragging = false;

let panelStartX = 0;
let panelStartY = 0;

// =========================
// IMAGE DRAGGING
// =========================

let imageDragging = false;

let imageStartX = 0;
let imageStartY = 0;

// =========================
// PANEL POSITION
// =========================

function updatePanelPosition(){

    controlPanel.style.left =
        panelX + "px";

    controlPanel.style.top =
        panelY + "px";
}

// =========================
// PANEL DRAG
// =========================

panelHeader.addEventListener(
    "mousedown",
    e => {

        if(state.panelLocked)
            return;

        panelDragging = true;

        panelStartX =
            e.clientX - panelX;

        panelStartY =
            e.clientY - panelY;
    }
);

document.addEventListener(
    "mousemove",
    e => {

        if(panelDragging){

            panelX =
                e.clientX -
                panelStartX;

            panelY =
                e.clientY -
                panelStartY;

            updatePanelPosition();
        }

        if(imageDragging){

            state.x =
                e.clientX -
                imageStartX;

            state.y =
                e.clientY -
                imageStartY;

            updateImage();
        }

    }
);

document.addEventListener(
    "mouseup",
    () => {

        panelDragging = false;
        imageDragging = false;

        savePanelPosition();

    }
);

// =========================
// IMAGE DRAG
// =========================

traceImage.addEventListener(
    "mousedown",
    e => {

        if(state.imageLocked)
            return;

        if(!state.imageLoaded)
            return;

        imageDragging = true;

        imageStartX =
            e.clientX - state.x;

        imageStartY =
            e.clientY - state.y;
    }
);

// =========================
// MOUSE WHEEL ZOOM
// =========================

document.addEventListener(
    "wheel",
    e => {

        if(state.imageLocked)
            return;

        if(!state.imageLoaded)
            return;

        e.preventDefault();

        const delta =
            e.deltaY > 0
            ? -0.05
            : 0.05;

        state.scale += delta;

        state.scale =
            Math.max(
                0.1,
                Math.min(
                    state.scale,
                    5
                )
            );

        scaleSlider.value =
            state.scale * 100;

        updateImage();

        saveState();

    },
    { passive:false }
);

// =========================
// PANEL LOCK
// =========================

panelLockBtn.addEventListener(
    "click",
    () => {

        state.panelLocked =
            !state.panelLocked;

        panelLockBtn.classList.toggle(
            "active-lock",
            state.panelLocked
        );

        updateStatusBar();

        saveState();

        showToast(
            state.panelLocked
            ? "Panel Locked"
            : "Panel Unlocked"
        );

    }
);

// =========================
// IMAGE LOCK
// =========================

imageLockBtn.addEventListener(
    "click",
    () => {

        state.imageLocked =
            !state.imageLocked;

        imageLockBtn.classList.toggle(
            "active-lock",
            state.imageLocked
        );

        updateStatusBar();

        saveState();

        showToast(
            state.imageLocked
            ? "Image Locked"
            : "Image Unlocked"
        );

    }
);

// =========================
// ROTATION LOCK
// =========================

rotationLockBtn.addEventListener(
    "click",
    () => {

        state.rotationLocked =
            !state.rotationLocked;

        rotationLockBtn.classList.toggle(
            "active-lock",
            state.rotationLocked
        );

        updateStatusBar();

        saveState();

        showToast(
            state.rotationLocked
            ? "Rotation Locked"
            : "Rotation Unlocked"
        );

    }
);

// =========================
// MINIMIZE PANEL
// =========================

minimizeBtn.addEventListener(
    "click",
    () => {

        controlPanel.classList.add(
            "minimized"
        );

        panelToggle.style.display =
            "block";

    }
);

panelToggle.addEventListener(
    "click",
    () => {

        controlPanel.classList.remove(
            "minimized"
        );

        panelToggle.style.display =
            "none";

    }
);

// =========================
// TRACE MODE
// =========================

traceModeBtn.addEventListener(
    "click",
    () => {

        state.traceMode =
            !state.traceMode;

        document.body.classList.toggle(
            "trace-mode",
            state.traceMode
        );

        if(state.traceMode){

            state.imageLocked = true;
            state.panelLocked = true;
            state.rotationLocked = true;

            updateStatusBar();

            showToast(
                "Trace Mode Enabled"
            );

        }else{

            showToast(
                "Trace Mode Disabled"
            );
        }

    }
);

// =========================
// FULLSCREEN
// =========================

fullscreenBtn.addEventListener(
    "click",
    async () => {

        try{

            if(
                !document.fullscreenElement
            ){

                await document
                    .documentElement
                    .requestFullscreen();

                showToast(
                    "Fullscreen On"
                );

            }else{

                await document
                    .exitFullscreen();

                showToast(
                    "Fullscreen Off"
                );

            }

        }
        catch(err){

            console.error(err);

        }

    }
);

// =========================
// PANEL SAVE
// =========================

function savePanelPosition(){

    localStorage.setItem(
        "tracear-panel",
        JSON.stringify({
            x:panelX,
            y:panelY
        })
    );

}

// =========================
// PANEL LOAD
// =========================

function loadPanelPosition(){

    const saved =
        localStorage.getItem(
            "tracear-panel"
        );

    if(!saved)
        return;

    try{

        const pos =
            JSON.parse(saved);

        panelX = pos.x;
        panelY = pos.y;

        updatePanelPosition();

    }
    catch(err){

        console.error(err);

    }

}

// =========================
// START PANEL
// =========================

loadPanelPosition();

updatePanelPosition();

// =========================
// CAMERA
// =========================

let cameraStream = null;

startCameraBtn.addEventListener(
    "click",
    async () => {

        try{

            cameraStream =
                await navigator
                .mediaDevices
                .getUserMedia({

                    video:{
                        facingMode:{
                            ideal:"environment"
                        }
                    }

                });

            cameraFeed.srcObject =
                cameraStream;

            showToast(
                "Camera Started"
            );

        }
        catch(err){

            console.error(err);

            showToast(
                "Camera Failed"
            );
        }

    }
);

stopCameraBtn.addEventListener(
    "click",
    () => {

        if(!cameraStream)
            return;

        cameraStream
            .getTracks()
            .forEach(
                track =>
                track.stop()
            );

        cameraFeed.srcObject =
            null;

        cameraStream = null;

        showToast(
            "Camera Stopped"
        );

    }
);
