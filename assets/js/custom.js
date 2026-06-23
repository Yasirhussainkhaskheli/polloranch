document.addEventListener("DOMContentLoaded", function () {
    var year = document.getElementById("polo-current-year");
    var postcodeInput = document.getElementById("postcodeInput");
    var postcodeButton = document.getElementById("postcodeCheckBtn");
    var postcodeResult = document.getElementById("postcodeResult");
    var coveredAreas = {
        BD1: "Bradford City Centre",
        BD2: "Bradford Moor, Undercliffe",
        BD3: "Thornbury, Barkerend",
        BD4: "Bierley, Tyersal",
        BD5: "Little Horton, Bankfoot",
        BD6: "Wibsey, Buttershaw",
        BD7: "Great Horton, Lidget Green",
        BD8: "Girlington, Heaton",
        BD9: "Frizinghall, Manningham",
        BD10: "Eccleshill, Idle",
        BD11: "Birkenshaw, Drighlington",
        BD12: "Wyke, Low Moor"
    };

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    function updatePostcodeResult(message, state) {
        if (!postcodeResult) {
            return;
        }

        postcodeResult.textContent = message;
        postcodeResult.classList.remove("is-success", "is-warning");

        if (state) {
            postcodeResult.classList.add(state);
        }
    }

    function checkPostcode() {
        if (!postcodeInput) {
            return;
        }

        var rawValue = postcodeInput.value.trim().toUpperCase();
        var normalized = rawValue.replace(/\s+/g, "");
        var match = normalized.match(/^BD(\d{1,2})/);
        var outward = match ? "BD" + match[1] : "";

        if (!rawValue) {
            updatePostcodeResult("Enter a Bradford postcode such as BD7 1BA to check delivery coverage.", "is-warning");
            return;
        }

        if (coveredAreas[outward]) {
            updatePostcodeResult("Yes, we deliver to " + rawValue + ". This falls under " + outward + " covering " + coveredAreas[outward] + ". Typical delivery is 30 to 45 minutes.", "is-success");
            return;
        }

        updatePostcodeResult("" + rawValue + " is not in our listed BD1 to BD12 delivery zones. It may fall outside our 4-mile radius, so please contact us to confirm.", "is-warning");
    }

    if (postcodeButton) {
        postcodeButton.addEventListener("click", checkPostcode);
    }

    if (postcodeInput) {
        postcodeInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                checkPostcode();
            }
        });
    }

    if (window.AOS) {
        AOS.refresh();
    }
});
