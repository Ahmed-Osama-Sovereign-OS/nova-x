/* ================================= */
/* NOVA X PARTICLE SYSTEM v0.5 */
/* ================================= */

class ParticleSystem {

    constructor(scene) {

        this.scene = scene;

        this.mouseX = 0;
        this.mouseY = 0;

        this.createParticles();

        this.createConnections();

        this.createNeuralField();

        this.createBlackHole();

        this.setupMouse();
    }

    /* ================================= */
    /* PARTICLES */
    /* ================================= */

    createParticles() {

        const count = 2500;

        const geometry =
            new THREE.BufferGeometry();

        const positions = [];
        const colors = [];

        this.originalPositions = [];

        for (let i = 0; i < count; i++) {

            const x =
                (Math.random() - 0.5) * 320;

            const y =
                (Math.random() - 0.5) * 320;

            const z =
                (Math.random() - 0.5) * 320;

            positions.push(x, y, z);

            this.originalPositions.push(
                x,
                y,
                z
            );

            const blue =
                0.6 + Math.random() * 0.4;

            const purple =
                0.3 + Math.random() * 0.5;

            colors.push(
                0.2,
                blue,
                purple
            );
        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                positions,
                3
            )
        );

        geometry.setAttribute(

            "color",

            new THREE.Float32BufferAttribute(
                colors,
                3
            )
        );

        const material =
            new THREE.PointsMaterial({

                size: 0.28,

                vertexColors: true,

                transparent: true,

                opacity: 1,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false
            });

        this.points =
            new THREE.Points(
                geometry,
                material
            );

        this.scene.add(
            this.points
        );
    }

    /* ================================= */
    /* CONNECTIONS */
    /* ================================= */

    createConnections() {

        const geometry =
            new THREE.BufferGeometry();

        const vertices = [];

        for (let i = 0; i < 500; i++) {

            vertices.push(

                (Math.random() - 0.5) * 220,
                (Math.random() - 0.5) * 220,
                (Math.random() - 0.5) * 220
            );

            vertices.push(

                (Math.random() - 0.5) * 220,
                (Math.random() - 0.5) * 220,
                (Math.random() - 0.5) * 220
            );
        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                vertices,
                3
            )
        );

        const material =
            new THREE.LineBasicMaterial({

                color: 0x33ccff,

                transparent: true,

                opacity: 0.06
            });

        this.lines =
            new THREE.LineSegments(
                geometry,
                material
            );

        this.scene.add(
            this.lines
        );
    }

    /* ================================= */
    /* NEURAL FIELD */
    /* ================================= */

    createNeuralField() {

        const geometry =
            new THREE.TorusKnotGeometry(
                12,
                0.25,
                180,
                24
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x66ccff,

                wireframe: true,

                transparent: true,

                opacity: 0.12
            });

        this.neuralField =
            new THREE.Mesh(
                geometry,
                material
            );

        this.scene.add(
            this.neuralField
        );
    }

    /* ================================= */
    /* BLACK HOLE */
    /* ================================= */

    createBlackHole() {

        const geometry =
            new THREE.SphereGeometry(
                2.5,
                64,
                64
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x000000
            });

        this.blackHole =
            new THREE.Mesh(
                geometry,
                material
            );

        this.blackHole.position.set(
            18,
            0,
            0
        );

        this.scene.add(
            this.blackHole
        );

        /* ACCRETION RING */

        const ringGeometry =
            new THREE.TorusGeometry(
                4,
                0.3,
                16,
                120
            );

        const ringMaterial =
            new THREE.MeshBasicMaterial({

                color: 0xaa55ff,

                transparent: true,

                opacity: 0.4
            });

        this.blackHoleRing =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );

        this.blackHoleRing.rotation.x =
            Math.PI / 2;

        this.blackHole.add(
            this.blackHoleRing
        );
    }

    /* ================================= */
    /* MOUSE */
    /* ================================= */

    setupMouse() {

        window.addEventListener(
            "mousemove",
            (e) => {

                this.mouseX =

                    (e.clientX /
                        window.innerWidth - 0.5);

                this.mouseY =

                    (e.clientY /
                        window.innerHeight - 0.5);
            }
        );
    }

    /* ================================= */
    /* UPDATE */
    /* ================================= */

    update(time, gravity, chaos) {

        /* PARTICLES */

        this.points.rotation.y +=
            0.0005 * gravity;

        this.points.rotation.x +=
            0.0002;

        this.points.rotation.y +=
            this.mouseX * 0.0008;

        this.points.rotation.x +=
            this.mouseY * 0.0008;

        this.points.position.y =

            Math.sin(
                time * 0.0005
            ) * 2;

        this.points.material.size =

            0.28 +

            Math.sin(
                time * 0.002
            ) * 0.08;

        /* BLACK HOLE MOTION */

        this.blackHole.position.x =

            Math.cos(
                time * 0.0004
            ) * 18;

        this.blackHole.position.z =

            Math.sin(
                time * 0.0004
            ) * 18;

        this.blackHole.rotation.y +=
            0.02;

        this.blackHoleRing.rotation.z +=
            0.05;

        /* PARTICLE GRAVITY */

        const positions =
            this.points.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {

            const dx =
                this.blackHole.position.x -
                positions[i];

            const dy =
                this.blackHole.position.y -
                positions[i + 1];

            const dz =
                this.blackHole.position.z -
                positions[i + 2];

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy +
                    dz * dz
                );

            if (distance < 40) {

                positions[i] +=
                    dx * 0.0008;

                positions[i + 1] +=
                    dy * 0.0008;

                positions[i + 2] +=
                    dz * 0.0008;
            }
        }

        this.points.geometry.attributes.position.needsUpdate =
            true;

        /* CONNECTIONS */

        this.lines.rotation.y -=
            0.0002 * chaos;

        this.lines.rotation.z +=
            0.0001;

        /* NEURAL FIELD */

        this.neuralField.rotation.x +=
            0.002;

        this.neuralField.rotation.y -=
            0.003;

        this.neuralField.rotation.z +=
            0.001;

        const pulse =

            1 +

            Math.sin(
                time * 0.002
            ) * 0.06;

        this.neuralField.scale.set(
            pulse,
            pulse,
            pulse
        );
    }
}
