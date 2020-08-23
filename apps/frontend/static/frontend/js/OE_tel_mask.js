'use strict';

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        var keyCode;

        function mask(event) {

            if (this.value && this.value.replace(/\D/g, "").substring(0, 2) != '38') return false;
            // stop function, if value from DB is not match with input mask

            keyCode = event.keyCode || "";
            var pos = this.selectionStart;
            if (pos < 4) event.preventDefault();
            var matrix = "+38(___) ___ __ __",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i = i < 5 ? 4 : i;
                new_value = new_value.slice(0, i);
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = "";
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

    });

});

