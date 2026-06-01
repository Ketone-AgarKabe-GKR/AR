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
// IMAGE TRANSFORM (OPTIMIZED)
// =========================

let isRenderPending = false;

function updateImage(){

    if(!state.imageLoaded) return;
    
    if(!isRenderPending) {
        isRenderPending = true;
        
        requestAnimationFrame(() => {
            traceImage.style.opacity =
                state.opacity / 100;

            traceImage.style.transform = `
                translate(${state.x}px, ${state.y}px)
                scale(${state.scale})
                rotate(${state.rotation}deg)
            `;
            
            isRenderPending = false;
        });
    }
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
// (Removed X/Y coordinates as Island is fixed to top center)
// =========================

// =========================
// IMAGE DRAGGING & MULTI-TOUCH
// =========================

let activePointers = new Map();
let lastCentroid = { x: 0, y: 0 };

function getCentroid(pointersMap) {
    let x = 0, y = 0;
    pointersMap.forEach(pointer => {
        x += pointer.clientX;
        y += pointer.clientY;
    });
    return {
        x: x / pointersMap.size,
        y: y / pointersMap.size
    };
}

traceImage.addEventListener(
    "pointerdown",
    e => {

        if(state.imageLocked)
            return;

        if(!state.imageLoaded)
            return;

        activePointers.set(e.pointerId, e);
        traceImage.setPointerCapture(e.pointerId);
        
        lastCentroid = getCentroid(activePointers);
    }
);

document.addEventListener(
    "pointermove",
    e => {

        if(activePointers.has(e.pointerId)) {
            
            activePointers.set(e.pointerId, e);
            
            const currentCentroid = getCentroid(activePointers);
            
            state.x += (currentCentroid.x - lastCentroid.x);
            state.y += (currentCentroid.y - lastCentroid.y);
            
            lastCentroid = currentCentroid;
            
            updateImage();
        }

    }
);

const releasePointer = e => {
    
    if(activePointers.has(e.pointerId)) {
        
        activePointers.delete(e.pointerId);
        
        if(activePointers.size === 0) {
            saveState();
        } else {
            lastCentroid = getCentroid(activePointers);
        }
    }
};

document.addEventListener("pointerup", releasePointer);
document.addEventListener("pointercancel", releasePointer);

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

/// =========================
// MINIMIZE PANEL (Dynamic Island Logic)
// =========================

minimizeBtn.addEventListener(
    "click",
    (e) => {
        
        e.stopPropagation();

        if(state.panelLocked) {
            showToast("Panel is Locked Open");
            return;
        }

        controlPanel.classList.add(
            "minimized"
        );

        panelToggle.style.display =
            "block";

    }
);

// Backup Toggle Button just in case
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
// DYNAMIC ISLAND DRAG & CLICK LOGIC
// =========================

let panelX = window.innerWidth / 2 - 70; // Starts centered horizontally
let panelY = 20;
let isPanelDragging = false;
let hasDragged = false;
let panelStartX = 0;
let panelStartY = 0;

// Set initial position
controlPanel.style.left = panelX + "px";
controlPanel.style.top = panelY + "px";

panelHeader.addEventListener("pointerdown", e => {
    
    // NEW: Ignore the drag if you are clicking a button (Minimize or Lock)
    if(e.target.closest('.headerButtons')) return;

    if(state.panelLocked) return;
    
    isPanelDragging = true;
    hasDragged = false; // Reset drag tracker
    panelHeader.setPointerCapture(e.pointerId);

    panelStartX = e.clientX - panelX;
    panelStartY = e.clientY - panelY;
});
panelHeader.addEventListener("pointermove", e => {
    
    if(!isPanelDragging) return;

    const newX = e.clientX - panelStartX;
    const newY = e.clientY - panelStartY;

    // If the finger moved more than 4 pixels, it's a drag, not a tap
    if (Math.abs(newX - panelX) > 4 || Math.abs(newY - panelY) > 4) {
        hasDragged = true;
    }

    panelX = newX;
    panelY = newY;

    controlPanel.style.left = panelX + "px";
    controlPanel.style.top = panelY + "px";
});

panelHeader.addEventListener("pointerup", e => {
    
    isPanelDragging = false;
    panelHeader.releasePointerCapture(e.pointerId);

    // If we just tapped (didn't drag), expand the island!
    if (!hasDragged) {
        if (controlPanel.classList.contains("minimized")) {
            controlPanel.classList.remove("minimized");
            panelToggle.style.display = "none";
        }
    }
    
    // Save position so it remembers where you put it
    localStorage.setItem("tracear-panel", JSON.stringify({ x: panelX, y: panelY }));
});

// Load saved position on startup
const savedPanel = localStorage.getItem("tracear-panel");
if(savedPanel) {
    try {
        const pos = JSON.parse(savedPanel);
        panelX = pos.x;
        panelY = pos.y;
        controlPanel.style.left = panelX + "px";
        controlPanel.style.top = panelY + "px";
    } catch(e) {}
}
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
// PRECISION D-PAD
// =========================

const nudgeSpeed = 12;

function nudgeImage(dx, dy) {
    if(state.imageLocked) return;
    if(!state.imageLoaded) return;
    
    state.x += dx;
    state.y += dy;
    
    updateImage();
    saveState();
}

document.getElementById("nudgeUp").addEventListener(
    "click", () => nudgeImage(0, -nudgeSpeed)
);
document.getElementById("nudgeDown").addEventListener(
    "click", () => nudgeImage(0, nudgeSpeed)
);
document.getElementById("nudgeLeft").addEventListener(
    "click", () => nudgeImage(-nudgeSpeed, 0)
);
document.getElementById("nudgeRight").addEventListener(
    "click", () => nudgeImage(nudgeSpeed, 0)
);

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

// Restore UI lock states on load
if(state.panelLocked) panelLockBtn.classList.add("active-lock");
if(state.imageLocked) imageLockBtn.classList.add("active-lock");
if(state.rotationLocked) rotationLockBtn.classList.add("active-lock");
