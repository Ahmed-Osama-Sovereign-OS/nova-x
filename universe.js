/* ================================= */
/* NOVA X UNIVERSE v0.6 */
/* ================================= */

class Universe {

    constructor() {

        this.scene =
            new THREE.Scene();

        this.scene.fog =
            new THREE.FogExp2(
                0x020611,
                0.003
            );

        /* CAMERA */

        this.camera =
            new THREE.PerspectiveCamera(

                75,

                window.innerWidth /
                window.innerHeight,

                0.1,

                1000
            );

        this.camera.position.z = 60;

        /* RENDERER */

        this.renderer =
            new THREE.WebGLRenderer({

                canvas:
                    document.getElementById("bg"),

                antialias: true,

                alpha: true
            });

        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                1.5
            )
        );

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setClearColor(
            0x000000,
            1
        );

        /* MOUSE */

        this.mouse = {
            x: 0,
            y: 0
        };

        this.setupMouse();

        /* SYSTEMS */

        this.createLights();

        this.createEnergyRing();

        this.createCore();

        this.setupResize();
    }

    /* ================================= */
    /* MOUSE */
    /* ================================= */

    setupMouse() {

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
    }

    /* ================================= */
    /* LIGHTS */
    /* ================================= */

    createLights() {

        const ambient =
            new THREE.AmbientLight(
                0x3366ff,
                0.45
            );

        this.scene.add(ambient);

        const blueLight =
            new THREE.PointLight(
                0x00ccff,
                45,
                300
            );

        blueLight.position.set(
            0,
            0,
            0
        );

        this.scene.add(
            blueLight
        );

        const purpleLight =
            new THREE.PointLight(
                0xaa55ff,
                30,
                250
            );

        purpleLight.position.set(
            20,
            10,
            30
        );

        this.scene.add(
            purpleLight
        );
    }

    /* ================================= */
    /* ENERGY RINGS */
    /* ================================= */

    createEnergyRing() {

        const geometry =
            new THREE.TorusGeometry(
                18,
                0.35,
                16,
                120
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x00ccff,

                transparent: true,

                opacity: 0.4
            });

        this.energyRing =
            new THREE.Mesh(
                geometry,
                material
            );

        this.energyRing.rotation.x =
            Math.PI / 2;

        this.scene.add(
            this.energyRing
        );

        /* SECOND */

        const geometry2 =
            new THREE.TorusGeometry(
                24,
                0.22,
                16,
                120
            );

        const material2 =
            new THREE.MeshBasicMaterial({

                color: 0xaa55ff,

                transparent: true,

                opacity: 0.22
            });

        this.energyRing2 =
            new THREE.Mesh(
                geometry2,
                material2
            );

        this.energyRing2.rotation.y =
            Math.PI / 2;

        this.scene.add(
            this.energyRing2
        );
    }

    /* ================================= */
    /* CORE */
    /* ================================= */

    createCore() {

        const geometry =
            new THREE.SphereGeometry(
                3,
                64,
                64
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x66ccff,

                transparent: true,

                opacity: 0.95
            });

        this.core =
            new THREE.Mesh(
                geometry,
                material
            );

        this.scene.add(
            this.core
        );

        /* INNER CORE */

        const innerGeometry =
            new THREE.SphereGeometry(
                1.5,
                32,
                32
            );

        const innerMaterial =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                transparent: true,

                opacity: 0.9
            });

        this.innerCore =
            new THREE.Mesh(
                innerGeometry,
                innerMaterial
            );

        this.scene.add(
            this.innerCore
        );

        /* GLOW */

        const glowGeometry =
            new THREE.SphereGeometry(
                4.2,
                64,
                64
            );

        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x00ccff,

                transparent: true,

                opacity: 0.08
            });

        this.glow =
            new THREE.Mesh(
                glowGeometry,
                glowMaterial
            );

        this.scene.add(
            this.glow
        );
    }

    /* ================================= */
    /* RESIZE */
    /* ================================= */

    setupResize() {

        window.addEventListener(
            "resize",
            () => {

                this.camera.aspect =

                    window.innerWidth /

                    window.innerHeight;

                this.camera.updateProjectionMatrix();

                this.renderer.setSize(

                    window.innerWidth,

                    window.innerHeight
                );
            }
        );
    }

    /* ================================= */
    /* UPDATE */
    /* ================================= */

    update(time, gravity, energy) {

        /* SENTIENT FOLLOW */

        this.core.position.x +=

            (
                this.mouse.x * 8 -

                this.core.position.x
            ) * 0.03;

        this.core.position.y +=

            (
                -this.mouse.y * 5 -

                this.core.position.y
            ) * 0.03;

        this.innerCore.position.copy(
            this.core.position
        );

        this.glow.position.copy(
            this.core.position
        );

        /* ROTATION */

        this.core.rotation.y +=
            0.01 * gravity;

        this.core.rotation.x +=
            0.003;

        this.innerCore.rotation.y -=
            0.03;

        this.innerCore.rotation.x +=
            0.02;

        /* PULSE */

        const pulse =

            1 +

            Math.sin(
                time * 0.003
            ) * 0.12;

        this.core.scale.set(
            pulse,
            pulse,
            pulse
        );

        /* INNER */

        const innerPulse =

            1 +

            Math.sin(
                time * 0.006
            ) * 0.2;

        this.innerCore.scale.set(
            innerPulse,
            innerPulse,
            innerPulse
        );

        /* GLOW */

        const glowScale =

            1.1 +

            Math.sin(
                time * 0.0025
            ) * 0.08;

        this.glow.scale.set(
            glowScale,
            glowScale,
            glowScale
        );

        this.glow.material.opacity =

            0.08 +

            Math.sin(
                time * 0.003
            ) * 0.03;

        /* RINGS */

        this.energyRing.rotation.z +=
            0.004 * energy;

        this.energyRing.rotation.x +=
            0.001;

        this.energyRing2.rotation.x -=
            0.003;

        this.energyRing2.rotation.y +=
            0.002;

        /* CAMERA */

        this.camera.position.y =

            Math.sin(
                time * 0.0005
            ) * 2;

        this.camera.lookAt(
            this.core.position
        );
    }

    /* ================================= */
    /* RENDER */
    /* ================================= */

    render() {

        this.renderer.render(
            this.scene,
            this.camera
        );
    }
}
