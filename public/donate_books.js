document.querySelector('form').onsubmit = async function(event) {
    event.preventDefault();
  
    const book_name = document.getElementById('book_name').value;
    const genre = document.getElementById('genre').value;
    const author = document.getElementById('author').value;
    const quantity = document.getElementById('quantity').value;
    const book_condition = document.getElementById('book_condition').value;
    const age_group = document.getElementById('age_group').value;
    const donor_name = document.getElementById('donor_name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const phone_number = document.getElementById('phone_number').value;
  
    try {
        const response = await fetch('/donate_books', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            book_name,
            genre,
            author,
            quantity,
            book_condition,
            age_group,
            donor_name,
            address,
            city,
            state,
            pincode,
            phone_number
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            alert('Failed to submit donation. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while submitting your donation. Please try again later.');
    }
  }