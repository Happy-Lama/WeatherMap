

let customLayerControls = L.Control.extend({
    options: {
        position: 'topright',
    },
    // data: {},

    onAdd: function(map) {
        let container = L.DomUtil.create('div', 'leaflet-control leaflet-control-custom');
        
        let entries = Object.entries(overlays_);
        for (let i = 0; i < entries.length; i++) {
            let button = L.DomUtil.create('div', 'layer-control-user', container);
            button.innerHTML = entries[i][0];
            // button.href = '#';
            let icon = document.createElement('img')
            icon.src = color_ramps[entries[i][1][1]][3]
            button.appendChild(icon)
            L.DomEvent.on(button, 'click', function (e) {
                L.DomEvent.stopPropagation(e);
                L.DomEvent.preventDefault(e);

                if(current_layer){
                    // remove colorbar values
                    let colorbar = document.getElementById('values')
                    let number_of_children_elements = colorbar.childNodes.length
                    for(let i = 0; i < number_of_children_elements; i++){
                        colorbar.removeChild(colorbar.children[0])
                    }
                    // document.getElementById('units').removeChild(div)
                    map.removeLayer(current_layer[1][0]);
                }
                map.addLayer(entries[i][1][0]);
                current_layer = entries[i];
                console.log("current layer", current_layer)
                let colorbar = document.getElementById('values');
                // console.log(colorbar)
                colorbar.style.background = color_ramps[entries[i][1][1]][0]
                // console.log(color_ramps[entries[i][1][1]][1])
                color_ramps[entries[i][1][1]][1].forEach((value) => {
                    let div = document.createElement('div')
                    div.classList.add('colorbar_values')
                    div.innerText = value
                    colorbar.appendChild(div)
                })
                
                // let div = document.createElement('div')
                // div.classList.add('colorbar_values')
                document.getElementById('units').innerText = color_ramps[entries[i][1][1]][2]
                // document.getElementById('units').appendChild(div)
                console.log(current_layer)
            });
        }

        // Add colorbar
        
        return container;
    },

    onRemove: function(map) {
        // Nothing here
    },
});

