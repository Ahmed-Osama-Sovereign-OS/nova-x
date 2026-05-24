/* ================================= */
/* NOVA X MAIN ENGINE v0.4 */
/* ================================= */

/* ================================= */
/* CREATE UNIVERSE */
/* ================================= */

const universe =
    new Universe();

/* ================================= */
/* PARTICLES */
/* ================================= */

const particles =
    new ParticleSystem(
        universe.scene
    );

/* ================================= */
/* QUANTUM */
/* ================================= */

const quantum =
    new QuantumEngine(
        universe.scene
    );

/* ================================= */
/* CONTROLS */
/* ================================= */

const controls =
    new Controls();

/* ================================= */
/* AI */
/* ================================= */

const ai =
    new AISystem(
        universe
    );

/* ================================= */
/* DISTORTION */
/* ================================= */

let distortion = 0;

/* ================================= */
/* ANIMATION LOOP */
/* ================================= */

function animate() {

    requestAnimationFrame(
        animate
    );

    /* TIME */

    const elapsed =

        performance.now() *

        controls.timeSpeed;

    /* DISTORTION */

    distortion =

        Math.sin(
            elapsed * 0.0007
        ) *

        controls.chaos *

        0.002;

    /* CAMERA SHAKE */

    universe.camera.rotation.z =
        distortion;

    universe.camera.position.x +=

        Math.sin(
            elapsed * 0.001
        ) * 0.003;

    universe.camera.position.y +=

        Math.cos(
            elapsed * 0.0012
        ) * 0.003;

    /* UPDATE SYSTEMS */

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
