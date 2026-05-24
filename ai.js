/* ================================= */
/* NOVA X AI SYSTEM */
/* ================================= */

class AISystem {

    constructor(universe) {

        this.universe = universe;

        this.energyPulse = 0;

        this.drift = 0;

        this.noise = Math.random() * 1000;
    }

    /* ================================= */
    /* UPDATE */
    /* ================================= */

    update(time, controls) {

        /* ENERGY PULSE */

        this.energyPulse =
            Math.sin(time * 0.0015) * 0.5;

        /* DRIFT */

        this.drift =
            Math.cos(time * 0.0008) * 0.3;

        /* CORE COLOR SHIFT */

        const hue =
            0.55 +
            Math.sin(time * 0.0004) * 0.08;

        const color =
            new THREE.Color();

        color.setHSL(
            hue,
            1,
            0.6
        );

        this.universe.core.material.color =
            color;

        /* CORE OPACITY */

        this.universe.core.material.opacity =
            0.7 +
            Math.sin(time * 0.002) * 0.2;

        /* CAMERA DRIFT */

        this.universe.camera.position.x =
            Math.sin(time * 0.0003) * 4;

        this.universe.camera.position.z =
            60 +
            Math.sin(time * 0.0007) * 3;

        /* ENERGY RING REACTION */

        this.universe.energyRing.material.opacity =
            0.25 +
            controls.energy * 0.03 +
            this.energyPulse * 0.2;

        this.universe.energyRing2.material.opacity =
            0.15 +
            controls.chaos * 0.02;

        /* CHAOS REACTION */

        this.universe.scene.rotation.z =
            Math.sin(time * 0.0002) *
            controls.chaos *
            0.01;

        /* FLOATING MOTION */

        this.universe.scene.position.y =
            Math.sin(time * 0.0006) * 1.2;
    }
}
