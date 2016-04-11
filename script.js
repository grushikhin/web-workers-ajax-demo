

//wait
(function(){
    document.getElementById('wait').onclick = function() {
        wait(3000, alert);
    };
    document.getElementById('wait_in_worker').onclick = function() {
        waitInWorker(3000, alert.bind(window));
    };

    function wait(time, callback) {
        var date = new Date();
        var currentDate = null;
        do {
            currentDate = new Date();
        } while (currentDate - date < time);

        callback('done!');
    }

    function waitInWorker(time, callback) {
        operative(wait)(time, callback)
    }
}());

//animation
(function() {
    document.getElementById('animate').onclick = toggleAnimation;

    var isRunning = false;
    var animInterval;
    var i = 0;
    var step = 1;

    var min = 0;
    var max = 1000;

    function startAnimation() {
        stopAnimation();

        isRunning = true;
        animInterval = setInterval(function() {
            document.getElementById('ufo').style.left = i + 'px';
            i += step;

            if (i < min || i > max) {
                step = -step;
            }
        }, 20);
    }

    function stopAnimation() {
        isRunning = false;
        clearInterval(animInterval);
    }
    
    function toggleAnimation() {
        if (isRunning) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    startAnimation();
}());

(function() {
    document.getElementById('run_1').onclick = function() {doRequests()};
    document.getElementById('run_2').onclick = function() {doRequestsInWorker()};

    function doRequestsInWorker(){
        repeat100(function() {
            operative(doRequest)();
        });
    }

    function doRequest(){
        fetch('http://fake-response.appspot.com/?sleep=1');
    }

    function doRequests() {
        repeat100(doRequest);
    }

    function repeat100(fn) {
        count = 10;
        var i = 0;

        do {
            fn(i);
            i++;
        } while (i < count);
    }
    
}());






