/**
 * @author Michael Horner <m.horner@gmx.de>
 */

// Stopwatch class by Michael Horner
//
// This class provides a stopwatch functionality that can be used to measure elapsed time.
// It allows starting, stopping, resetting, and retrieving the elapsed time in various formats.
//
// Usage:
// 1. Create an instance of the Stopwatch class by passing an element and optional options.
//    - The element represents the container where the stopwatch UI will be rendered.
//    - The options object allows customizing the behavior of the stopwatch.
//      - The `delay` option specifies the interval in milliseconds between each update of the stopwatch display (default is 1 millisecond).
//
// 2. Append the created stopwatch instance to the DOM to display it.
//
// 3. The stopwatch provides the following public methods for control and retrieval:
//    - `start()`: Starts the stopwatch.
//    - `stop()`: Stops the stopwatch.
//    - `reset()`: Resets the stopwatch to zero.
//    - `renderInMinutes()`: Returns the elapsed time in minutes.
//    - `renderInHours()`: Returns the elapsed time in hours (with one decimal place).
//    - `renderInMilliseconds()`: Returns the elapsed time in milliseconds.
//    - `addMinute()`: Adds one minute to the elapsed time.
//    - `removeMinute()`: Removes one minute from the elapsed time.
//
// The stopwatch UI consists of a timer display, start, stop, and reset buttons.
// The timer display shows the elapsed time in the selected format.
// Clicking the start button starts the stopwatch, and clicking the stop button stops it.
// The reset button resets the stopwatch to zero.
//
// Example usage:
// ```javascript
// var stopwatchContainer = document.getElementById('stopwatch-container');
// var stopwatch = new Stopwatch(stopwatchContainer);
// stopwatch.start();
// ```

var Stopwatch = function (elem, options) {

    var timer = createTimer(),
        startButton = createButton("start", start),
        stopButton = createButton("stop", stop),
        resetButton = createButton("reset", reset),
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements     
    elem.appendChild(timer);
    elem.appendChild(startButton);
    elem.appendChild(stopButton);
    elem.appendChild(resetButton);

    // initialize
    reset();

    // private functions
    function createTimer() {
        return document.createElement("span");
    }

    function createButton(action, handler) {
        var a = document.createElement("a");
        a.href = "#" + action;
        a.innerHTML = action;
        a.addEventListener("click", function (event) {
            handler();
            event.preventDefault();
        });
        return a;
    }

    function start() {
        if (!interval) {
            offset = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        clock = 0;
        render();
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        timer.innerHTML = clock / 1000;
        return clock / 1000;
    }

    function renderInMinutes() {
        return Math.floor(clock / 60000);
    }

    function renderInHours() {
        var hours = (clock / (1000 * 60 * 60)).toFixed(1);
        return hours;
    }

    function renderInMilliseconds() {
        return clock;
    }

    function delta() {
        var now = Date.now(),
            d = now - offset;

        offset = now;
        return d;
    }

    function addMinute() {
        clock += 60000;
    }

    function removeMinute() {
        clock -= 60000;
    }

    // public API
    this.start = start;
    this.stop = stop;
    this.renderInMinutes = renderInMinutes;
    this.renderInHours = renderInHours;
    this.renderInMilliseconds = renderInMilliseconds;
    this.reset = reset;
    this.addMinute = addMinute;
    this.removeMinute = removeMinute;
};