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

function getBrickColorByLife(life) {
    switch (life) {
        case 1:
            return 'gray';
        case 2:
            return 'black';
        default:
            return 'red';
    }
}

function loadLevel(level) {
    var l = level - 1;
    return [
        {bricks: [0, 0, 1]},
        {bricks: [100, 200, 1, 300, 200, 2]},
        {bricks: [0, 0, 1, 100, 200, 1, 300, 200, 2]},
    ][l];
}