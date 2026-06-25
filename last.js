// GPS кнопка
document.getElementById('custom-gps-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const coord = ol.proj.fromLonLat([lon, lat]);
            
            // Центрируем карту
            map.getView().animate({
                center: coord,
                zoom: 16,
                duration: 1000
            });
            
            // Добавляем маркер местоположения
            addLocationMarker(lat, lon);
            
            // Целевая точка
            const targetLat = 61.001272;
            const targetLon = 68.994418;
            
            // Рассчитываем расстояние
            const distance = calculateDistance(lat, lon, targetLat, targetLon);
            showDistanceInfo(distance);
            
        }, function(error) {
            alert('Ошибка GPS: ' + error.message);
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    }
});

// Добавляем визуальный маркер местоположения
function addLocationMarker(lat, lon) {
    // Удаляем старый маркер если есть
    if (window.locationMarker) {
        map.removeLayer(window.locationMarker);
    }
    
    const coord = ol.proj.fromLonLat([lon, lat]);
    
    // Создаем слой с маркером
    const markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                // Внешний круг (пульсация)
                new ol.Feature({
                    geometry: new ol.geom.Point(coord)
                }),
                // Внутренняя точка
                new ol.Feature({
                    geometry: new ol.geom.Point(coord)
                })
            ]
        }),
        style: [
            // Внешний синий круг
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 12,
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 120, 255, 0.3)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 120, 255, 0.8)',
                        width: 2
                    })
                })
            }),
            // Внутренняя белая точка
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: '#ffffff'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#0078FF',
                        width: 3
                    })
                })
            })
        ],
        zIndex: 9999
    });
    
    map.addLayer(markerLayer);
    window.locationMarker = markerLayer;
}

// Расчет расстояния между двумя точками (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в километрах
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Показываем информацию о расстоянии
function showDistanceInfo(distanceKm) {
    // Создаем или обновляем информационное окно
    let infoBox = document.getElementById('distance-info');
    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.id = 'distance-info';
        infoBox.style.position = 'fixed';
        infoBox.style.bottom = '100px';
        infoBox.style.right = '20px';
        infoBox.style.backgroundColor = '#ffffff';
        infoBox.style.padding = '12px 16px';
        infoBox.style.borderRadius = '8px';
        infoBox.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        infoBox.style.fontFamily = 'Arial, sans-serif';
        infoBox.style.fontSize = '14px';
        infoBox.style.zIndex = '9998';
        document.body.appendChild(infoBox);
    }
    
    // Форматируем расстояние
    let distanceText;
    if (distanceKm < 1) {
        distanceText = (distanceKm * 1000).toFixed(0) + ' м';
    } else {
        distanceText = distanceKm.toFixed(2) + ' км';
    }
    
    infoBox.innerHTML = `
        <div style="font-weight: bold; color: #0078FF; margin-bottom: 4px;">
            📍 Расстояние до цели
        </div>
        <div style="color: #333;">
            ${distanceText}
        </div>
    `;
}