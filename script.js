

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // PART 1 & 2: Interactive Element 1 - Light/Dark Mode Toggle (Events & DOM)
    // ----------------------------------------------------------------------

    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const MODE_KEY = 'darkModeEnabled';

    /**
     * Goal: Use event listeners to react to clicks and toggle a CSS class.
     * This function implements persistent theme switching.
     */
    function initializeTheme() {
        // Load theme preference from localStorage
        const isDarkMode = localStorage.getItem(MODE_KEY) === 'true';
        if (isDarkMode) {
            body.classList.replace('light-mode', 'dark-mode');
            modeToggle.textContent = 'Toggle Light Mode';
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            modeToggle.textContent = 'Toggle Dark Mode';
        }
    }

    // Event listener to handle the toggle button click
    modeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        
        // Use classList.replace for clean toggling
        body.classList.toggle('light-mode', !isDark);

        // Update button text
        modeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
        
        // Save preference to local storage
        localStorage.setItem(MODE_KEY, isDark);
        console.log(`Theme switched to: ${isDark ? 'Dark' : 'Light'}`);
    });

    // Initialize the theme on page load
    initializeTheme();


    // ----------------------------------------------------------------------
    // PART 2: Interactive Element 2 - Simple Counter (State Management)
    // ----------------------------------------------------------------------

    const decrementBtn = document.getElementById('decrement-btn');
    const incrementBtn = document.getElementById('increment-btn');
    const counterDisplay = document.getElementById('counter-display');
    const counterFeedback = document.getElementById('counter-feedback');
    let counterValue = 0; // State variable

    /**
     * Updates the DOM element and provides feedback based on the current state.
     */
    function updateCounterDisplay() {
        counterDisplay.textContent = counterValue;
        
        if (counterValue === 0) {
            counterFeedback.textContent = 'Counter is reset.';
        } else if (counterValue > 5) {
            counterFeedback.textContent = 'The counter is getting high!';
        } else {
            counterFeedback.textContent = '';
        }
    }

    // Event listeners for counter buttons
    incrementBtn.addEventListener('click', () => {
        counterValue++;
        updateCounterDisplay();
    });

    decrementBtn.addEventListener('click', () => {
        if (counterValue > 0) {
            counterValue--;
            updateCounterDisplay();
        } else {
            counterFeedback.textContent = 'Cannot go below zero!';
        }
    });


    // ----------------------------------------------------------------------
    // PART 2: Interactive Element 3 - Collapsible FAQ (Hiding/Showing Content)
    // ----------------------------------------------------------------------
    
    // Select all FAQ headers
    const faqHeaders = document.querySelectorAll('.faq-header');

    // Attach event listener to each header using forEach loop (Part 1/2)
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Get the sibling element that holds the content
            const content = header.nextElementSibling;

            // Toggle the 'open' class to control the max-height/padding via CSS
            content.classList.toggle('open'); 

            // Optional: Close all other open FAQs
            faqHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.nextElementSibling.classList.remove('open');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // PART 3: Custom Form Validation with JavaScript
    // ----------------------------------------------------------------------

    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const agreeInput = document.getElementById('reg-agree');
    const formFeedback = document.getElementById('form-feedback');

    /**
     * Displays a custom error message next to the field.
     * @param {HTMLElement} inputElement - The field with the error.
     * @param {string} message - The error message to display.
     */
    function setError(inputElement, message) {
        const errorSpan = document.getElementById(inputElement.id + '-error');
        inputElement.classList.add('invalid');
        errorSpan.textContent = message;
    }

    /**
     * Clears any error message for the field.
     * @param {HTMLElement} inputElement - The field to clear.
     */
    function clearError(inputElement) {
        const errorSpan = document.getElementById(inputElement.id + '-error');
        inputElement.classList.remove('invalid');
        errorSpan.textContent = '';
    }

    /**
     * Validates the Name field (required, min length 3).
     * @returns {boolean} True if valid, false otherwise.
     */
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 3) {
            setError(nameInput, 'Name must be at least 3 characters.');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    /**
     * Validates the Email field (required, basic regex pattern check).
     * @returns {boolean} True if valid, false otherwise.
     */
    function validateEmail() {
        const email = emailInput.value.trim();
        // Regular Expression for a basic email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (!emailPattern.test(email)) {
            setError(emailInput, 'Please enter a valid email address.');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    /**
     * Validates the Password field (required, min 8 chars, must contain a number).
     * @returns {boolean} True if valid, false otherwise.
     */
    function validatePassword() {
        const password = passwordInput.value;
        // Regular Expression for at least one digit
        const digitPattern = /\d/; 

        if (password.length < 8) {
            setError(passwordInput, 'Password must be at least 8 characters.');
            return false;
        }
        if (!digitPattern.test(password)) {
            setError(passwordInput, 'Password must contain at least one number.');
            return false;
        }
        clearError(passwordInput);
        return true;
    }

    /**
     * Validates the Checkbox field (must be checked).
     * @returns {boolean} True if valid, false otherwise.
     */
    function validateAgreement() {
        if (!agreeInput.checked) {
            setError(agreeInput, 'You must agree to the terms.');
            return false;
        }
        clearError(agreeInput);
        return true;
    }

    // --- Event Listeners for Validation ---

    // 1. Validate on user input (live feedback)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    agreeInput.addEventListener('change', validateAgreement);


    // 2. Validate on form submission (final check)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the default HTML submission

        // Run all validation checks
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isAgreeValid = validateAgreement();

        // Check if ALL validations passed (logical AND operator)
        if (isNameValid && isEmailValid && isPasswordValid && isAgreeValid) {
            // Show Success Feedback
            formFeedback.classList.remove('feedback-error');
            formFeedback.classList.add('feedback-success');
            formFeedback.textContent = 'Success! Form submitted and data is valid.';
            
            // In a real application, you would send the data to a server here.
            form.reset(); // Clear the form after success
        } else {
            // Show Error Feedback
            formFeedback.classList.remove('feedback-success');
            formFeedback.classList.add('feedback-error');
            formFeedback.textContent = 'Error: Please fix the highlighted fields.';
            
            // Focus on the first invalid field for better UX
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isPasswordValid) passwordInput.focus();
            else if (!isAgreeValid) agreeInput.focus();
        }
    });

});