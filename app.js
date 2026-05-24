/* ================================= */
/* NOVA X MAIN ENGINE v0.5 */
/* ================================= */

const universe =
    new Universe();

const particles =
    new ParticleSystem(
        universe.scene
    );

const quantum =
    new QuantumEngine(
        universe.scene
    );

const controls =
    new Controls();

const ai =
    new AISystem(
        universe
    );

/* ================================= */
/* COLLAPSE SYSTEM */
/* ================================= */

let distortion = 0;

let collapseLevel = 0;

/* ================================= */
/* ANIMATE */
/* ================================= */

function animate() {

    requestAnimationFrame(
        animate
    );

    /* TIME */

    const elapsed =

        performance.now() *

        controls.timeSpeed;

    /* CHAOS */

    collapseLevel =

        controls.chaos *

        0.01;

    /* DISTORTION */

    distortion =

        Math.sin(
            elapsed * 0.0007
        ) *

        collapseLevel;

    /* CAMERA SHAKE */

    universe.camera.rotation.z =
        distortion;

    universe.camera.rotation.x =

        Math.sin(
            elapsed * 0.0004
        ) *

        collapseLevel *

        0.3;

    universe.camera.position.x +=

        Math.sin(
            elapsed * 0.001
        ) *

        collapseLevel *

        0.8;

    universe.camera.position.y +=

        Math.cos(
            elapsed * 0.0012
        ) *

        collapseLevel *

        0.8;

    /* SCENE COLLAPSE */

    universe.scene.rotation.z +=

        Math.sin(
            elapsed * 0.0002
        ) *

        collapseLevel *

        0.01;

    universe.scene.rotation.x +=

        Math.cos(
            elapsed * 0.00015
        ) *

        collapseLevel *

        0.005;

    /* CORE COLLAPSE */

    const collapsePulse =

        1 +

        Math.sin(
            elapsed * 0.008
        ) *

        collapseLevel *

        2;

    universe.core.scale.set(

        collapsePulse,

        collapsePulse,

        collapsePulse
    );

    universe.glow.material.opacity =

        0.08 +

        collapseLevel *

        0.25;

    /* COLOR INSTABILITY */

    const hue =

        0.55 +

        Math.sin(
            elapsed * 0.002
        ) *

        collapseLevel;

    const unstableColor =
        new THREE.Color();

    unstableColor.setHSL(
        hue,
        1,
        0.6
    );

    universe.core.material.color =
        unstableColor;

    /* UPDATE */

    universe.update(

        elapsed,

        controls.gravity,

        controls.energy
    );

    particles.update(

        elapsed,

        controls.gravity,

        controls.chaos
    );

    quantum.update(

        elapsed,

        controls.chaos
    );

    ai.update(

        elapsed,

        controls
    );

    /* RENDER */

    universe.render();
}

/* ================================= */
/* START */
/* ================================= */

animate();
