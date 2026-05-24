
/* ================================= */
/* NOVA X PARTICLE SYSTEM v0.2 */
/* ================================= */

class ParticleSystem {

    constructor(scene) {

        this.scene = scene;

        this.particles = [];

        this.mouseX = 0;
        this.mouseY = 0;

        this.createParticles();

        this.createConnections();

        this.setupMouse();
    }

    /* ============================= */
    /* CREATE PARTICLES */
    /* ============================= */

    createParticles() {

        const count = 1800;

        const geometry = new THREE.BufferGeometry();

        const positions = [];

        const colors = [];

        for (let i = 0; i < count; i++) {

            const x = (Math.random() - 0.5) * 260;
            const y = (Math.random() - 0.5) * 260;
            const z = (Math.random() - 0.5) * 260;

            positions.push(x, y, z);

            /* COLORS */

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

                size: 0.35,

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

        this.scene.add(this.points);
    }

    /* ============================= */
    /* CONNECTION LINES */
    /* ============================= */

    createConnections() {

        const geometry =
            new THREE.BufferGeometry();

        const vertices = [];

        for (let i = 0; i < 300; i++) {

            vertices.push(

                (Math.random() - 0.5) * 180,
                (Math.random() - 0.5) * 180,
                (Math.random() - 0.5) * 180
            );

            vertices.push(

                (Math.random() - 0.5) * 180,
                (Math.random() - 0.5) * 180,
                (Math.random() - 0.5) * 180
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

                opacity: 0.12
            });

        this.lines =
            new THREE.LineSegments(
                geometry,
                material
            );

        this.scene.add(this.lines);
    }

    /* ============================= */
    /* MOUSE */
    /* ============================= */

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

    /* ============================= */
    /* UPDATE */
    /* ============================= */

    update(time, gravity, chaos) {

        /* ROTATION */

        this.points.rotation.y +=
            0.0005 * gravity;

        this.points.rotation.x +=
            0.0002;

        /* MOUSE */

        this.points.rotation.y +=
            this.mouseX * 0.0008;

        this.points.rotation.x +=
            this.mouseY * 0.0008;

        /* CONNECTIONS */

        this.lines.rotation.y -=
            0.0002 * chaos;

        this.lines.rotation.z +=
            0.0001;

        /* FLOATING */

        this.points.position.y =
            Math.sin(time * 0.0005) * 2;

        this.lines.position.y =
            Math.cos(time * 0.0003) * 1.5;

        /* QUANTUM PULSE */

        this.points.material.size =

            0.35 +

            Math.sin(time * 0.002) * 0.08;

        /* ENERGY SHIFT */

        this.points.rotation.z +=
            0.00008 * chaos;
    }
}
