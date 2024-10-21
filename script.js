// Get references to the nav items container and the slider element
const navItemsContainer = document.getElementById("nav-items"); // Container for holding navigation items
const slider = document.getElementById("slider"); // The sliding indicator that shows the active nav item
let activeItem = null; // Variable to keep track of the currently active navigation item

// Sample JSON data representing cities for the navigation menu
const citiesData = [
  { section: "cupertino", label: "Cupertino" },
  { section: "new-york-city", label: "New York City" },
  { section: "london", label: "London" },
  { section: "amsterdam", label: "Amsterdam" },
  { section: "tokyo", label: "Tokyo" },
  { section: "hong-kong", label: "Hong Kong" },
  { section: "sydney", label: "Sydney" },
];

// Function to dynamically create and populate the navigation items
function populateNavItems() {
  // Iterate over the citiesData array to create a navigation item for each city
  citiesData.forEach((city) => {
    const navItem = document.createElement("li"); // Create a new 'li' element for the nav item
    navItem.className = "nav-item"; // Assign the 'nav-item' class to the element for styling
    navItem.dataset.city = city.label; // Set the custom data attribute 'data-city' with the city's label
    navItem.innerText = city.label; // Set the visible text of the nav item to the city's label

    // Add a click event listener for each nav item
    navItem.addEventListener("click", function () {
      // Remove the 'active' class from the previously active item (if any)
      if (activeItem) {
        activeItem.classList.remove("active"); // Deselect the previously active nav item to update its style
      }

      // Set the clicked item as the active item and add the 'active' class for styling
      this.classList.add("active"); // Add 'active' class to the clicked nav item for styling
      activeItem = this; // Update the reference to the currently active item

      // Update the slider's position and size to match the clicked item
      updateSliderPosition(this); // Call function to adjust the slider based on the clicked item

      // Display the current time for the selected city
      const cityName = this.dataset.city; // Get the city name from the 'data-city' attribute of the clicked item
      displayCityTime(cityName); // Call the function to display the city's current time
    });

    // Append the newly created nav item to the nav items container
    navItemsContainer.appendChild(navItem); // Add the nav item to the list of navigation items
  });
}

// Function to update the position and size of the slider
function updateSliderPosition(target) {
  const rect = target.getBoundingClientRect(); // Get the dimensions and position of the clicked item
  slider.style.width = `${rect.width}px`; // Set the slider width to match the width of the nav item
  slider.style.left = `${rect.left + window.scrollX}px`; // Adjust the slider's left position to align with the nav item, accounting for any horizontal scroll
}

// Function to display the current time for the selected city
function displayCityTime(city) {
  // Get the current time in the appropriate time zone for the selected city
  const now = new Date().toLocaleTimeString("en-US", {
    timeZone: getTimeZone(city), // Get the time zone using the helper function based on the city
    hour: "2-digit", // Format for the hour
    minute: "2-digit", // Format for the minute
  });

  // Update the content of the 'city-time' element to show the city's current time
  document.getElementById(
    "city-time"
  ).innerText = `Current time in ${city}: ${now}`; // Display the formatted time using template literals for interpolation
}

// Helper function to return the time zone for a given city
function getTimeZone(city) {
  // Define a mapping between city names and their respective time zones
  const timeZones = {
    Cupertino: "America/Los_Angeles",
    "New York City": "America/New_York",
    London: "Europe/London",
    Amsterdam: "Europe/Amsterdam",
    Tokyo: "Asia/Tokyo",
    "Hong Kong": "Asia/Hong_Kong",
    Sydney: "Australia/Sydney",
  };
  return timeZones[city]; // Return the correct time zone for the given city
}

// Initialize the navigation items when the page loads
populateNavItems(); // Call the function to populate nav items dynamically

// Add an event listener to update the slider's position when the window is resized
window.addEventListener("resize", () => {
  if (activeItem) {
    updateSliderPosition(activeItem); // Recalculate and adjust the slider if an item is active, ensuring it remains correctly positioned
  }
});
