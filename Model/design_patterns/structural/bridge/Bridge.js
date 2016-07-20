'use strict';

class AbstractShape {
    constructor(x, y, themeAPI) {
        this.themeAPI = themeAPI;
        this.x = x;
        this.y = y;
        this.$domElement = $("<div />").appendTo($("body"));
    }

    applyNewTheme(themeAPI) {
        this.themeAPI = themeAPI;
        this.draw();
    }

    draw () { }
    resizeByPercentage(pct) { }
}


class CircleShape extends AbstractShape {
    constructor(radius, x, y, themeAPI) {
        super(x, y, themeAPI);
        this.radius = radius;
    }

    draw () {
        // Draw the circle shape
        this.$domElement.css({
            'border-radius':'100%',
            position : 'absolute',
            left : this.x,
            top: this.y,
            height : this.radius + 'px',
            width: this.radius + 'px'
        });

        this.themeAPI.stylize(this.$domElement);
    }

    resizeByPercentage(pct) {
        this.radius *= pct;
        this.draw();
    }
}

class RectShape extends AbstractShape {
    constructor(w, h, x, y, themeAPI) {
        super(x, y, themeAPI);
        this.w = w;
        this.h = h;
    }

    draw () {
        // Draw the rect shape
        this.$domElement.css({
            position : 'absolute',
            left : this.x,
            top: this.y,
            height : this.h + 'px',
            width: this.w + 'px'
        });

        this.themeAPI.stylize(this.$domElement);
    }

    resizeByPercentage(pct) {
        this.radius *= pct;
        this.draw();
    }
}


class AbstractThemeAPI {
    stylize ($el) { }
}

class YellowTheme extends AbstractThemeAPI {
    stylize ($el) {
        $el.css({'background-color': 'yellow', border : '3px solid black'});
    }
}

class RedTheme extends AbstractThemeAPI {
    stylize ($el){
        $el.css({'background-color': 'red', border : '3px dotted blue'});
    }
}

f = (function init_Bridge() {
    let shapes = [
        new CircleShape(150, 1, 3, new YellowTheme()),
        new CircleShape(200, 500, 7, new RedTheme()),
        new RectShape(400, 150, 10, 400, new RedTheme())
    ];

    shapes.forEach((shape) => {
        shape.draw();
    });

    setTimeout( function() {
        shapes[0].resizeByPercentage(1.7);
    }, 1500);
})();