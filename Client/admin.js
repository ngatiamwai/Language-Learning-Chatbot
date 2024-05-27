async function fetchAllUsers() {
    try {
        const response = await axios.get('http://localhost:3003/user/getallusers');
        console.log('Response data:', response.data.users); // Adjust the path based on your actual API response
        return response.data.users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

function renderUsers(users) {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = user.firstName;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = user.lastName;
        row.appendChild(lastNameCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.userName;
        row.appendChild(usernameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const roleCell = document.createElement('td');
        roleCell.textContent = user.role;
        row.appendChild(roleCell);

        const phoneNumberCell = document.createElement('td');
        phoneNumberCell.textContent = user.phoneNumber;
        row.appendChild(phoneNumberCell);

        usersTableBody.appendChild(row);
    });
}

async function init() {
    const users = await fetchAllUsers();
    renderUsers(users);
}

document.addEventListener('DOMContentLoaded', init);
