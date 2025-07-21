async function fetchAcceptedRequests() {
    try {
        const response = await fetch('/accepted_requests');
        
        if (!response.ok) {
            throw new Error('Failed to fetch accepted requests');
        }

        // Parse the JSON response
        const acceptedRequests = await response.json();

        // Get the container to display accepted requests
        const container = document.getElementById('accepted-requests-container');
        container.innerHTML = ""; // Clear any existing content

        // If no accepted requests, show a message
        if (acceptedRequests.length === 0) {
            container.innerHTML = "<p>No accepted requests found.</p>";
            return;
        }

        // Loop through each request and display it
        acceptedRequests.forEach(request => {
            const requestDiv = document.createElement('div');
            requestDiv.classList.add('accepted-request');

            requestDiv.innerHTML = `
                <h3>Recipient Name: ${request.receiver_name}</h3>
                <p>Address: ${request.receiver_address}, ${request.receiver_city}, ${request.receiver_state}, ${request.receiver_pincode}</p>
                <p>Contact: ${request.receiver_phone}</p>
            `;

            // Append the request to the container
            container.appendChild(requestDiv);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading accepted requests.');
    }
}

// Fetch accepted requests when the page loads
window.onload = fetchAcceptedRequests;








// Function to fetch book accepted requests from the server
async function fetchAcceptedbookRequests() {
    try {
        // Send a GET request to the server to get accepted requests
        const response = await fetch('/accepted_book_requests');
        
        if (!response.ok) {
            throw new Error('Failed to fetch accepted requests');
        }

        // Parse the JSON response
        const acceptedbookRequests = await response.json();

        // Get the container to display accepted requests
        const container = document.getElementById('accepted-book-requests-container');
        container.innerHTML = ""; // Clear any existing content

        // If no accepted requests, show a message
        if (acceptedbookRequests.length === 0) {
            container.innerHTML = "<p>No accepted requests found.</p>";
            return;
        }

        // Loop through each request and display it
        acceptedbookRequests.forEach(request => {
            const requestDiv = document.createElement('div');
            requestDiv.classList.add('accepted-book-request');

            requestDiv.innerHTML = `
                <h3>Recipient Name: ${request.receiver_name}</h3>
                <p>Address: ${request.receiver_address}, ${request.receiver_city}, ${request.receiver_state}, ${request.receiver_pincode}</p>
                <p>Contact: ${request.receiver_phone}</p>
            `;

            // Append the request to the container
            container.appendChild(requestDiv);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading accepted requests.');
    }
}

// Fetch accepted cloth requests when the page loads
window.onload = fetchAcceptedbookRequests;








// Function to fetch accepted requests from the server
async function fetchAcceptedclothRequests() {
    try {
        // Send a GET request to the server to get accepted requests
        const response = await fetch('/accepted_cloth_requests');
        
        if (!response.ok) {
            throw new Error('Failed to fetch accepted requests');
        }

        // Parse the JSON response
        const acceptedclothRequests = await response.json();

        // Get the container to display accepted requests
        const container = document.getElementById('accepted-cloth-requests-container');
        container.innerHTML = ""; // Clear any existing content

        // If no accepted requests, show a message
        if (acceptedclothRequests.length === 0) {
            container.innerHTML = "<p>No accepted requests found.</p>";
            return;
        }

        // Loop through each request and display it
        acceptedclothRequests.forEach(request => {
            const requestDiv = document.createElement('div');
            requestDiv.classList.add('accepted-cloth-request');

            requestDiv.innerHTML = `
                <h3>Recipient Name: ${request.receiver_name}</h3>
                <p>Address: ${request.receiver_address}, ${request.receiver_city}, ${request.receiver_state}, ${request.receiver_pincode}</p>
                <p>Contact: ${request.receiver_phone}</p>
            `;

            // Append the request to the container
            container.appendChild(requestDiv);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading accepted requests.');
    }
}

// Fetch accepted requests when the page loads
window.onload = fetchAcceptedclothRequests;