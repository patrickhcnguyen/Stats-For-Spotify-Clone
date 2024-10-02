async function fetchUserProfile() {
    const response = await fetch('/profile', {
        credentials: 'include' // Include credentials to send cookies
    });

    if (response.ok) {
        const profileData = await response.json();
        displayProfile(profileData); // Call a function to display the profile data
    } else {
        console.error('Error fetching user profile:', response.status);
    }
}

function displayProfile(profile) {
    const profileContainer = document.getElementById('profile-container'); // Assume you have a div for displaying the profile

    profileContainer.innerHTML = `
        <h1>${profile.display_name}</h1>
        <img src="${profile.images[0].url}" alt="${profile.display_name}'s profile picture" />
        <p>Email: ${profile.email}</p>
        <p>Followers: ${profile.followers.total}</p>
        <p>Country: ${profile.country}</p>
        <p>Product: ${profile.product}</p>
    `;
}

// Call fetchUserProfile when the dashboard loads
document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();
});
