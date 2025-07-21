document.getElementById('login_rec-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login_rec', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });
 
        const result = await response.json();

        if (response.ok && result.redirect) {
            window.location.href = result.redirect;
        } else {
            alert(result.message); 
        }
    } catch (error) {
        console.error('Error:', error); 
     }
});