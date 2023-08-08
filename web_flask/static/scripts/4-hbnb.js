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
  
  $('#searchButton').click(function() {
    var selectedAmenities = [];
    $('input[name="amenities"]:checked').each(function() {
        selectedAmenities.push($(this).val());
    });

    var requestData = {
        amenities: selectedAmenities
    };

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        success: function(response) {
            var placesSection = $('.places');
            placesSection.empty();

            response.forEach(function(place) {
                var article = $('<article>');
                article.append('<h2>' + place.name + '</h2><p>' + place.description + '</p>');
                placesSection.append(article);
            });
        },
        error: function() {
            console.error('Error: Unable to retrieve places.');
        }
    });
});

// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Configure the request
xhr.open('POST', 'http://0.0.0.0:5001/api/v1/places_search/', true);
xhr.setRequestHeader('Content-Type', 'application/json');

// Set up a function to handle the response
xhr.onload = function() {
    if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var placesSection = document.querySelector('.places');

        response.forEach(function(place) {
            var article = document.createElement('article');
            article.innerHTML = '<h2>' + place.name + '</h2><p>' + place.description + '</p>';
            placesSection.appendChild(article);
        });
    } else {
        // Handle error here
        console.error('Error:', xhr.statusText);
    }
};

// Set up a function to handle network errors
xhr.onerror = function() {
    // Handle error here
    console.error('Network error');
};

// Send the request
xhr.send(JSON.stringify({}));