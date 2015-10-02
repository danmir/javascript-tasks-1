var hours = process.argv[2];
var minutes = process.argv[3];

function TimeRomanizer(hours, minutes) {
    /**
     * Валидация входных данных
     * @param hours
     * @returns "Время указано не верно" || hours
     * @private
     */
    TimeRomanizer.prototype.__validate_hours = function (hours) {
        if (hours < 0 || hours > 23) return "Время указано не верно";
        else return hours
    };
    /**
     * Валидация входных данных
     * @param minutes
     * @returns "Время указано не верно" || minutes
     * @private
     */
    TimeRomanizer.prototype.__validate_minutes = function (minutes) {
        if (minutes < 0 || minutes > 59) return "Время указано не верно";
        else return minutes
    };

    /** @private */ this.__hours = this.__validate_hours(hours);
    /** @private */ this.__minutes = this.__validate_minutes(minutes);

    /** @private */ this.__rom_hours = null;
    /** @private */ this.__rom_minutes = null;

    /**
     * Не переводим заранее, вдруг не попросят перевода
     */
    Object.defineProperties(this, {
        "rom_hours": {
            "get": function () {
                if (!this.__rom_hours) {
                    if (this.__hours != "Время указано не верно") {
                        this.__rom_hours = this.__decimal_to_roman(this.__hours);
                    } else {
                        return this.__hours
                    }
                }
                return this.__rom_hours
            }
        }
    });

    Object.defineProperties(this, {
        "rom_minutes": {
            "get": function () {
                if (!this.__rom_minutes) {
                    if (this.__minutes != "Время указано не верно") {
                        this.__rom_minutes = this.__decimal_to_roman(this.__minutes);
                    } else {
                        return this.__minutes
                    }
                }
                return this.__rom_minutes
            }
        }
    });

    /**
     * Перевод числа в римский формат
     * @param value
     * @returns romanNumeral
     * @private
     */
    TimeRomanizer.prototype.__decimal_to_roman = function (value) {
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
            return "--"
        }
        return romanNumeral;
    };

    /**
     * Перевод времени в римскую нотацию
     * @returns "Время указано не верно" || this.rom_hours, this.rom_minutes
     */
    TimeRomanizer.prototype.romanize_time = function () {
        if (this.__hours == "Время указано не верно" || this.__minutes == "Время указано не верно") {
            return "Время указано не верно"
        } else {
            return [this.rom_hours, this.rom_minutes].join(":");
        }
    };

    /**
     * Перевод одной римской цифры и разделителей в аски-графику
     * @param rom_num
     * @returns {string[]}
     * @private
     */
    TimeRomanizer.prototype.__draw_rom_num = function (rom_num) {
        switch (rom_num) {
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
    TimeRomanizer.prototype.draw_rom_time = function () {
        var roman_time = this.romanize_time();
        if (roman_time == "Время указано не верно") {
            return "Нечего рисовать"
        } else {
            var ans = "";
            // 5 раз рисуем по строчке, так как в шрифте высота цифр - 5
            for (var j = 0; j < 5; j++) {
                var line = [];
                for (var i = 0, len = roman_time.length; i < len; i++) {
                    line.push(this.__draw_rom_num(roman_time[i])[j]);
                }
                line = line.join("  ");
                ans += [line, "\n"].join("");
            }
            return ans
        }
    };
}

module.exports = TimeRomanizer;
var my_rom = new TimeRomanizer(hours, minutes);
console.log(my_rom.romanize_time());
console.log(my_rom.draw_rom_time());