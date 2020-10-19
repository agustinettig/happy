import Leaflet from 'leaflet';

import localIcon from '../images/local.svg';

const mapIcon = Leaflet.icon({
    iconUrl: localIcon,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

export default mapIcon;