(function(){
    'use strict';
     var windowWidth = $(window).width();

    //smooth scrolling, credits: css-tricks.com
    // https://css-tricks.com/snippets/jquery/smooth-scrolling/
    function smoothScroll() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                if (target.length) {
                    $('html, body').animate({
                      scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    };

    // manages the animation of navbar on scrolling
    function animateNavbar(){
        var top = $(window).scrollTop();

        if (windowWidth >= 700){ /*apply animation on scrolling only on big screens*/
            if (top >= 85 && !$('#navbar-top').hasClass('nav-fixed'))
                    $('#navbar-top').addClass('nav-fixed');

            else if (top < 85 && $('#navbar-top').hasClass('nav-fixed')){
                $('#navbar-top').removeClass('nav-fixed');
                $('#navbar-top').animate({
                    marginTop: '0'},{
                    queue: false,
                    duration: 150
                    }, function() {});
            }
        }

    };

    /*Keeps the hero size equal to the window size*/
    function resizeHero(){
        var windowHeight = $(window).height();

        $('.hero').css({
            'height': windowHeight
        });
        $('.wrapper').css({
            'height': windowHeight
        });
    }


    /*Initialization and customizations of google map */
    function initMap(){
        var mapDiv = document.getElementById('map'),

            places = [
                {
                    'coord': {lat: 37.525176, lng: 15.075818},
                    'image': 'img/pin-grey.png',
                    'description': '<h3>Catania, Italy</h3><ul><li><img src="img/Università_di_Catania_logo.jpg"><h4>2007-2010 </br> University of Catania</h4><p>M.Sc., Automation engineering</p></li><li><img src="img/Università_di_Catania_logo.jpg"><h4>2002-2006</br> University of Catania</h4><p>B.Sc., Electronic engineering</p></li></ul>',
                },
                {
                    'coord': {lat: 45.068133, lng: 7.683158},
                    'image': 'img/pin-grey.png',
                    'description': '<h3>Torino, Italy</h3><ul><li><img src="img/Actia.jpg"><h4>2011-2012</br> ACTIA Italia S.r.L.</h4><p>Software Developer</p></li><li><img src="img/Cnh_industrial_logo.jpg"><h4>2010-2011</br> CNH Industrial</br>(formerly Iveco S.p.A.)</h4><p>Electronic Systems Engineer</p></li></ul>',
                },
                {
                    'coord': {lat: 42.655697, lng: -83.233414},
                    'image': 'img/pin-grey.png',
                    'description': '<h3>Auburn Hills, MI, USA</h3><ul><li><img src="img/fca_logo.jpg"><h4>2013-2015</br> FCA North America</h4><p>UI Software Developer</p></li></ul>',

                },
                {
                    'coord': {lat: 53.349823, lng: -6.264010},
                    'image': 'img/pin-blue.png',
                    'description': '<h3>Dublin, Ireland</h3><ul><li><h4>Current</h4><p>Front-end Developer</p></li></ul>',
                },

            ];

            var zoomValue = 3;
            if (windowWidth < 768)
                zoomValue = 1;

            var mapOptions = {
                center: {lat: 39.914036, lng: -39.778708},
                zoom: zoomValue,
                streetViewControl: false,
            },

            map = new google.maps.Map(mapDiv, mapOptions);

            var infoWindow = new google.maps.InfoWindow({
                maxWidth: 320,
            });

            /*function needed to open the info window*/
            function addInfoWindow(marker) {
                    google.maps.event.addListener(marker, 'click', function(){
                        infoWindow.open(map, marker);
                        infoWindow.setContent(marker.content);
                    });

            };

        places.forEach(function createMarkers(item){

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(item.coord),
                name: item.name,
                icon: item.image,
                content: '<div class="infoWindowContent">' + item.description +'</div>'

            });

            addInfoWindow(marker);

            /*create the info windows */
           /* var infoWindow = new google.maps.InfoWindow({
                maxWidth: 320,
                content: '<div class="infoWindowContent">' + item.description +'</div>'
            });
*/


           /* marker.addListener('click', function() {
                marker.infoWindow.open(map, marker);

            });*/



        });

    }



    // Picks a random number
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    //picks a different image at each reloading
    function getRandomBg(){
        var imgTable = [
            {
            'big': 'url(./img/DSCF1027-mod.JPG)',
            'small':'url(./img/DSCF1027-mod-small.JPG)'
            },
            {
            'big': 'url(./img/DSCF0388-mod.JPG)',
            'small':'url(./img/DSCF0388-mod-small.JPG)'
            },
            {
            'big': 'url(./img/DSCF2996-mod.JPG)',
            'small':'url(./img/DSCF2996-mod-small.JPG)'
            },
            {
            'big': 'url(./img/DSCF2997-mod.JPG)',
            'small':'url(./img/DSCF2997-mod-small.JPG)'
            },
            {
            'big': 'url(./img/DSCF3268-mod.JPG)',
            'small':'url(./img/DSCF3268-mod-small.JPG)'
            },
            {
            'big': 'url(./img/DSCF0975-mod.JPG)',
            'small':'url(./img/DSCF0975-mod-small.JPG)'
            },
        ],

        newBg = getRandomNumber(0, imgTable.length);
        if (windowWidth >768)
            $('.wrapper').css('background-image', imgTable[newBg].big);
        else
            $('.wrapper').css('background-image', imgTable[newBg].small);

    }

    // execute when the document is ready
    $(document).ready(function(){
        smoothScroll();
        resizeHero();
        initMap();
        getRandomBg();

        // On window scroll
        $(window).scroll(function() {
            animateNavbar();
        });

        //on window resize
        $(window).resize(function() {
            resizeHero();
        });

        //manage active state in the navbar
        $(".nav a").on("click", function(){
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });

    });

})();