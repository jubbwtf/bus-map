            var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format__1 = new ol.format.GeoJSON();
var features__1 = format__1.readFeatures(json__1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__1.addFeatures(features__1);
var lyr__1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__1, 
                style: style__1,
                popuplayertitle: 'остановка',
                interactive: true,
                title: '<img src="styles/legend/_1.png" /> остановка'
            });
var format_2_2 = new ol.format.GeoJSON();
var features_2_2 = format_2_2.readFeatures(json_2_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_2_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_2_2.addFeatures(features_2_2);
var lyr_2_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_2_2, 
                style: style_2_2,
                popuplayertitle: 'маршрут 1а',
                interactive: true,
                title: '<img src="styles/legend/2_2.png" /> маршрут 1а'
            });

lyr_OSMStandard_0.setVisible(true);lyr__1.setVisible(true);lyr_2_2.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr__1,lyr_2_2];
lyr__1.set('fieldAliases', {'id': 'id', 'иг. по': 'иг. по', });
lyr_2_2.set('fieldAliases', {'id': 'id', 'маршр': 'маршр', });
lyr__1.set('fieldImages', {'id': 'TextEdit', 'иг. по': 'TextEdit', });
lyr_2_2.set('fieldImages', {'id': '', 'маршр': '', });
lyr__1.set('fieldLabels', {'id': 'no label', 'иг. по': 'no label', });
lyr_2_2.set('fieldLabels', {'id': 'no label', 'маршр': 'no label', });
lyr_2_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
       