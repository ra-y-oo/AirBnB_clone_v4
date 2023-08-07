let amenitiesList = {}; // Using an object (dictionary) to store the Amenity IDs
  
  // Listen for changes on input checkboxes inside the .Amenities div
  $('.amenities .popover input').on('change', 'input[type="checkbox"]', function() {
    let amenityID = $(this).val(); // Get the value (Amenity ID) of the clicked checkbox
    
    if ($(this).is(':checked')) {
      // Checkbox is checked, add the Amenity ID to the list
      amenitiesList[amenityID] = true;
    } else {
      // Checkbox is unchecked, remove the Amenity ID from the list
      delete amenitiesList[amenityID];
    }
    
    // Update the h4 tag with the list of Amenities checked
    let amenitiesText = Object.keys(amenitiesList).map(function(id) {
      return 'Amenity ' + id;
    }).join(', ');
    
    $('.Amenities h4').text('Amenities: ' + amenitiesText);
  });