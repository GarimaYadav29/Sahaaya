document.querySelector('form').onsubmit = async function(event) {
    event.preventDefault();
  
    const cloth_name = document.getElementById('cloth_name').value;
    const quantity = document.getElementById('quantity').value;
    const target_group = document.getElementById('target_group').value;
    const season = document.getElementById('season').value;
    const cloth_condition = document.getElementById('cloth_condition').value;
    const size = document.getElementById('size').value;
    const donor_name = document.getElementById('donor_name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const phone = document.getElementById('phone').value;
  
    try {
        const response = await fetch('/donate_clothes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                cloth_name,
                quantity,
                target_group,
                season,
                cloth_condition,
                size,
                donor_name,
                address,
                city,
                state,
                pincode,
                phone
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