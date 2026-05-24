/* ================================= */
/* NOVA X MAIN ENGINE */
/* ================================= */

/* ================================= */
/* CREATE UNIVERSE */
/* ================================= */

const universe = new Universe();

/* ================================= */
/* PARTICLE SYSTEM */
/* ================================= */

const particles =
    new ParticleSystem(
        universe.scene
    );

/* ================================= */
/* QUANTUM ENGINE */
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
/* AI SYSTEM */
/* ================================= */

const ai =
    new AISystem(
        universe
    );

/* ================================= */
/* CLOCK */
/* ================================= */

const clock =
    new THREE.Clock();

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
