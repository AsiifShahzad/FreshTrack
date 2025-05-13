document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const resetEmailInput = document.getElementById('resetEmail');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Error message elements
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const resetEmailError = document.getElementById('resetEmailError');
    
    // Modal elements
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('overlay');
    
    // Buttons and links
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const closeModalBtn = document.getElementById('closeModal');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    
    // Check if there are saved credentials
    checkSavedCredentials();
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const eyeIcon = this.querySelector('.eye-icon');
        const eyeOffIcon = this.querySelector('.eye-off-icon');
        
        eyeIcon.classList.toggle('hidden');
        eyeOffIcon.classList.toggle('hidden');
    });
    
    // Open forgot password modal
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(forgotPasswordModal);
    });
    
    // Close modals
    closeModalBtn.addEventListener('click', function() {
        closeModal(forgotPasswordModal);
    });
    
    closeSuccessModalBtn.addEventListener('click', function() {
        closeModal(successModal);
    });
    
    backToLoginBtn.addEventListener('click', function() {
        closeModal(successModal);
    });
    
    overlay.addEventListener('click', function() {
        closeModal(forgotPasswordModal);
        closeModal(successModal);
    });
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;
        
        let isValid = true;
        
        // Validate email
        if (!email) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        }
        
        if (isValid) {
            // Save credentials if remember me is checked
            if (rememberMe) {
                saveCredentials(email, password);
            } else {
                clearSavedCredentials();
            }
            
            // Simulate login success
            console.log('Login successful!');
            console.log('Email:', email);
            console.log('Remember me:', rememberMe);
            
            // In a real application, you would send the data to the server here
            // For demo purposes, we'll just redirect to a dashboard page after a delay
            setTimeout(function() {
                // window.location.href = 'dashboard.html';
                alert('Login successful! Redirecting to dashboard...');
            }, 1000);
        }
    });
    
    // Reset password form submission
    resetPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error message
        resetEmailError.textContent = '';
        
        const email = resetEmailInput.value.trim();
        
        let isValid = true;
        
        // Validate email
        if (!email) {
            resetEmailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            resetEmailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate sending reset email
            console.log('Reset email sent to:', email);
            
            // In a real application, you would send the request to the server here
            // For demo purposes, we'll just show the success modal
            closeModal(forgotPasswordModal);
            resetPasswordForm.reset();
            openModal(successModal);
        }
    });
    
    // Real-time email validation
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        
        if (email && !isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    resetEmailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        
        if (email && !isValidEmail(email)) {
            resetEmailError.textContent = 'Please enter a valid email address';
        } else {
            resetEmailError.textContent = '';
        }
    });
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function openModal(modal) {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        
        // Add animation classes
        overlay.classList.add('fade-in');
        modal.classList.add('fade-in');
    }
    
    function closeModal(modal) {
        // Add fade-out animation
        overlay.classList.add('fade-out');
        modal.classList.add('fade-out');
        
        // Wait for animation to complete before hiding
        setTimeout(function() {
            overlay.style.display = 'none';
            modal.style.display = 'none';
            
            // Remove animation classes
            overlay.classList.remove('fade-in', 'fade-out');
            modal.classList.remove('fade-in', 'fade-out');
        }, 300);
    }
    
    function saveCredentials(email, password) {
        // In a real application, you would use a more secure method
        // This is just for demonstration purposes
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', btoa(password)); // Simple encoding, not secure
        localStorage.setItem('rememberMe', 'true');
    }
    
    function clearSavedCredentials() {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');
    }
    
    function checkSavedCredentials() {
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');
        const savedRememberMe = localStorage.getItem('rememberMe');
        
        if (savedEmail && savedPassword && savedRememberMe === 'true') {
            emailInput.value = savedEmail;
            passwordInput.value = atob(savedPassword); // Simple decoding
            rememberMeCheckbox.checked = true;
        }
    }
});