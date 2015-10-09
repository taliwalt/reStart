var image = {
                url: 'https://cdn3.iconfinder.com/data/icons/search-optimization/512/pin_map_development_marker_optimization_flat_icon-512.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                //origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
        };

        var t, map;
        var myjson = [];
        $.getJSON("/api/conversations", function(json){
                console.log("json")
                console.log( json )
                myjson = json;
             });

        function fillInfo( convo, marker ) {
          var topicList = ""
          for ( var i = 0; i < convo.topics.length; i ++ ) {
            topicList += convo.topics[ i ] + ", "
          }
          marker.window.content =
                "<p>owner: " + convo.owner + ",</p>" +
                "<p>Topics: " + topicList + "</p>" +
                "<p>Location: " + convo.location + "</p>"
        }

        function addMarker( latitude, longitude, map ) {
          console.log( this )
          var newMark = new google.maps.Marker( {
              position: new google.maps.LatLng( latitude, longitude ),
              cnt: true,
              icon: 'assets/images/fogoSmall.png',
              window: new google.maps.InfoWindow( {
                content: "This is a marker!"
              } )
          } )
           google.maps.event.addListener( newMark, 'click', function() {
             this.cnt ? this.window.open( map, newMark ) : this.window.close()
             this.cnt = !this.cnt
           } )
           newMark.setMap( map )
           return newMark
        }

        function makeConvoshow( map ) {
          console.log( "it's here")
          for ( var i = 0; i < myjson.length; i++ ) {
              //console.log( myjson[ i ] )
              //makeCon( myjson[ i ] )
              var t = addMarker( myjson[ i ].latitude, myjson[ i ].longitude, map )
              fillInfo( myjson[ i ], t )
          }
        }

        window.onload = function() {
          navigator.geolocation.getCurrentPosition( function( position ) {
            console.log( "hello " + position )
            var curLoc =  position.coords
            t = curLoc
            initialize( curLoc )
          } )
        }

        function initialize( curLoc ) {
          console.log( curLoc )
          var mapProp = {
            center:new google.maps.LatLng( curLoc.latitude, curLoc.longitude ),
            zoom:15,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
  {
    "featureType": "landscape",
    "stylers": [
      {
        "hue": "#FFA800"
      },
      {
        "saturation": 0
      },
      {
        "lightness": 0
      },
      {
        "gamma": 1
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "hue": "#53FF00"
      },
      {
        "saturation": -73
      },
      {
        "lightness": 40
      },
      {
        "gamma": 1
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "hue": "#FBFF00"
      },
      {
        "saturation": 0
      },
      {
        "lightness": 0
      },
      {
        "gamma": 1
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "hue": "#00FFFD"
      },
      {
        "saturation": 0
      },
      {
        "lightness": 30
      },
      {
        "gamma": 1
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "hue": "#00BFFF"
      },
      {
        "saturation": 6
      },
      {
        "lightness": 8
      },
      {
        "gamma": 1
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "hue": "#679714"
      },
      {
        "saturation": 33.4
      },
      {
        "lightness": -25.4
      },
      {
        "gamma": 1
      }
    ]
  }
]
          }

          map = new google.maps.Map( document.getElementById( "fogo" ), mapProp )
          google.maps.event.addListener( map, 'click', function( position ) {
              console.log( position )
              addMarker( position.latLng.H, position.latLng.L, map );
          } )
          map.setOptions( {draggable: false, minZoom: 15, scrollwheel: false, disableDoubleClickZoom: true } );
          console.log( "centet")
          var centerMarker = new google.maps.Marker( {
            position: mapProp.center,
            cnt     : true,
            icon    : 'assets/images/blueFlame.png' ||  'http://icons.iconarchive.com/icons/glyphish/glyphish/32/07-map-marker-icon.png',
            window: new google.maps.InfoWindow( {
                content: "<a href=#>BroadCast</a>"
              } )
          } )
          google.maps.event.addListener( centerMarker, 'click', function() {
            this.cnt ? this.window.open( map, this) : this.window.close()
             this.cnt = !this.cnt
          } )
          centerMarker.setMap( map )
          makeConvoshow( map )
      }