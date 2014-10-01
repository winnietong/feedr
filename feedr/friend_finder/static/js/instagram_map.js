/**
 * Created by winnietong on 9/30/14.
 */

$(document).ready(function(){

    function initialize(photoData) {
        console.log(photoData);
        var map_canvas = $('#map_canvas')[0];
        var map_options = {
            center: new google.maps.LatLng(37.786, -122.401),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(map_canvas, map_options);
        for (var i = 0; i < photoData.length; i++) {
            var photo = photoData[i].fields;
            console.log(photo);
            addMarker(photo, map);
        }
    }

    function addMarker(photo, map) {
        var infowindow = new google.maps.InfoWindow({
            content: "<a href='"+photo.link+"'><img src='"+photo.low_resolution+"'></a>"+
                "<button id='share'>Share Photo</button>"
        });

        var myLatLng = new google.maps.LatLng(photo.latitude,
                                              photo.longitude);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: photo.thumbnail
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
            // Log photo so users can see image object information
            console.log(photo)
        });
    }

    initialize(photoData);


});

