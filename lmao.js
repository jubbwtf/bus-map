var style_2_2 = function(feature, resolution){
    return [
        // Белая обводка снизу
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ffffff',
                width: 12,
                lineCap: 'round',
                lineJoin: 'round'
            }),
            zIndex: 1
        }),
        // Жирная синяя линия сверху
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0066ff',
                width: 8,
                lineCap: 'round',
                lineJoin: 'round'
            }),
            zIndex: 2
        })
    ];
};