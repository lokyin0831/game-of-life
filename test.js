document.body.addEventListener("keydown", function (event) {
    if (event.keyCode == 38) {
        console.log("UP pressed")

    } else if (event.keyCode == 40) {
        console.log("DOWN pressed")

    } else if (event.keyCode == 37) {
        console.log("LEFT pressed")

    } else if (event.keyCode == 39) {
        console.log("RIGHT pressed")

    }
})