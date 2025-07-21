// Function to fetch food donations from the server
async function fetchclothDonations(state = "", city = "", pincode = "") {
  try {
      const query = new URLSearchParams({ state, city, pincode }).toString();
      const response = await fetch(`/cloth_donations?${query}`);

      if (!response.ok) {
          throw new Error('Failed to fetch food donations');
      }

      const donations = await response.json();
      const container = document.getElementById('cloth-donations-container');
      container.innerHTML = ""; // Clear any existing content

      if (donations.length === 0) {
          container.innerHTML = "No donations found matching your criteria.";
          return;
      }

      donations.forEach(donation => {
          const donationDiv = document.createElement('div');
          donationDiv.classList.add('donation');

          donationDiv.innerHTML = `
              <h3>Food Item: ${donation.cloth_name}</h3>
              <p>Quantity: ${donation.quantity}</p>
              <p>Type: ${donation.target_group}</p>
              <p>Type: ${donation.season}</p>
              <p>Type: ${donation.cloth_condition}</p>
              <p>Type: ${donation.size}</p>
              <p>Donor Name: ${donation.donor_name}</p>
              <p>Address: ${donation.street_address}, ${donation.city}, ${donation.state}, ${donation.pincode}</p>
              <p>Contact: ${donation.phone_number}</p>
              <button onclick="showAcceptclothRequestForm(${donation.id}, '${donation.donor_name}')">Accept Request</button>
          `;

          container.appendChild(donationDiv);
      });
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while loading food donations.');
  }
}

// Show the modal to accept the request and input recipient details
function showAcceptclothRequestForm(donationId, receiver_name) {
  const modal = document.getElementById('accept-cloth-request-modal');
  modal.style.display = 'block';

  // Handle form submission for accepting request
  const form = document.getElementById('accept-cloth-request-form');
  form.onsubmit = async function(event) {
      event.preventDefault();

      const receiver_name = document.getElementById('receiver_name').value;
      const receiver_phone = document.getElementById('receiver_phone').value;
      const receiver_address = document.getElementById('receiver_address').value;
      const receiver_city = document.getElementById('receiver_city').value;
      const receiver_state = document.getElementById('receiver_state').value;
      const receiver_pincode = document.getElementById('receiver_pincode').value;

      try {
          const response = await fetch('/accept_cloth_request', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                receiver_name, 
                receiver_phone, 
                receiver_address, 
                receiver_city, 
                receiver_state, 
                receiver_pincode 
              })
          });

          const result = await response.json();
          alert(result.message);

          // Close the modal after submission
          modal.style.display = 'none';
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while accepting the request.');
      }
  };
}

// Fetch all donations on page load
window.onload = fetchFoodDonations;

// Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const pincode = document.getElementById('pincode').value;
  fetchFoodDonations(state, city, pincode);
});