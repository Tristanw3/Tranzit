jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC670-QKb9-0B869p8HZ-UmX0VyNCvBvNc&sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Macquarie University, Sydney', -33.7757052,151.1130988],
        ['Macquarie Centre, Sydney', -33.7767314,151.1191038],
        ['Balaclava Rd after university Av', -33.7769876, 151.110085],
        ['Khartoum Rd Before Talavera Rd', -33.7795375, 151.1243744]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Macquarie University Cycle Hub</h3>' +
        '<p>Macquarie University Cycle Hub has 10 cycle ports with 5 electric cycles and 5 manual cycles. </p>' +        '</div>'],
        ['<div class="info_content">' +
        '<h3>Macquarie Centre Cycle Hub</h3>' +
        '<p>Macquarie Centre Cycle Hub has 30 cycle ports with 15 electric cycles and 15 manual cycle.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Balaclava Rd after university Av</h3>' +
        '<p>Really close to the Balaclava Rd bus station, has total of 15 ports with 8 electric cycles and 7 pedal cycles.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Khartoum Rd Before Talavera Rd</h3>' +
        '<p>Really close to the Khartoum Rd bus station, has total of 10 ports with 6 electric cycles and 4 pedal cycles.</p>' +
        '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}
