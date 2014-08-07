function initialize() {
    var map_canvas = document.getElementById('map_canvas');
    var map_options = {
        center: new google.maps.LatLng(39.50, -98.35),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(map_canvas, map_options);

    for (var i = 0; i < photoData.length; i++) {
        var photo = photoData[i];
        if (photo.place != undefined) {
            setTimeout(addMarker, i * 250, photo, map);
        }
    }
}

function addMarker(photo, map) {
    console.log(photo);
    var myLatLng = new google.maps.LatLng(photo.place.location.latitude, photo.place.location.longitude);
    var image = {
        url: photo.picture,
        scaledSize: new google.maps.Size(45, 45)
    };

    var contentString = '<div id="content">' +
        '<img width="200px" src="' + photo.source + '">' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);