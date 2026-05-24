/* ================================= */
/* NOVA X PARTICLE SYSTEM v0.4 */
/* ================================= */

class ParticleSystem {

    constructor(scene) {

        this.scene = scene;

        this.mouseX = 0;
        this.mouseY = 0;

        this.createParticles();

        this.createConnections();

        this.createNeuralField();

        this.setupMouse();
    }

    /* ================================= */
    /* PARTICLES */
    /* ================================= */

    createParticles() {

        const count = 2200;

        const geometry =
            new THREE.BufferGeometry();

        const positions = [];
        const colors = [];

        for (let i = 0; i < count; i++) {

            const x =
                (Math.random() - 0.5) * 280;

            const y =
                (Math.random() - 0.5) * 280;

            const z =
                (Math.random() - 0.5) * 280;

            positions.push(x, y, z);

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

                size: 0.3,

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

        for (let i = 0; i < 450; i++) {

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

                opacity: 0.08
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

            0.3 +

            Math.sin(
                time * 0.002
            ) * 0.08;

        /* CONNECTIONS */

        this.lines.rotation.y -=
            0.0002 * chaos;

        this.lines.rotation.z +=
            0.0001;

        this.lines.position.y =

            Math.cos(
                time * 0.0003
            ) * 1.5;

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

        this.neuralField.material.opacity =

            0.08 +

            Math.sin(
                time * 0.003
            ) * 0.04;
    }
}
