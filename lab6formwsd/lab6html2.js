document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const dobInput = document.getElementById('dob');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const ageInput = document.getElementById('age');
    const successMessage = document.getElementById('successMessage');

    const firstnameError = document.getElementById('firstnameError');
    const lastnameError = document.getElementById('lastnameError');
    const dobError = document.getElementById('dobError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function validateForm() {
        let isValid = true;

        // Validate First Name
        if (firstnameInput.value.trim() === '') {
            firstnameInput.classList.add('invalid');
            firstnameError.style.display = 'block';
            isValid = false;
        } else {
            firstnameInput.classList.remove('invalid');
            firstnameInput.classList.add('valid');
            firstnameError.style.display = 'none';
        }

        // Validate Last Name
        if (lastnameInput.value.trim() === '') {
            lastnameInput.classList.add('invalid');
            lastnameError.style.display = 'block';
            isValid = false;
        } else {
            lastnameInput.classList.remove('invalid');
            lastnameInput.classList.add('valid');
            lastnameError.style.display = 'none';
        }

        // Validate Date of Birth
        const dobValue = dobInput.value;
        const dobPattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        const age = calculateAge(dobValue);
        ageInput.value = age; // Display age

        if (!dobPattern.test(dobValue) || isNaN(age)) {
            dobInput.classList.add('invalid');
            dobError.style.display = 'block';
            dobError.textContent = 'Enter a valid date in YYYY-MM-DD format.';
            isValid = false;
        } else if (age < 18) {
            dobInput.classList.add('invalid');
            dobError.style.display = 'block';
            dobError.textContent = 'You must be at least 18 years old.';
            submitBtn.disabled = true;
            isValid = false;
        } else {
            dobInput.classList.remove('invalid');
            dobInput.classList.add('valid');
            dobError.style.display = 'none';
            submitBtn.disabled = false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailError.style.display = 'block';
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailError.style.display = 'none';
        }

        // Validate Password
        const passwordValue = passwordInput.value;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // At least 8 chars, 1 letter, 1 number, 1 special char
        if (!passwordPattern.test(passwordValue)) {
            passwordInput.classList.add('invalid');
            passwordError.style.display = 'block';
            passwordError.textContent = 'Password must be at least 8 characters long and include letters, numbers, and special characters.';
            isValid = false;
        } else {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            passwordError.style.display = 'none';
        }

        // Validate Confirm Password
        const confirmPasswordValue = confirmPasswordInput.value;
        if (confirmPasswordValue !== passwordValue) {
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordError.style.display = 'block';
            confirmPasswordError.textContent = 'Passwords must match.';
            isValid = false;
        } else {
            confirmPasswordInput.classList.remove('invalid');
            confirmPasswordInput.classList.add('valid');
            confirmPasswordError.style.display = 'none';
        }

        return isValid;
    }

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            event.preventDefault();
            successMessage.classList.remove('hidden');
            form.reset();
            submitBtn.disabled = true;
            resetBtn.disabled = true; 

           
            const modal = new bootstrap.Modal(document.getElementById('myModal'));
            modal.show();

            
            setTimeout(function() {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    });

    form.addEventListener('reset', function() {
        submitBtn.disabled = false; 
        resetBtn.disabled = false; 
        successMessage.classList.add('hidden');
    });

    resetBtn.disabled = false;
});
