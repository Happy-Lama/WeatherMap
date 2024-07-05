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
        opacity: 0.5, // Set opacity for semi-transparency (0.0 - 1.0)
    })
    console.log(color_ramps[i])
    overlays_[overlay_names[i]] = [imageLayer, i+1];
}

console.log(overlays_)

let json_dir = 'data/weather/current/'
let json_files = [
    'current-mean_sea_level_pressure-isobaric-1000hPa-gfs-1.0.json',
    'current-mean_sea_level_pressure-surface-level-gfs-1.0.json',
    'current-precipitation_rate-isobaric-1000hPa-gfs-1.0.json',
    'current-precipitation_rate-surface-level-gfs-1.0.json',
    'current-relative_humidity-isobaric-1000hPa-gfs-1.0.json',
    'current-relative_humidity-surface-level-gfs-1.0.json',
    'current-temp-isobaric-1000hPa-gfs-1.0.json',
    'current-temp-surface-level-gfs-1.0.json',
    'current-total_cloud_cover-isobaric-1000hPa-gfs-1.0.json',
    'current-total_cloud_cover-surface-level-gfs-1.0.json',
    'current-total_cloud_water-isobaric-1000hPa-gfs-1.0.json',
    'current-total_cloud_water-surface-level-gfs-1.0.json',
    'current-total_precipitable_water-isobaric-1000hPa-gfs-1.0.json',
    'current-total_precipitable_water-surface-level-gfs-1.0.json',
    'current-wind-isobaric-1000hPa-gfs-1.0.json',
    'current-wind-surface-level-gfs-1.0.json',
]

function getValueAtCoordinates(data, header, lat, lng) {
    // Extract grid parameters
    const lo1 = header.lo1;
    const la1 = header.la1;
    const lo2 = header.lo2;
    const la2 = header.la2;
    const nx = header.nx;
    const ny = header.ny;
    const dx = header.dx;
    const dy = header.dy;

    // Check if the given coordinates are within the grid bounds
    if (!(lng + 180 >= 0 && lng <= 359 && lat <= 90 && lat >= -90)) {
        console.log(lo1, lo2, lng, la1, la2, lat);
        throw new Error("Coordinates out of bounds");
    }

    // Calculate indices
    const i = Math.floor((la1 - lat) / dy);
    const j = Math.floor((lng - lo1) / dx);

    // Calculate the 1D index
    const index = i * nx + j;

    // Retrieve the value from the data array
    const value = data[index];

    return value;
}