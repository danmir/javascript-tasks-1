var hours = process.argv[2];
var minutes = process.argv[3];

function TimeRomanizer(hours, minutes) {
    /**
     * @param hours
     * @returns {string|number}
     * @private
     */
    TimeRomanizer.prototype.__validateHours = function (hours) {
        if (hours < 0 || hours > 23) {
            return "Время указано не верно";
        }
        return hours;
    };
    /**
     * @param minutes
     * @returns {string|number}
     * @private
     */
    TimeRomanizer.prototype.__validateMinutes = function (minutes) {
        if (minutes < 0 || minutes > 59) {
            return "Время указано не верно";
        }
        return minutes
    };

    /** @private */ this.__hours = this.__validateHours(hours);
    /** @private */ this.__minutes = this.__validateMinutes(minutes);

    /** @private */ this.__romHours = null;
    /** @private */ this.__romMinutes = null;

    /**
     * Не переводим заранее, вдруг не попросят перевода
     */
    Object.defineProperties(this, {
        rom_hours: {
            "get": function () {
                if (!this.__romHours) {
                    if (this.__hours !== "Время указано не верно") {
                        this.__romHours = this.__decimalToRoman(this.__hours);
                    } else {
                        return this.__hours
                    }
                }
                return this.__romHours
            }
        }
    });

    Object.defineProperties(this, {
        rom_minutes: {
            "get": function () {
                if (!this.__romMinutes) {
                    if (this.__minutes !== "Время указано не верно") {
                        this.__romMinutes = this.__decimalToRoman(this.__minutes);
                    } else {
                        return this.__minutes
                    }
                }
                return this.__romMinutes
            }
        }
    });

    /**
     * Перевод числа в римский формат
     * @param value
     * @returns romanNumeral
     * @private
     */
    TimeRomanizer.prototype.__decimalToRoman = function (value) {
        var roman = [];
        var decimal = [];
        roman = ["L", "XL", "X", "IX", "V", "IV", "I"];
        decimal = [50, 40, 10, 9, 5, 4, 1];
        var romanNumeral = "";
        for (var i = 0; i < roman.length; i++) {
            while (value >= decimal[i] && value >= 0) {
                value -= decimal[i];
                romanNumeral += roman[i];
            }
        }
        if (romanNumeral == "") {
            return "--";
        }
        return romanNumeral;
    };

    /**
     * Перевод времени в римскую нотацию
     *  @returns {string|number, number}
     */
    TimeRomanizer.prototype.romanizeTime = function () {
        if (this.__hours === "Время указано не верно" || this.__minutes === "Время указано не верно") {
            return "Время указано не верно";
        }
        return [this.rom_hours, this.rom_minutes].join(":");
    };

    /**
     * Перевод одной римской цифры и разделителей в аски-графику
     * @param romNum
     * @returns {string[]}
     * @private
     */
    TimeRomanizer.prototype.__drawRomNum = function (romNum) {
        switch (romNum) {
            case "I":
                return ["###", " # ", " # ", " # ", "###"];
            case "V":
                return ["# #", "# #", "# #", "# #", " # "];
            case "X":
                return ["# #", "# #", " # ", "# #", "# #"];
            case "L":
                return ["#  ", "#  ", "#  ", "#  ", "###"];
            case ":":
                return ["   ", " # ", "   ", " # ", "   "];
            case "-":
                return ["   ", "###", "   ", "###", "   "];
        }
    };

    /**
     * Рисование строки с римским временем
     * @returns {*}
     */
    TimeRomanizer.prototype.drawRomTime = function () {
        var romanTime = this.romanizeTime();
        if (romanTime === "Время указано не верно") {
            return "Нечего рисовать"
        } else {
            var ans = "";
            // 5 раз рисуем по строчке, так как в шрифте высота цифр - 5
            for (var j = 0; j < 5; j++) {
                var line = [];
                for (var i = 0, len = romanTime.length; i < len; i++) {
                    line.push(this.__drawRomNum(romanTime[i])[j]);
                }
                line = line.join("  ");
                ans += [line, "\n"].join("");
            }
            return ans
        }
    };

    TimeRomanizer.prototype.isHoursValid = function () {
        return this.__hours !== "Время указано не верно";
    };

    TimeRomanizer.prototype.isMinutesValid = function () {
        return this.__minutes !== "Время указано не верно";
    };
}

module.exports = TimeRomanizer;
var myRom = new TimeRomanizer(hours, minutes);
console.log(myRom.romanizeTime());
console.log(myRom.drawRomTime());