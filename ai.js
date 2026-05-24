/* ================================= */
/* NOVA X AI SYSTEM v0.3 */
/* ================================= */

class AISystem {

    constructor(universe) {

        this.universe = universe;

        this.energyPulse = 0;

        this.drift = 0;

        this.noise =
            Math.random() * 1000;

        /* QUANTUM STATES */

        this.quantumState = 0;

        this.realityStress = 0;

        this.gravityShift = 1;

        this.timeFracture = 0;

        /* PORTALS */

        this.createPortals();
    }

    /* ================================= */
    /* PORTALS */
    /* ================================= */

    createPortals() {

        this.portals = [];

        for (let i = 0; i < 3; i++) {

            const geometry =
                new THREE.TorusGeometry(
                    8 + i * 4,
                    0.15,
                    16,
                    120
                );

            const material =
                new THREE.MeshBasicMaterial({

                    color:
                        i % 2 === 0
                            ? 0x00ccff
                            : 0xaa55ff,

                    transparent: true,

                    opacity: 0.15
                });

            const portal =
                new THREE.Mesh(
                    geometry,
                    material
                );

            portal.rotation.x =
                Math.random() * Math.PI;

            portal.rotation.y =
                Math.random() * Math.PI;

            this.universe.scene.add(
                portal
            );

            this.portals.push(
                portal
            );
        }
    }

    /* ================================= */
    /* QUANTUM LAWS */
    /* ================================= */

    updateQuantumLaws(time, controls) {

        /* REALITY STRESS */

        this.realityStress =

            Math.sin(
                time * 0.00015
            ) *

            controls.chaos;

        /* TIME FRACTURE */

        this.timeFracture =

            Math.cos(
                time * 0.0002
            ) * 0.5;

        /* GRAVITY SHIFT */

        this.gravityShift =

            1 +

            Math.sin(
                time * 0.0004
            ) * 0.3;

        /* QUANTUM STATE */

        this.quantumState =

            Math.sin(
                time * 0.0001
            );

        /* SCENE DISTORTION */

        this.universe.scene.rotation.x =

            Math.sin(
                time * 0.0003
            ) *

            0.02 *

            controls.chaos;

        this.universe.scene.rotation.y =

            Math.cos(
                time * 0.0002
            ) *

            0.02 *

            controls.chaos;

        /* CAMERA FRACTURE */

        this.universe.camera.position.x +=

            Math.sin(
                time * 0.001
            ) *

            this.realityStress *

            0.01;

        this.universe.camera.position.y +=

            Math.cos(
                time * 0.0012
            ) *

            this.realityStress *

            0.01;
    }

    /* ================================= */
    /* UPDATE */
    /* ================================= */

    update(time, controls) {

        /* QUANTUM LAWS */

        this.updateQuantumLaws(
            time,
            controls
        );

        /* ENERGY */

        this.energyPulse =

            Math.sin(
                time * 0.0015
            ) * 0.5;

        this.drift =

            Math.cos(
                time * 0.0008
            ) * 0.3;

        /* CORE COLOR */

        const hue =

            0.55 +

            Math.sin(
                time * 0.0004
            ) * 0.08;

        const color =
            new THREE.Color();

        color.setHSL(
            hue,
            1,
            0.6
        );

        this.universe.core.material.color =
            color;

        /* INNER CORE FLASH */

        this.universe.innerCore.material.opacity =

            0.6 +

            Math.sin(
                time * 0.006
            ) * 0.4;

        /* CORE OPACITY */

        this.universe.core.material.opacity =

            0.75 +

            Math.sin(
                time * 0.002
            ) * 0.2;

        /* CAMERA */

        this.universe.camera.position.z =

            60 +

            Math.sin(
                time * 0.0007
            ) * 3 +

            this.timeFracture * 2;

        /* ENERGY RINGS */

        this.universe.energyRing.material.opacity =

            0.25 +

            controls.energy * 0.03 +

            this.energyPulse * 0.2;

        this.universe.energyRing2.material.opacity =

            0.15 +

            controls.chaos * 0.03;

        /* FLOAT */

        this.universe.scene.position.y =

            Math.sin(
                time * 0.0006
            ) * 1.2;

        /* PORTALS */

        this.portals.forEach(
            (portal, index) => {

                portal.rotation.x +=

                    0.001 +

                    index * 0.0005 *

                    this.gravityShift;

                portal.rotation.y -=

                    0.0015 +

                    index * 0.0004;

                portal.rotation.z +=
                    0.0008;

                const pulse =

                    1 +

                    Math.sin(
                        time * 0.002 +
                        index
                    ) * 0.12;

                portal.scale.set(
                    pulse,
                    pulse,
                    pulse
                );

                portal.material.opacity =

                    0.08 +

                    Math.sin(
                        time * 0.003 +
                        index
                    ) * 0.05;
            }
        );
    }
}
