document.getElementById('codeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.target);

    // Convert form data to JSON object
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Send form data to the backend API
    fetch('http://localhost:3000/submit-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {
        if (response.ok) {
            console.log('Code submitted successfully');
            // Reset the form
            event.target.reset();
        } else {
            console.error('Error submitting code:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error submitting code:', error);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from backend API
    fetch('http://localhost:3000/submitted-entries')
    .then(response => response.json())
    .then(data => {
        // Populate table with fetched data
        const tableBody = document.querySelector('#entriesTable tbody');
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.username}</td>
                <td>${entry.language}</td>
                <td>${entry.stdin}</td>
                <td>${entry.sourceCode.slice(0, 100)}</td>
                <td>${new Date(entry.timestamp).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

