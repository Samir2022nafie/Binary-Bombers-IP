document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirm_password"]');
            const fileInput = form.querySelector('input[type="file"]');

            if (password.value.length < 6) {
                alert('Password must be at least 6 characters!');
                e.preventDefault();
            }

            if (password.value !== confirmPassword.value) {
                alert('Passwords do not match!');
                e.preventDefault();
            }

            if (fileInput.files[0]) {
                const file = fileInput.files[0];
                const validTypes = ['image/jpeg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert('Only JPG/PNG files allowed!');
                    e.preventDefault();
                }
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5MB!');
                    e.preventDefault();
                }
            }
        });
    }
});
