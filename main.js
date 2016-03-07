id = 0;

var timer;
var time;

var windowWidth = 800;
var windowHeight = 600;

if (startTimer() == 1) {
    timer = setInterval(function() {
        startTimer();
    }, 1000 * 60);
}


function startTimer() {
    time = new Date();
    console.log(time.getHours());
    console.log(time.getMinutes());
    if (7 < time.getHours() < 19) {
        // if (time.getMilliseconds() == 59 {
        clearInterval(timer);
        launch();
        // }
        return 0;
    }

    return 1;
}


function launch() {
    notify();

    setInterval(function() {
        console.log("launch notify timer");
        notify();
    }, 1000 * 10);

}

function notify() {
    var timeStr = time.getFullYear() + "-" + (time.getMonth() + 1) +
        "-" + time.getDate() + " " + time.getHours() + ":" +
        time.getMinutes();

    chrome.notifications.create("id" + id++, {
        type: "basic",
        title: timeStr,
        message: "Time to add energy cycle.",
        iconUrl: "icon_128.png"
    }, function() {

    });

    chrome.notifications.onClicked.addListener(function(notificationId) {
        open(notificationId);
    });
}

function open(windowId) {


    chrome.app.window.create('window.html', {
        'id': windowId,
        outerBounds: { // 'bounds' is deprecated, and you want full window size
            width: windowWidth,
            height: windowHeight,
            left: screen.availWidth / 2 - windowWidth / 2,
            top: screen.availHeight / 2 - windowHeight / 2,
        }

    });
}
