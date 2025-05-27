document.addEventListener('DOMContentLoaded', function () {
    const prisonRealm = document.getElementById('prisonRealm');
    const openState = document.getElementById('openState');
    const cubeFaces = document.querySelectorAll('.cubeface');
    const blindfoldedIdiot = document.getElementById('blindfoldedIdiot');
    const gojoToggle = document.getElementById('gojoToggle');
    const transformToggle = document.getElementById('transformToggle');
    const prisonRealmContainer = document.getElementById('prisonRealmContainer');
    const controlAngle = document.getElementById('controlAngle');

    const infoContainer = document.getElementById('info');
    const infoButton = document.getElementById("infoButton");
    const closeButton = document.getElementById("closeButton");

    const angleRadios = document.querySelectorAll('input[name="controlAngle"]');
    const cycleAnglesButtonR = document.getElementById('cycleAnglesButtonR');
    const cycleAnglesButtonL = document.getElementById('cycleAnglesButtonL');
    let timeoutId;
    let gojoTimeoutId;

    // CONTROL ANGLES
    function controlAngleControls() {
        if (prisonRealm.classList.contains('transformState') || prisonRealm.classList.contains('gojoState')) {
            controlAngle.classList.add('disabledIndicator');
        } else {
            controlAngle.classList.remove('disabledIndicator');
        }
    }

    controlAngleControls();

    const resetToggle = document.getElementById('resetToggle');
    if (resetToggle) {
        resetToggle.checked = true;
    }

    // angle button cycling
    function getCheckedAngleIndex() {
        return [...angleRadios].findIndex(radio => radio.checked);
    }

    function cycleAngles(forward = true) {
        let currentIndex = getCheckedAngleIndex();
        if (currentIndex === -1) return;

        let nextIndex;
        if (forward) {
            nextIndex = (currentIndex + 1) % angleRadios.length;
        } else {
            nextIndex = (currentIndex - 1 + angleRadios.length) % angleRadios.length;
        }

        angleRadios[nextIndex].checked = true;
        updatePrisonRealmAngle(angleRadios[nextIndex].id);
    }

    function updatePrisonRealmAngle(angleClass) {
        prisonRealm.classList.remove('angle1', 'angle2', 'angle3', 'angle4', 'angle5', 'angle6');
        prisonRealm.classList.add(angleClass);
    }

    cycleAnglesButtonR.addEventListener('click', function () {
        cycleAngles(true);
    });

    cycleAnglesButtonL.addEventListener('click', function () {
        cycleAngles(false);
    });

    // initialize to ensure the first angle is applied
    updatePrisonRealmAngle(angleRadios[0].id);

    // handle radio button changes
    angleRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                updatePrisonRealmAngle(radio.id);
            }
        });
    });

    // INFOTOGGLE
    function toggleInfo() {
        infoContainer.classList.toggle("closed");
    }
    infoButton.addEventListener("click", toggleInfo);
    closeButton.addEventListener("click", toggleInfo);

    // TRANSFORMTOGGLE
    function toggleTransform() {
        prisonRealm.classList.add('transformState');
        cubeFaces.forEach(face => face.classList.add('transformState'));
        if (openState) openState.classList.add('transformState');
        controlAngleControls();

        timeoutId = setTimeout(() => {
            prisonRealm.classList.add('closedState');
            prisonRealm.classList.remove('transformState');
            cubeFaces.forEach(face => face.classList.add('closedState'));
            document.body.classList.add('closedState');
            if (openState) openState.classList.remove('transformState');
            controlAngleControls();

        }, 9000); // the initial delay before adding .closedState
    }

    transformToggle.addEventListener('change', toggleTransform);

    // GOJOTOGGLE
    gojoToggle.addEventListener('change', function () {
        if (prisonRealm.classList.contains('closedState')) {
            blindfoldedIdiot.classList.add('transformState');
    
            gojoTimeoutId = setTimeout(() => {
                prisonRealm.classList.add('gojoState');
                prisonRealmContainer.classList.add('gojoState');
                cubeFaces.forEach(face => face.classList.add('gojoState'));
                document.body.classList.add('gojoState');
                document.querySelector("header").classList.add('darkenUi');
    
                // Select specific cube faces
                const targetFaces = ['#cubeFace1', '#cubeFace4', '#cubeFace5'];
                targetFaces.forEach(selector => {
                    const face = document.querySelector(selector);
                    const backgroundImgLayer = face ? face.querySelector('.backgroundImgLayer') : null; // Find the .backgroundImgLayer child element
    
                    if (backgroundImgLayer) {
                        // Apply background images to .backgroundImgLayer child elements
                        if (selector === '#cubeFace1') {
                            backgroundImgLayer.style.backgroundImage = 'url(https://nariesu.com/prison_realm/images/gojoCubeFace1_Animation.webp)';
                        } else if (selector === '#cubeFace4') {
                            backgroundImgLayer.style.backgroundImage = 'url(https://nariesu.com/prison_realm/images/gojoCubeFace4_Animation.webp)';
                        } else if (selector === '#cubeFace5') {
                            backgroundImgLayer.style.backgroundImage = 'url(https://nariesu.com/prison_realm/images/gojoCubeFace5_Animation.webp)';
                        }
    
                        void face.offsetWidth; // Force reflow
                        backgroundImgLayer.classList.add('gojoStateAnimate');
                    }
                });
    
                setTimeout(() => {
                    targetFaces.forEach(selector => {
                        const face = document.querySelector(selector);
                        const backgroundImgLayer = face ? face.querySelector('.backgroundImgLayer') : null; // Find the .backgroundImgLayer child element
                        if (backgroundImgLayer) backgroundImgLayer.classList.remove('gojoStateAnimate');
                    });
                }, 3500);
    
                controlAngleControls();
            }, 15000);
        } else {
            toggleTransform();
            blindfoldedIdiot.classList.add('gojoState');
    
            gojoTimeoutId = setTimeout(() => {
                prisonRealm.classList.add('gojoState');
                prisonRealmContainer.classList.add('gojoState');
                cubeFaces.forEach(face => face.classList.add('gojoState'));
                document.body.classList.add('gojoState');
                document.querySelector("header").classList.add('darkenUi');
    
                // Select specific cube faces
                const targetFaces = ['#cubeFace1', '#cubeFace4', '#cubeFace5'];
                targetFaces.forEach(selector => {
                    const face = document.querySelector(selector);
                    const backgroundImgLayer = face ? face.querySelector('.backgroundImgLayer') : null; // Find the .backgroundImgLayer child element
    
                    if (backgroundImgLayer) {
                        // Apply background images to .backgroundImgLayer child elements
                        if (selector === '#cubeFace1') {
                            backgroundImgLayer.style.backgroundImage = 'url(https://nariesu.com/prison_realm/images/gojoCubeFace1_Animation.webp)';
                        } else if (selector === '#cubeFace4') {
                            backgroundImgLayer.style.backgroundImage = 'url(https://nariesu.com/prison_realm/images/gojoCubeFace4_Animation.webp)';
                        } else if (selector === '#cubeFace5') {
                            backgroundImgLayer.style.backgroundImage = 'url(https://nariesu.com/prison_realm/images/gojoCubeFace5_Animation.webp)';
                        }
    
                        void face.offsetWidth; // Force reflow
                        backgroundImgLayer.classList.add('gojoStateAnimate');
                    }
                });
    
                setTimeout(() => {
                    targetFaces.forEach(selector => {
                        const face = document.querySelector(selector);
                        const backgroundImgLayer = face ? face.querySelector('.backgroundImgLayer') : null; // Find the .backgroundImgLayer child element
                        if (backgroundImgLayer) backgroundImgLayer.classList.remove('gojoStateAnimate');
                    });
                }, 3500);
    
                controlAngleControls();
            }, 15000);
        }
    });

    resetToggle.addEventListener('change', function () {
        clearTimeout(timeoutId);
        clearTimeout(gojoTimeoutId);
    
        prisonRealm.classList.remove('transformState', 'closedState', 'gojoState', 'angle1', 'angle2', 'angle3', 'angle4', 'angle5', 'angle6');
        openState.classList.remove('transformState', 'closedState');
        blindfoldedIdiot.classList.remove('transformState', 'gojoState');
        cubeFaces.forEach(face => face.classList.remove('transformState', 'closedState', 'gojoState'));
        document.body.classList.remove('transformState', 'closedState', 'gojoState');
        document.querySelector("header").classList.remove('darkenUi');
        prisonRealmContainer.classList.remove('gojoState');
    
        const targetFaces = ['#cubeFace1', '#cubeFace4', '#cubeFace5'];
        targetFaces.forEach(selector => {
            const face = document.querySelector(selector);
            const backgroundImgLayer = face ? face.querySelector('.backgroundImgLayer') : null;
    
            if (backgroundImgLayer) {
                backgroundImgLayer.style.backgroundImage = '';
    
                backgroundImgLayer.classList.remove('gojoStateAnimate');
            }
        });
    
        controlAngleControls();
    });
});
