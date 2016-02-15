/* 
 * Author: Sean Smith
 * Created: 1/22/2016
 */

var utilities = {
    centerGameObjects: function (objects) {
        objects.forEach(function (object) {
            object.anchor.setTo(0.5);
        });
    },
    randRange: function (min, max) {
        return Math.random() * (max - min + 1) + min;
    }
};