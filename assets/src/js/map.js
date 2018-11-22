$(document).ready(function(){
    var latitude = 47.8397256,
        longitude = 35.1007543,
        map_zoom =15;

    var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var marker_url = ( is_internetExplorer11 ) ? 'https://www.mediafire.com/convkey/d992/boaao261r6yapedzg.jpg' : 'https://www.mediafire.com/convkey/d992/boaao261r6yapedzg.jpg';

    var main_color = '#2d313f',
        saturation_value= -20,
        brightness_value= 5;

    var style= [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "color": "#101114"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#00449f"
                }
            ]
        }
    ]

    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
    }
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        icon: marker_url,
    });

    function CustomZoomControl(controlDiv, map) {
        var controlUIzoomIn= document.getElementById('zoom-in'),
            controlUIzoomOut= document.getElementById('zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom()+1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom()-1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);




    /* AUTHOR LINK */
    $('.about-me-img').hover(function(){
        $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
    }, function(){
        $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
    });




});