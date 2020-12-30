var typeWriting = new TypeWriting({
    targetElement: document.getElementsByClassName('terminal')[0],
    inputString: "Mealty Calculator",
    typing_interval: 130, // Interval between each character
    blink_interval: '1s', // Interval of the cursor blinks
    cursor_color: '#00fd55', // Color of the cursor
}, function() {
    console.log("END");
});