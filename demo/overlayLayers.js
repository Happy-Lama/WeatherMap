//get overlay layers as png
let images_dir = './images/';

let overlays = [
    '1.png', '2.png', '3.png', '4.png',
    '5.png', '6.png', '7.png', '8.png',
    '9.png', '10.png', '11.png', '12.png',
    '13.png', '14.png', '15.png', '16.png',
];

let overlay_names = [
    'Sea Level Pressure Isobaric', 
    'Sea Level Pressure Surface',
    'Precipitation Rate Isobaric', 
    'Precipitation Rate Surface',
    'Relative Humidity Isobaric', 
    'Relative Humidity Surface',
    'Temperature Isobaric', 
    'Temperature Surface',
    'Total Cloud Cover Isobaric', 
    'Total Cloud Cover Surface',
    'Total Cloud Water Isobaric', 
    'Total Cloud Water Surface',
    'Total Precipitable Water Isobaric', 
    'Total Precipitable Water Surface',
    'Wind Isobaric', 
    'Wind Surface',
]

let overlays_ = {};

for(let i = 0; i < 16; i++){
    
    let imageUrl = images_dir + overlays[i]
    let imageLayer = L.imageOverlay(imageUrl, [[-90, -180], [90, 180]], {
        opacity: 0.4, // Set opacity for semi-transparency (0.0 - 1.0)
    })
    console.log(color_ramps[i])
    overlays_[overlay_names[i]] = [imageLayer, i+1];
}

console.log(overlays_)

// layerControl.addEventListener('select', (event) => {
//     console.log(event)
// })
