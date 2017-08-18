function log(...args) {
    console.log(args);
}

function numInSection(num, min, max) {
    if (num < min) {
        return min;
    } else if (num > max) {
        return max;
    } else {
        return num;
    }
}

function numIsInSection(num, min, max) {
    return numInSection(num, min, max) === num;
}