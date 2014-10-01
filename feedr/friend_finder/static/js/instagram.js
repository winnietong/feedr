/**
 * Created by winnietong on 9/30/14.
 */


$(document).ready(function(){

    var access_token = document.URL.split('=')[1];
    var mapInfo = [];

    function initialize(photoData) {
        var map_canvas = $('#map_canvas')[0];
        var map_options = {
            center: new google.maps.LatLng(37.786, -122.401),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(map_canvas, map_options);
        if (source=='instagram') {
            for (var i = 0; i < photoData.length; i++) {
                var photo = photoData[i];
                if (photo.location != undefined) {
                    imageInfo = {};
                    imageInfo.link = photo.link;
                    imageInfo.thumbnail = photo.images.thumbnail.url;
                    imageInfo.low_resolution = photo.images.low_resolution.url;
                    imageInfo.latitude = photo.location.latitude;
                    imageInfo.longitude = photo.location.longitude;
                }
                addMarker(imageInfo, map);
                mapInfo.push(imageInfo);
            }
        }
        else {
            for (var i = 0; i < photoData.length; i++) {
            var photo = photoData[i].fields;
            addMarker(photo, map);
            }
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

    $(document).on('click', '#getData', function(){
        show_images();
    });

    $(document).on('click', '#shareMap', function(){
        console.log(mapInfo);
        save_map(mapInfo);
    });

    function show_images(){
        $.ajax({
            url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token,
            type: "GET",
            dataType: 'jsonp',
            success: function(response) {
                photoData=response.data;
                initialize(photoData);
            },
            error: function(response) {
                console.log(response);
            }
        });
    }

    function save_map(mapInfo){
        mapInfo = JSON.stringify(mapInfo);
        $.ajax({
            url: "/save_map/",
            type: "POST",
            dataType: 'html',
            data: mapInfo,
            success: function(response) {
                window.alert("Your map link is http://localhost:8000/instagram/"+ response);
            },
            error: function(response) {
                console.log(response);
            }
        });
    }
});

