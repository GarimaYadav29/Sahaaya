document.getElementById('signup_don-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email_id = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5500/signup_don', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error); 
    }
});