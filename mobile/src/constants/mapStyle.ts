// Custom map styling for gamified aesthetic
// Clean, minimalist style with theme colors

export const customMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }], // Light gray background
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }], // Hide default icons
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }], // Dark gray text
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }], // Light stroke for readability
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }], // Very light gray for POIs
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5f5e5' }], // Light green for parks
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#457a00' }], // Theme green for park labels
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }], // White roads
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#ffecd9' }], // Light orange for highways (theme)
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#cc4e00' }], // Theme orange for highway labels
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9e6f7' }], // Light blue for water
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
];

// Map boundary radius in meters (how far user can drag from their location)
export const MAP_BOUNDARY_RADIUS = 500; // ~1640 feet

// Map zoom levels
export const DEFAULT_ZOOM_DELTA = {
  latitudeDelta: 0.005, // Close zoom for proximity view
  longitudeDelta: 0.005,
};
