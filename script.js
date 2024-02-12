function startProcessing() {
    var arraySize = parseInt(document.getElementById('array-size').value);
    var numWorkers = parseInt(document.getElementById('num-workers').value);

    var arr = generateRandomArray(arraySize);

    // Without workers
    console.log("Processing started without web workers");
    var startWithoutWorkers = performance.now();
    var sortedArray = sortArray(arr);
    var endWithoutWorkers = performance.now();
    var timeWithoutWorkers = endWithoutWorkers - startWithoutWorkers;
    updateProgress('progress-without-workers', 100, timeWithoutWorkers);
    console.log(sortedArray.slice(0, 50).join(', '));
    sortedArray = []
    console.log("Processing ended without web workers");

    // With workers
    console.log("Processing started with web workers");
    var startWithWorkers = performance.now();
    var workers = [];
    var chunkSize = Math.ceil(arraySize / numWorkers);
    var completedWorkers = 0;
    for (var i = 0; i < numWorkers; i++) {
        var start = i * chunkSize;
        var end = Math.min((i + 1) * chunkSize, arraySize);
        var worker = new Worker('worker.js');
        worker.postMessage({ array: arr.slice(start, end) });
        worker.onmessage = function(event) {
            sortedArray = mergeArrays(sortedArray, event.data);
            completedWorkers++;
            if (completedWorkers === numWorkers) {
                var endWithWorkers = performance.now();
                var timeWithWorkers = endWithWorkers - startWithWorkers;
                updateProgress('progress-with-workers', 100, timeWithWorkers);
                console.log(sortedArray.slice(0, 50).join(', '));
                console.log("Processing ended with web workers");
            }
        };
        console.log("running "+i)
        workers.push(worker);
    }
    
}

function generateRandomArray(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * size * 10));
    }
    return arr;
}

function sortArray(arr) {
    return arr.sort((a, b) => a - b);
}

function mergeArrays(arr1, arr2) {
    return arr1.concat(arr2).sort((a, b) => a - b);
}

function updateProgress(progressId, percent, time) {
    var progressBar = document.getElementById(progressId);
    progressBar.style.width = percent + '%';
    progressBar.innerHTML = time.toFixed(2) + ' ms';
}
