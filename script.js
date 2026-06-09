// Toggle Password Visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = event.target;
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.textContent = '🙈';
    } else {
        field.type = 'password';
        icon.textContent = '👁️';
    }
}

// Form Submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const inviteCode = document.getElementById('inviteCode').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    let isValid = true;
    let errorMessages = [];
    
    // Phone validation
    if (!phone || phone.length !== 10) {
        errorMessages.push('Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Password validation
    if (!password || password.length < 6) {
        errorMessages.push('Password must be at least 6 characters long');
        isValid = false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        errorMessages.push('Passwords do not match');
        isValid = false;
    }
    
    // Terms validation
    if (!agreeTerms) {
        errorMessages.push('Please agree to the Privacy Agreement');
        isValid = false;
    }
    
    // Show errors or success
    if (!isValid) {
        showError(errorMessages.join('\n'));
        return;
    }
    
    // Save to localStorage (for demo purposes)
    const userData = {
        phone: '+91' + phone,
        inviteCode: inviteCode || 'N/A',
        registeredAt: new Date().toLocaleString(),
        points: 100 // Starting points
    };
    
    localStorage.setItem('userRegistration', JSON.stringify(userData));
    
    // Show success message
    showSuccess('Registration successful! Redirecting...');
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
});

// Show Error Message
function showError(message) {
    const form = document.getElementById('registrationForm');
    let errorDiv = form.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

// Show Success Message
function showSuccess(message) {
    const form = document.getElementById('registrationForm');
    let successDiv = form.querySelector('.success-message');
    
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        form.insertBefore(successDiv, form.firstChild);
    }
    
    successDiv.textContent = message;
    successDiv.classList.add('show');
}

// Real-time validation
document.getElementById('phone').addEventListener('input', function(e) {
    // Only allow numbers
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('password').addEventListener('input', function(e) {
    if (this.value.length >= 6) {
        this.style.borderColor = '#27ae60';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

document.getElementById('confirmPassword').addEventListener('input', function(e) {
    const password = document.getElementById('password').value;
    if (this.value === password && this.value.length > 0) {
        this.style.borderColor = '#27ae60';
    } else if (this.value.length > 0) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});