// First, we select all the dom elements we need to use in this script.
const password = document.getElementById("password");
const quote = document.getElementById("quote");
const guessingBar = document.getElementById("guessing-bar");
const uncommonnessBar = document.getElementById("uncommonness-bar");
const crackingBar = document.getElementById("cracking-bar");
const overallBar = document.getElementById("overall-bar");
const checkbox = document.getElementById("checkbox");


// If checkbox on: textfield becomes password else becomes text. Default is text.
checkbox.addEventListener("change", e => {
    password.type = e.target.checked ? "password" : "text";
});

// Function that will calculate the strength of the password. Returns: number for each bar.
function checkPasswordStrength(passwordText) {
    // Variable declarations for the scores and checks.
    let strength = 0; // The "Overall Strength" bar.
    let lengthScore = 0; // The "Guessing Difficulty" bar.
    let diversityScore = 0; // The "Uncommonness" bar.
    let entropyScore = 0; // The "Cracking Difficulty" bar.
    const hasLower = /[a-z]/.test(passwordText);
    const hasUpper = /[A-Z]/.test(passwordText);
    const hasDigit = /[0-9]/.test(passwordText);
    const hasSpecial = /[^a-zA-Z0-9]/.test(passwordText);

    // Length-based scoring (Guessing Difficulty bar).
    if (passwordText.length >= 8) lengthScore += 20;
    if (passwordText.length >= 12) lengthScore += 20;
    if (passwordText.length >= 16) lengthScore += 20;
    if (passwordText.length >= 20) lengthScore += 20;
    if (passwordText.length >= 24) lengthScore += 20;
    // Diversity scoring (Uncommonness bar).
    if (hasLower) diversityScore += 20;
    if (hasUpper) diversityScore += 20;
    if (hasDigit) diversityScore += 20;
    if (hasSpecial) diversityScore += 20;
    // Extra points for having all character types!
    if (hasLower && hasUpper && hasDigit && hasSpecial) diversityScore += 20;
    // Entropy-based scoring (Cracking Difficulty) bar.s
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigit) charsetSize += 10;
    if (hasSpecial) charsetSize += 33;
    // Calculate entropy in bits - this is an approximation for educational purposes. Still works good for showcasing.
    const entropy = Math.log2(Math.pow(Math.max(charsetSize, 1), passwordText.length));
    // Map entropy to a 0-100 scale
    if (entropy >= 128) entropyScore = 100;
    else if (entropy >= 80) entropyScore = 80;
    else if (entropy >= 60) entropyScore = 60;
    else if (entropy >= 40) entropyScore = 40;
    else entropyScore = Math.max(0, Math.min(100, entropy * 2));

    // Calculate overall strength simply by dividing the scores by 3.
    strength = (lengthScore + diversityScore + entropyScore) / 3;

    return {
        strength: strength,
        guessingDifficulty: lengthScore,
        uncommonness: diversityScore,
        crackingDifficulty: entropyScore,
        entropy: entropy.toFixed(2)
    };
}

// Simple code block and function that returns a quote string with "security" as premise.
const quotes = [
    "\"At the end of the day, the goals are simple: safety and security.\" - Jodi Rell",
    "\"The user's going to pick dancing pigs over security every time.\" - Bruce Schneier",
    "\"His computer password is \"password\".\" - Chuck Palahniuk",
    "\"What is important is no longer either a signature or a number, but a code: the code is a password.\" - Gilles Deleuze",
    "\"Passwords are like underwear: you don’t let people see it, you should change it very often, and you shouldn’t share it with strangers.\" - Chris Pirillo",
    "\"Choosing a hard-to-guess, but easy-to-remember password is important!\" - Kevin Mitnick",

]
function randomQuote() { return quotes[Math.floor(Math.random() * quotes.length)]; }

// Listens to the input field.
password.addEventListener('input', function() {
    // If the given password is over three characters long, we start the calculations and quote generation.
    if (password.value.length > 3) {
        const result = checkPasswordStrength(password.value);
        // Update the quote with a random quote.
        quote.textContent = randomQuote();
        // Update the progress bars. Essentially growing the width by the result as a percentage.
        guessingBar.style.width = result.guessingDifficulty + "%";
        uncommonnessBar.style.width = result.uncommonness + "%";
        crackingBar.style.width = result.crackingDifficulty + "%";
        overallBar.style.width = (result.strength) + "%";
        // Inform about the exact percentage of strength in console.
        console.info(result.strength);
    } else {
        // If password is small, clear the bars and provide the Schneier quote. No calculations present.
        quote.textContent = "\"The user's going to pick dancing pigs over security every time.\" - Bruce Schneier";
        guessingBar.style.width = "0%";
        uncommonnessBar.style.width = "0%";
        crackingBar.style.width = "0%";
        overallBar.style.width = "0%";
    }
});

// Toggle details dom when clicked.
document.addEventListener("DOMContentLoaded", () => {
    const allDetails = document.querySelectorAll("#details-wrapper details");

    allDetails.forEach((detail) => {
        const summary = detail.querySelector("summary");

        summary.addEventListener("click", (e) => {
            // If already open, allow it to close naturally
            if (detail.open) return;

            // Close all others
            allDetails.forEach((other) => {
                if (other !== detail) {
                    other.removeAttribute("open");
                }
            });

            // Allow default behavior: the clicked one will open
        });
    });
});
