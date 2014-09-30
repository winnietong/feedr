/**
 * Created by winnietong on 9/30/14.
 */

/**
 * Created by winnie on 8/7/14.
 */


$(document).ready(function(){

    var access_token = document.URL.split('=')[1];
    var photoData = '';

    function initialize(photoData) {
        var map_canvas = $('#map_canvas')[0];
        var map_options = {
            center: new google.maps.LatLng(37.786, -122.401),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(map_canvas, map_options);
        for (var i = 0; i < photoData.length; i++) {
            var photo = photoData[i];
            console.log(photo);
            if (photo.location != undefined) {
                addMarker(photo, map);
            }
        }
    }

    function addMarker(photo, map) {
        var infowindow = new google.maps.InfoWindow({
            content: "<img src='"+photo.images.standard_resolution.url+"'>"
        });

        var myLatLng = new google.maps.LatLng(photo.location.latitude,
                                              photo.location.longitude);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: photo.images.thumbnail.url
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
            // Log photo so users can see image object information
            console.log(photo)
        });
    }

    initialize(photoData);

    $(document).on('click', '#getData', function(){
        show_images();
    });

    function show_images(){
        $.ajax({
            url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token,
            type: "GET",
            dataType: 'jsonp',
            success: function(response) {
                initialize(response.data);
            },
            error: function(response) {
                console.log(response);
            }
        });
    }
});

