let startTime = null;
let testStarted = false;

function startTest() {
    startTime = new Date();
    testStarted = true;

    let input = document.getElementById("input");
    input.disabled = false;
    input.value = "";
    input.focus();

    document.getElementById("result").innerHTML = "";
}

function checkEnter(event) {
    if (event.key === "Enter" && testStarted) {
        event.preventDefault();
        endTest();
    }
}

function endTest() {
    let endTime = new Date();
    let totalTime = (endTime - startTime) / 1000;

    let typedText = document.getElementById("input").value.trim();
    let originalText = document.getElementById("sentence").innerText;

    let typedWords = typedText.split(" ").length;
    let wpm = Math.round((typedWords / totalTime) * 60);

    let correctChars = 0;
    for (let i = 0; i < typedText.length && i < originalText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctChars++;
        }
    }

    let accuracy = Math.round((correctChars / originalText.length) * 100);

    let verdict = "";
    let color = "";

    if (wpm >= 40) {
        verdict = "Good Speed 🚀";
        color = "lime";
    } else if (wpm >= 25) {
        verdict = "Medium Speed 🙂";
        color = "orange";
    } else {
        verdict = "Weak Speed 🐢";
        color = "red";
    }

    document.getElementById("result").innerHTML =
        " Time: " + totalTime.toFixed(2) + " sec<br>" +
        " Speed: " + wpm + " WPM<br>" +
        " Accuracy: " + accuracy + "%<br>" +
        "<span style='color:" + color + "; font-size:20px;'>" +
        verdict + "</span>";

    document.getElementById("input").disabled = true;
    testStarted = false;
}
