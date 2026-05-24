/* ================================= */
/* NOVA X QUANTUM ENGINE v0.2 */
/* ================================= */

class QuantumEngine {

    constructor(scene) {

        this.scene = scene;

        this.waves = [];

        this.flashMeshes = [];

        this.mouse = {
            x: 0,
            y: 0
        };

        this.setupEvents();
    }

    /* ================================= */
    /* EVENTS */
    /* ================================= */

    setupEvents() {

        window.addEventListener(
            "mousemove",
            (e) => {

                this.mouse.x =
                    (e.clientX /
                        window.innerWidth - 0.5);

                this.mouse.y =
                    (e.clientY /
                        window.innerHeight - 0.5);
            }
        );

        /* CLICK */

        window.addEventListener(
            "click",
            () => {

                this.createQuantumBurst();
            }
        );
    }

    /* ================================= */
    /* BURST */
    /* ================================= */

    createQuantumBurst() {

        /* MAIN WAVE */

        const geometry =
            new THREE.RingGeometry(
                1,
                1.8,
                128
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x66ccff,

                transparent: true,

                opacity: 1,

                side: THREE.DoubleSide
            });

        const ring =
            new THREE.Mesh(
                geometry,
                material
            );

        ring.position.set(

            this.mouse.x * 25,

            -this.mouse.y * 15,

            0
        );

        this.scene.add(ring);

        this.waves.push({

            mesh: ring,

            scale: 1,

            opacity: 1,

            rotation:
                Math.random() * Math.PI
        });

        /* SECOND WAVE */

        const geometry2 =
            new THREE.RingGeometry(
                0.5,
                1,
                128
            );

        const material2 =
            new THREE.MeshBasicMaterial({

                color: 0xaa55ff,

                transparent: true,

                opacity: 0.8,

                side: THREE.DoubleSide
            });

        const ring2 =
            new THREE.Mesh(
                geometry2,
                material2
            );

        ring2.position.copy(
            ring.position
        );

        this.scene.add(ring2);

        this.waves.push({

            mesh: ring2,

            scale: 1,

            opacity: 0.8,

            rotation:
                -Math.random() * Math.PI
        });

        /* FLASH */

        this.createFlash();
    }

    /* ================================= */
    /* FLASH */
    /* ================================= */

    createFlash() {

        const geometry =
            new THREE.SphereGeometry(
                1.5,
                32,
                32
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                transparent: true,

                opacity: 1
            });

        const flash =
            new THREE.Mesh(
                geometry,
                material
            );

        flash.position.set(

            this.mouse.x * 25,

            -this.mouse.y * 15,

            0
        );

        this.scene.add(flash);

        this.flashMeshes.push({

            mesh: flash,

            scale: 1,

            opacity: 1
        });
    }

    /* ================================= */
    /* UPDATE */
    /* ================================= */

    update(time, chaos) {

        /* WAVES */

        for (
            let i = this.waves.length - 1;
            i >= 0;
            i--
        ) {

            const wave =
                this.waves[i];

            wave.scale +=
                0.18 + chaos * 0.015;

            wave.opacity -=
                0.015;

            wave.mesh.scale.set(

                wave.scale,

                wave.scale,

                wave.scale
            );

            wave.mesh.material.opacity =
                wave.opacity;

            wave.mesh.rotation.z +=
                0.02 + wave.rotation * 0.002;

            if (wave.opacity <= 0) {

                this.scene.remove(
                    wave.mesh
                );

                this.waves.splice(i, 1);
            }
        }

        /* FLASHES */

        for (
            let i = this.flashMeshes.length - 1;
            i >= 0;
            i--
        ) {

            const flash =
                this.flashMeshes[i];

            flash.scale += 0.3;

            flash.opacity -= 0.04;

            flash.mesh.scale.set(

                flash.scale,

                flash.scale,

                flash.scale
            );

            flash.mesh.material.opacity =
                flash.opacity;

            if (flash.opacity <= 0) {

                this.scene.remove(
                    flash.mesh
                );

                this.flashMeshes.splice(i, 1);
            }
        }
    }
}
