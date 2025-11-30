function checkPasswordStrength(password) {
    let strength = 0;

    // Length-based scoring
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Character diversity scoring
    if (/[a-z]/.test(password)) strength += 1;  // Lowercase letters
    if (/[A-Z]/.test(password)) strength += 1;  // Uppercase letters
    if (/[0-9]/.test(password)) strength += 1;  // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;  // Special characters

    // Entropy-based scoring (bit approximation)
    let entropy = Math.log2(Math.pow(95, password.length)); // 95 printable ASCII chars

    return {
        strength: Math.min(strength, 5), // Max out at 5 (Very Strong)
        entropy: entropy.toFixed(2) // Useful for password strength visualization
    };
}

// Example usage
let password = "P@ssw0rd123!";
let result = checkPasswordStrength(password);
console.log(`Strength: ${result.strength} / 5, Entropy: ${result.entropy} bits`);
