/* ================================= */
/* NOVA X CONTROLS */
/* ================================= */

class Controls {

    constructor() {

        /* DEFAULT VALUES */

        this.gravity = 3;

        this.chaos = 4;

        this.timeSpeed = 1;

        this.energy = 8;

        /* ELEMENTS */

        this.gravitySlider =
            document.getElementById("gravity");

        this.chaosSlider =
            document.getElementById("chaos");

        this.timeSlider =
            document.getElementById("timeSpeed");

        this.energySlider =
            document.getElementById("energy");

        /* EVENTS */

        this.setupEvents();
    }

    /* ================================= */
    /* EVENTS */
    /* ================================= */

    setupEvents() {

        /* GRAVITY */

        this.gravitySlider.addEventListener(
            "input",
            (e) => {

                this.gravity =
                    parseFloat(e.target.value);
            }
        );

        /* CHAOS */

        this.chaosSlider.addEventListener(
            "input",
            (e) => {

                this.chaos =
                    parseFloat(e.target.value);
            }
        );

        /* TIME */

        this.timeSlider.addEventListener(
            "input",
            (e) => {

                this.timeSpeed =
                    parseFloat(e.target.value);
            }
        );

        /* ENERGY */

        this.energySlider.addEventListener(
            "input",
            (e) => {

                this.energy =
                    parseFloat(e.target.value);
            }
        );
    }
}
