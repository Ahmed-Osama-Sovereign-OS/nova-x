/* ================================= */
/* NOVA X QUANTUM ENGINE */
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
                    (e.clientX / window.innerWidth - 0.5);

                this.mouse.y =
                    (e.clientY / window.innerHeight - 0.5);
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
    /* CREATE BURST */
    /* ================================= */

    createQuantumBurst() {

        const geometry =
            new THREE.RingGeometry(
                1,
                1.5,
                64
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x66ccff,

                transparent: true,

                opacity: 0.8,

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

            opacity: 0.8
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
                1.2,
                16,
                16
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                transparent: true,

                opacity: 0.9
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

            opacity: 0.9
        });
    }

    /* ================================= */
    /* UPDATE */
    /* ================================= */

    update(time, chaos) {

        /* WAVES */

        for (let i = this.waves.length - 1; i >= 0; i--) {

            const wave = this.waves[i];

            wave.scale += 0.15 + chaos * 0.01;

            wave.opacity -= 0.012;

            wave.mesh.scale.set(
                wave.scale,
                wave.scale,
                wave.scale
            );

            wave.mesh.material.opacity =
                wave.opacity;

            wave.mesh.rotation.z += 0.01;

            if (wave.opacity <= 0) {

                this.scene.remove(
                    wave.mesh
                );

                this.waves.splice(i, 1);
            }
        }

        /* FLASHES */

        for (let i = this.flashMeshes.length - 1; i >= 0; i--) {

            const flash =
                this.flashMeshes[i];

            flash.scale += 0.25;

            flash.opacity -= 0.03;

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
