self.onmessage = function(event) {
    var sortedArray = event.data.array.sort((a, b) => a - b);
    self.postMessage(sortedArray);
};
