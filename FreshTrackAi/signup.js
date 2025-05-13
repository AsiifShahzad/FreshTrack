document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const signupForm = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsAgreement');
    const marketingCheckbox = document.getElementById('marketingConsent');
    
    // Password strength elements
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const lowercaseCheck = document.getElementById('lowercase-check');
    const numberCheck = document.getElementById('number-check');
    const specialCheck = document.getElementById('special-check');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    
    // Modal elements
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('overlay');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
    const goToLoginBtn = document.getElementById('goToLoginBtn');
    
    // Toggle password visibility buttons
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, this);
    });
    
    toggleConfirmPasswordBtn.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, this);
    });
    
    function togglePasswordVisibility(inputField, toggleBtn) {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        
        const eyeIcon = toggleBtn.querySelector('.eye-icon');
        const eyeOffIcon = toggleBtn.querySelector('.eye-off-icon');
        
        eyeIcon.classList.toggle('hidden');
        eyeOffIcon.classList.toggle('hidden');
    }
    
    // Password strength checker
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
        
        // Check if passwords match when typing
        if (confirmPasswordInput.value) {
            checkPasswordsMatch();
        }
    });
    
    confirmPasswordInput.addEventListener('input', checkPasswordsMatch);
    
    function checkPasswordStrength(password) {
        let strength = 0;
        
        // Check length
        if (password.length >= 8) {
            strength += 1;
            lengthCheck.classList.add('valid');
        } else {
            lengthCheck.classList.remove('valid');
        }
        
        // Check uppercase
        if (/[A-Z]/.test(password)) {
            strength += 1;
            uppercaseCheck.classList.add('valid');
        } else {
            uppercaseCheck.classList.remove('valid');
        }
        
        // Check lowercase
        if (/[a-z]/.test(password)) {
            strength += 1;
            lowercaseCheck.classList.add('valid');
        } else {
            lowercaseCheck.classList.remove('valid');
        }
        
        // Check numbers
        if (/[0-9]/.test(password)) {
            strength += 1;
            numberCheck.classList.add('valid');
        } else {
            numberCheck.classList.remove('valid');
        }
        
        // Check special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
            specialCheck.classList.add('valid');
        } else {
            specialCheck.classList.remove('valid');
        }
        
        // Update strength meter
        strengthMeter.setAttribute('data-strength', strength);
        
        // Update strength text
        switch (strength) {
            case 0:
                strengthText.textContent = 'Too weak';
                break;
            case 1:
                strengthText.textContent = 'Weak';
                break;
            case 2:
                strengthText.textContent = 'Fair';
                break;
            case 3:
                strengthText.textContent = 'Good';
                break;
            case 4:
            case 5:
                strengthText.textContent = 'Strong';
                break;
        }
        
        return strength;
    }
    
    function checkPasswordsMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            return false;
        } else {
            confirmPasswordError.textContent = '';
            return true;
        }
    }
    
    // Form validation
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset all error messages
        resetErrorMessages();
        
        let isValid = true;
        
        // Validate full name
        if (!fullNameInput.value.trim()) {
            fullNameError.textContent = 'Full name is required';
            isValid = false;
        } else if (fullNameInput.value.trim().length < 2) {
            fullNameError.textContent = 'Please enter your full name';
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate phone (optional)
        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else {
            const passwordStrength = checkPasswordStrength(passwordInput.value);
            if (passwordStrength < 3) {
                passwordError.textContent = 'Please create a stronger password';
                isValid = false;
            }
        }
        
        // Validate confirm password
        if (!confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Please confirm your password';
            isValid = false;
        } else if (!checkPasswordsMatch()) {
            isValid = false;
        }
        
        // Validate terms agreement
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the Terms of Service and Privacy Policy';
            isValid = false;
        }
        
        // If form is valid, submit
        if (isValid) {
            // Collect form data
            const formData = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                password: passwordInput.value,
                marketingConsent: marketingCheckbox.checked
            };
            
            // In a real application, you would send this data to the server
            console.log('Form data:', formData);
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            signupForm.reset();
            resetPasswordStrength();
        }
    });
    
    // Real-time validation
    fullNameInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 2) {
            fullNameError.textContent = 'Please enter your full name';
        } else {
            fullNameError.textContent = '';
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (this.value.trim() && !isValidPhone(this.value.trim())) {
            phoneError.textContent = 'Please enter a valid phone number';
        } else {
            phoneError.textContent = '';
        }
    });
    
    // Modal functions
    function showSuccessModal() {
        overlay.style.display = 'block';
        successModal.style.display = 'block';
        
        // Add animation classes
        overlay.classList.add('fade-in');
        successModal.classList.add('fade-in');
    }
    
    function closeModal() {
        // Add fade-out animation
        overlay.classList.add('fade-out');
        successModal.classList.add('fade-out');
        
        // Wait for animation to complete before hiding
        setTimeout(function() {
            overlay.style.display = 'none';
            successModal.style.display = 'none';
            
            // Remove animation classes
            overlay.classList.remove('fade-in', 'fade-out');
            successModal.classList.remove('fade-in', 'fade-out');
        }, 300);
    }
    
    // Close modal events
    closeSuccessModalBtn.addEventListener('click', closeModal);
    
    goToLoginBtn.addEventListener('click', function() {
        closeModal();
        window.location.href = 'login.html';
    });
    
    overlay.addEventListener('click', closeModal);
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic phone validation - allows different formats
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }
    
    function resetErrorMessages() {
        fullNameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        termsError.textContent = '';
    }
    
    function resetPasswordStrength() {
        strengthMeter.setAttribute('data-strength', '0');
        strengthText.textContent = 'Too weak';
        
        // Reset requirement checks
        lengthCheck.classList.remove('valid');
        uppercaseCheck.classList.remove('valid');
        lowercaseCheck.classList.remove('valid');
        numberCheck.classList.remove('valid');
        specialCheck.classList.remove('valid');
    }
});