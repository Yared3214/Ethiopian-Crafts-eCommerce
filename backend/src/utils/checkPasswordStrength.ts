export const checkPasswordStrength = (password: string): string[] => {
    const errors: string[] = [];

    // Check the length of the password
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
    }

    // Check if the password contains both uppercase and lowercase letters
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter.');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter.');
    }

    // Check if the password contains numbers
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number.');
    }

    // Check if the password contains special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character.');
    }

    // If no errors, the password is strong
    if (errors.length === 0) {
        errors.push('Password is strong.');
    }

    return errors;
};
