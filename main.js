var id = 0;

var timer;
var time;

var windowID = 0;

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
    if (7 < time.getHours() < 19 && time.getMinutes() == 59) {
        // if (time.getMilliseconds() == 59 {
            clearInterval(timer);
            launch();
        // }
        return 0;
    }

    return 1;
}


function launch() {
    setNotificationListener();

    notify();

    setInterval(function() {
        console.log("launch notify timer");
        notify();
    }, 1000 * 60 * 60);

}

function notify() {
    var timeStr = time.getFullYear() + "-" + (time.getMonth() + 1) +
    "-" + time.getDate() + " " + time.getHours() + ":" +
    time.getMinutes();

    // chrome.notifications.create("id" + id++, {
    //     type: "basic",
    //     title: timeStr,
    //     message: "Time to add energy cycle.",
    //     iconUrl: "icon_128.png"
    // }, creationCallback);
    open();

}

function setNotificationListener(){
    chrome.notifications.onClicked.addListener(function() {
        open();
    });
}



function creationCallback(id) {
    setTimeout(function() {
        chrome.notifications.clear(id, function(wasCleared) {

        });
    }, 5000);

}


function open() {

   chrome.windows.create({
    'url': getSheetUrl(),
    'width': windowWidth,
    'height': windowHeight,
    'left': Math.round(screen.availWidth / 2 - windowWidth / 2),
    'top': Math.round(screen.availHeight / 2 - windowHeight / 2)
});

    // chrome.windows.get(windowID, function(chromeWindow) {
    //     if (!chrome.runtime.lastError && chromeWindow) {
    //         chrome.windows.update(windowID, { focused: true });
    //         return;
    //     }
    //     chrome.windows.create({
    //         'url': getSheetUrl(),
    //         'width': windowWidth,
    //         'height': windowHeight,
    //         'left': Math.round(screen.availWidth / 2 - windowWidth / 2),
    //         'top': Math.round(screen.availHeight / 2 - windowHeight / 2)
    //     },
    //     function(chromeWindow) {
    //         windowID = chromeWindow.id;
    //     }
    //     );
    // });

}

function getSheetUrl(){
    return "https://docs.google.com/spreadsheets/d/1GE--PHt2vNHuqK9hy_1voocdjrhH9X4cEeGwePPIhGE/edit#gid=0";
}
