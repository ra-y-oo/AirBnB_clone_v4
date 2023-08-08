
    let selectedAmenities = [];
    let selectedCities = [];
    let selectedStates = [];
    
    $('input[name="amenities"]').change(function() {
        let amenity = $(this).val();
        if (this.checked) {
            selectedAmenities.push(amenity);
        } else {
            selectedAmenities = selectedAmenities.filter(function(item) {
                return item !== amenity;
            });
        }
    });
    
    $('input[name="cities"]').change(function() {
        let city = $(this).val();
        if (this.checked) {
            selectedCities.push(city);
        } else {
            selectedCities = selectedCities.filter(function(item) {
                return item !== city;
            });
        }
        updateSelectedLocations();
    });
    
    $('input[name="states"]').change(function() {
        let state = $(this).val();
        if (this.checked) {
            selectedStates.push(state);
        } else {
            selectedStates = selectedStates.filter(function(item) {
                return item !== state;
            });
        }
        updateSelectedLocations();
    });
    
    function updateSelectedLocations() {
        let selectedLocations = selectedCities.concat(selectedStates);
        $('.locations h4').text('Selected Locations: ' + selectedLocations.join(', '));
    }

    $('#searchButton').click(function() {
        let requestData = {
            amenities: selectedAmenities,
            cities: selectedCities,
            states: selectedStates
        };

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                let placesSection = $('.places');
                placesSection.empty();

                response.forEach(function(place) {
                    let article = $('<article>');
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
let xhr = new XMLHttpRequest();

// Configure the request
xhr.open('POST', 'http://0.0.0.0:5001/api/v1/places_search/', true);
xhr.setRequestHeader('Content-Type', 'application/json');

// Set up a function to handle the response
xhr.onload = function() {
    if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        let placesSection = document.querySelector('.places');

        response.forEach(function(place) {
            let article = document.createElement('article');
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