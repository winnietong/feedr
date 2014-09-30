/**
 * Created by winnie on 8/7/14.
 */
//<script type="text/javascript">
//        var photoData = {{ photo_json|safe }};
//    </script>

$(document).ready(function(){
    function initialize() {
        var map_canvas = $('#map_canvas')[0];
        var map_options = {
            center: new google.maps.LatLng(39.50, -98.35),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(map_canvas, map_options);
        for (var i = 0; i < photoData.length; i++) {
            var photo = photoData[i];
            if (photo.place != undefined) {
                addMarker(photo, map);
            }
        }
    }

    function addMarker(photo, map) {

        var infowindow = new google.maps.InfoWindow({
            content: "<img src='"+photo.images[2].source+"'>"
        });

        var myLatLng = new google.maps.LatLng(photo.place.location.latitude,
                                              photo.place.location.longitude);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: photo.picture
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
            // Log photo so users can see image object information
            console.log(photo)
        });

    }

    initialize();

});