class ToggleButtonExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.isOn = true; // 初期状態はON
        this.imageUrls = {
            ON: "https://studyapps.github.io/svg/Chapter_ON.svg",
            OFF: "https://studyapps.github.io/svg/Chapter_OFF.svg"
        };
        this.createButton();
    }

    createButton() {
        this.buttonElement = document.createElement("img");
        this.buttonElement.src = this.imageUrls.ON;
        this.buttonElement.style.position = "absolute";
        this.buttonElement.style.left = "10px";
        this.buttonElement.style.top = "10px";
        this.buttonElement.style.width = "50px";
        this.buttonElement.style.height = "50px";
        this.buttonElement.style.cursor = "pointer";
        this.buttonElement.style.zIndex = "1000";

        this.buttonElement.addEventListener("click", () => this.toggleState());
        document.body.appendChild(this.buttonElement);
    }

    toggleState() {
        this.isOn = !this.isOn;
        this.buttonElement.src = this.isOn ? this.imageUrls.ON : this.imageUrls.OFF;
    }

    getInfo() {
        return {
            id: "toggleButton",
            name: "Toggle Button",
            blocks: []
        };
    }
}

Scratch.extensions.register(new ToggleButtonExtension());