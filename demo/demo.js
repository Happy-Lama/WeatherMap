function initDemoMap() {
  var Esri_WorldImagery = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20,

    noWrap: true
  });

  var Esri_DarkGreyCanvas = L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/" +
      "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
      "{z}/{x}/{y}.png",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, " +
        "NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
    }
  );

  var baseLayers = {
    Satellite: Esri_WorldImagery,
    "Grey Canvas": Esri_DarkGreyCanvas
  };

  var map = L.map("map", {
    layers: [Esri_WorldImagery],
    minZoom: 4,
    zoomDelta: 0.1
  });

  var layerControl = L.control.layers(baseLayers);
  layerControl.addTo(map);
  map.setView([ -1, 37.2972], 6);

  return {
    map: map,
    layerControl: layerControl
  };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;

// markers to be placed
markers = [
  [0.76, 34.04],
  [1.02, 34.4],
  [0.43, 32.77],
  [1.72, 33.6],
  [2.5, 34.7],
]

markers.forEach((marker)=> {
  L.marker(marker).addTo(map)
})
var standaloneTooltip = null;
// Function to remove the tooltip
function removeTooltip() {
    map.removeLayer(standaloneTooltip);
}

map.addEventListener('click', (event) =>{
  if(standaloneTooltip){
      removeTooltip();
  }

  $.getJSON(json_dir + json_files[current_layer[1][1] - 1], function(data){
    if(current_layer){
      let value = getValueAtCoordinates(data[0].data,data[0].header,event.latlng.lat, event.latlng.lng)
      standaloneTooltip = L.tooltip().setContent(
        `<p>${value} ${color_ramps[current_layer[1][1]][2]}</p>
        Latitude: ${event.latlng.lat.toFixed(2)}, Longitude: ${event.latlng.lng.toFixed(2)}`
      ).setLatLng([event.latlng.lat, event.latlng.lng])
      .addTo(map);
    }
  })
  
})

//load the velocity layers
$.getJSON("./data/weather/current/current-wind-surface-level-gfs-1.0.json", function(data) {
  var velocityLayer = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType: "Global Wind",
      position: "bottomleft",
      emptyString: "No wind data"
    },
    data: data,
    maxVelocity: 40
  });

  // layerControl.addOverlay(velocityLayer, "Wind - Global");
  velocityLayer.addTo(map);
  
});

var current_layer = null;

map.addControl(new customLayerControls());
