'use strict'

mapboxgl.accessToken = 'pk.eyJ1IjoicGVodSIsImEiOiJja3R4Y3diNmIybTg5Mm9waWgwYTdsc3FyIn0.lVvnPZ3aa6332EaWJIxPaQ';
const bounds = [
    [133.45602621929396, 34.435535758195286], // 南西座標
    [134.24846498125743, 34.85230319814957] // 北東座標
];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard',
    center: [133.91755925535443, 34.66585488942782],
    pitch: 40,
    zoom: 9,
    maxBounds: bounds
});

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // デバイスの位置の変更に応じて位置情報を更新
        trackUserLocation: true,
        // デバイスが向いている方向を矢印で描画
        showUserHeading: true
    })
);
map.addControl(new mapboxgl.NavigationControl());

// add markers to map
for (const marker of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.setAttribute('data-tag', marker.properties.tag)

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({
                offset: 12.5
            }).setHTML("<b>" + marker.properties.description + "</b>")
        ).addTo(map);
    el.addEventListener('click', () => {
        const title = document.querySelector('#modal h2'),
            modal = document.querySelector('#modal');
        map.flyTo({
            center: marker.geometry.coordinates,
            zoom: 17.5
        });
        if (typeof modal.showModal === "function") {
            title.innerText = marker.properties.title;
            modal.style.backgroundImage = 'url(' + marker.properties.image + ')';
            modal.showModal();
        } else {
            alert("The dialog API is not supported by this browser");
        };
    });
};

// 地図を移動 area(lng, lat, zoom)
function area(lng, lat, zoom) {
    map.flyTo({
        center: [lng, lat],
        zoom: zoom
    })
};