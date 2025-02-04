// DOM Elements
const homepage = document.getElementById("homepage");
const nameInput = document.getElementById("name-input");
const searchButton = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultImage = document.getElementById("result-image");
const restartButton = document.getElementById("restart-button");

// Object to track search counts
const searchCounts = JSON.parse(localStorage.getItem("searchCounts")) || {};

// Event Listener for the Search Button
searchButton.addEventListener("click", () => {
  const name = nameInput.value.trim().toLowerCase(); // Get the name in lowercase
  if (name) {
    updateSearchCount(name); // Update the search count
    searchImage(name); // Search for the image
  } else {
    alert("Please enter your name!"); // Show an alert if the input is empty
  }
});

// Function to Update Search Count
function updateSearchCount(name) {
  if (searchCounts[name]) {
    searchCounts[name]++; // Increment the count if the name already exists
  } else {
    searchCounts[name] = 1; // Initialize the count if the name is new
  }
  localStorage.setItem("searchCounts", JSON.stringify(searchCounts)); // Save to localStorage
  console.log(searchCounts); // Log the search counts to the console (for debugging)
}

// Function to Search for the Image
function searchImage(name) {
  const imagePath = `images/${name}.jpg`; // Path to the image file
  const img = new Image(); // Create a new image object
  img.src = imagePath;

  // Check if the image exists
  img.onload = () => {
    homepage.style.display = "none"; // Hide the homepage
    resultContainer.style.display = "block"; // Show the result container
    resultTitle.textContent = `Here's your picture with me, ${name}! (Searched ${searchCounts[name]} times)`;
    resultImage.src = imagePath; // Display the image
  };

  img.onerror = () => {
    homepage.style.display = "none"; // Hide the homepage
    resultContainer.style.display = "block"; // Show the result container
    resultTitle.textContent = `Sorry, no picture found for ${name}! (Searched ${searchCounts[name]} times)`;
    resultImage.src = "images/default.jpg"; // Display a default image
  };
}

// Event Listener for the Restart Button
restartButton.addEventListener("click", () => {
  resultContainer.style.display = "none"; // Hide the result container
  homepage.style.display = "block"; // Show the homepage
  nameInput.value = ""; // Clear the input field
});