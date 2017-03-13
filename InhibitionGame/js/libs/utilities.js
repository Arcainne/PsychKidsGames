/* 
 * Author: Sean Smith
 * Created: 1/22/2016
 */

function Utils() {}
Utils.prototype = {
    centerGameObjects: function (objects) {
        objects.forEach(function (object) {
            object.anchor.setTo(0.5);
        });
    },
    randRange: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    dist: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
};
INHIB.Utils = new Utils();