document.querySelector('form').onsubmit = async function(event) {
  event.preventDefault();

  const food_item_name = document.getElementById('food_item_name').value;
  const quantity = document.getElementById('quantity').value;
  const item_type = document.getElementById('item_type').value;
  const donor_name = document.getElementById('donor_name').value;
  const street_address = document.getElementById('street_address').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const pincode = document.getElementById('pincode').value;
  const phone_number = document.getElementById('phone_number').value;

  try {
      const response = await fetch('/donate_food', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              food_item_name,
              quantity,
              item_type,
              donor_name,
              street_address,
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