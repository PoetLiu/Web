function log() {
    console.log.apply(console, arguments);
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

function collideResult(isCollide, areaWidth, areaHeight, target) {
    return {
        collide:isCollide,
        area: {
            w:areaWidth,
            h:areaHeight,
        },
        target:target,
    };
}