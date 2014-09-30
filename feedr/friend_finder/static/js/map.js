/**
 * Created by winnie on 8/7/14.
 */


$(document).ready(function(){


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

    initialize(photoData);

    $(document).on('click', '#getData', function(){
        var month = $('#month').val();
        var year = $('#year').val();
        dateInfo = {
            'month': month,
            'year': year
        };
        $.ajax({
            url: "/return_json/",
            type: "POST",
            dataType: 'json',
            data: dateInfo,
            success: function(response) {
                initialize(response);
            },
            error: function(response) {
                console.log(response);
            }
        });
    });

});

