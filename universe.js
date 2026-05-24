/* ================================= */
/* NOVA X UNIVERSE */
/* ================================= */

class Universe {

    constructor() {

        /* ========================= */
        /* SCENE */
        /* ========================= */

        this.scene = new THREE.Scene();

        this.scene.fog = new THREE.FogExp2(
            0x020611,
            0.0035
        );

        /* ========================= */
        /* CAMERA */
        /* ========================= */

        this.camera = new THREE.PerspectiveCamera(

            75,

            window.innerWidth / window.innerHeight,

            0.1,

            1000
        );

        this.camera.position.z = 60;

        /* ========================= */
        /* RENDERER */
        /* ========================= */

        this.renderer = new THREE.WebGLRenderer({

            canvas: document.getElementById("bg"),

            antialias: true,

            alpha: true
        });

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 1.5)
        );

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setClearColor(
            0x000000,
            1
        );

        /* ========================= */
        /* LIGHTS */
        /* ========================= */

        this.createLights();

        /* ========================= */
        /* ENERGY RINGS */
        /* ========================= */

        this.createEnergyRing();

        /* ========================= */
        /* CORE */
        /* ========================= */

        this.createCore();

        /* ========================= */
        /* EVENTS */
        /* ========================= */

        this.setupResize();
    }

    /* ================================= */
    /* LIGHTS */
    /* ================================= */

    createLights() {

        /* AMBIENT */

        const ambient =
            new THREE.AmbientLight(
                0x3366ff,
                0.4
            );

        this.scene.add(ambient);

        /* BLUE LIGHT */

        const blueLight =
            new THREE.PointLight(
                0x00ccff,
                25,
                300
            );

        blueLight.position.set(
            0,
            0,
            0
        );

        this.scene.add(blueLight);

        /* PURPLE LIGHT */

        const purpleLight =
            new THREE.PointLight(
                0x8844ff,
                18,
                250
            );

        purpleLight.position.set(
            20,
            10,
            30
        );

        this.scene.add(purpleLight);
    }

    /* ================================= */
    /* ENERGY RING */
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

                opacity: 0.5
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

        /* SECOND RING */

        const geometry2 =
            new THREE.TorusGeometry(
                24,
                0.25,
                16,
                120
            );

        const material2 =
            new THREE.MeshBasicMaterial({

                color: 0xaa55ff,

                transparent: true,

                opacity: 0.25
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
                32,
                32
            );

        const material =
            new THREE.MeshBasicMaterial({

                color: 0x66ccff,

                transparent: true,

                opacity: 0.9
            });

        this.core =
            new THREE.Mesh(
                geometry,
                material
            );

        this.scene.add(
            this.core
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

        /* CORE */

        this.core.rotation.y +=
            0.01 * gravity;

        this.core.rotation.x +=
            0.003;

        /* PULSE */

        const scale =
            1 +
            Math.sin(time * 0.003) * 0.08;

        this.core.scale.set(
            scale,
            scale,
            scale
        );

        /* ENERGY RINGS */

        this.energyRing.rotation.z +=
            0.004 * energy;

        this.energyRing.rotation.x +=
            0.001;

        this.energyRing2.rotation.x -=
            0.003;

        this.energyRing2.rotation.y +=
            0.002;

        /* CAMERA FLOAT */

        this.camera.position.y =
            Math.sin(time * 0.0005) * 2;

        this.camera.lookAt(0, 0, 0);
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
