var timing = {

    /**
 * This method displays the message box
 * @param {Text to be shown in the message} text 
 * @param {Background color of the message box} color 
 */
    showMessageBox: function (text, color) {

        let $element = $("#message-Text");

        $element.text(text);
        $element.css("background-color", color);
        $element.fadeIn(1000).delay(1000).fadeOut(1000);
    }
}