import { openPopup } from './popup.js';
import { hexData } from '../assets/data/hexData.js';
// Globe는 따로 import 필요 없이 그냥 Globe() 호출

const world = Globe()(document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('#000')
  .hexPolygonsData(
    hexData.map((d) => ({
      type: 'Feature',
      properties: { label: d.label, description: d.description },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [d.lng - 0.5, d.lat - 0.5],
            [d.lng + 0.5, d.lat - 0.5],
            [d.lng + 0.5, d.lat + 0.5],
            [d.lng - 0.5, d.lat + 0.5],
            [d.lng - 0.5, d.lat - 0.5],
          ],
        ],
      },
    }))
  )
  .hexPolygonColor(() => 'red')
  .onHexPolygonClick((polygon) => {
    openPopup(polygon.properties.label, polygon.properties.description);
  });
