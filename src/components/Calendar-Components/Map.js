import React, { Component } from 'react';
import styles from './Map.css';

// Component uses the Google Maps script tag already in DOM
// Is added before rest of app in index.js

class Map extends Component {
	constructor(props) {
		super(props);
		// Placeholder for Google Maps DOM element
		this.el = React.createRef();
	}
	
	componentDidUpdate() {
		this.googleMap = this.createMap();
		this.markers = this.createMarkers();
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// In JS, can't compare values of arrays this way
		// However, can check if they're the same object in memory
		return nextProps.cityCounts !== this.props.cityCounts;
	}
	
	createMap = () => {
		// Set zoom level based on viewport width
		// Using standard Bootstrap breakpoints
		let mapZoom;
		let mapCenter;
		let xlBool = window.matchMedia('(min-width: 1200px)');
		let lgBool = window.matchMedia('(min-width: 992px)');
		let mdBool = window.matchMedia('(min-width: 768px)');
		let smBool = window.matchMedia('(min-width: 576px)');
		
		// Check in order of most to least stringent
		if (xlBool.matches) {
			mapZoom = 4.0;
			mapCenter = {lat: 61.0, lng: -96.0};
		} else if (lgBool.matches) {
			mapZoom = 3.7;
			mapCenter = {lat: 63.0, lng: -96.0};
		} else if (mdBool.matches) {
			mapZoom = 3.5;
			mapCenter = {lat: 63.0, lng: -96.0};
		} else if (smBool.matches) {
			mapZoom = 3.2;
			mapCenter = {lat: 64.0, lng: -96.0};
		} else {
			// Default to level 3 zoom
			mapZoom = 2.7;
			mapCenter = {lat: 68.0, lng: -96.0};
		}
		
		// Map options
		let options = {
			zoom: mapZoom,
			center: mapCenter,
			// Show / hide UI controls
			fullscreenControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			zoomControl: true
		};
		
		return new window.google.maps.Map(this.el.current, options);
	}
	
	addMarker = (city_name, lat, lng, count) => {
		// Close all open InfoWindows
		let closeInfoWindows = () => {
			for (let i = 0; i < this.markers.length; i++) {
				if (this.markers[i]) {
					this.markers[i].close();
				}
			}
		}
		
		// Disregard cities lacking lat, lng values e.g. 'webcast'
		if (lat === '' || lng === '') { return false; }
		
		// Determine marker color based of number of offerings
		let color;
		if (count < 5) {
			color = 'red';
		} else if(count >= 5 && count < 10) {
			color = 'orange';
		} else if(count >= 10 && count < 20) {
			color = 'green';
		} else if(count >= 20) {
			color = 'blue';
		} else {
			color = 'red';
		}
		
		// Add marker
		let marker = new window.google.maps.Marker({
			position: {lat: lat, lng: lng},
			map: this.googleMap,
			icon: 'https://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
		});
		
		// Add tooltip
		let contentString = city_name + ': ' + String(count);
		let infoWindow = new window.google.maps.InfoWindow({
			content: contentString
		});
		
		// Show InfoWindow upon click
		marker.addListener('click', function() {
			closeInfoWindows();
			infoWindow.open(this.googleMap, marker);
		});
		return infoWindow;
	}
	
	createMarkers = () => {
		return this.props.cityCounts.map(city => {
			let { offering_city, offering_lat, offering_lng, count } = city;
			return this.addMarker(offering_city, offering_lat, offering_lng, count);
		});
	}
	
	render() {
		return (
			<>
				{/* Map showing offerings that match criteria */}
				<div
					ref={this.el}
					className={styles.map}
				></div>
				{/* Map's legend */}
				<div className={styles.legend}>
					<div className={styles.legendTitle}>
						<h4>Legend</h4>
					</div>
					<div className={styles.legendContents}>
						<div>
							<img className={styles.legendMarker} src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Red Marker" />
							<p>1-4</p>
						</div>
						<div>
							<img className={styles.legendMarker} src="https://maps.google.com/mapfiles/ms/icons/orange-dot.png" alt="Orange Marker" />
							<p>5-9</p>
						</div>
						<div>
							<img className={styles.legendMarker} src="https://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="Green Marker" />
							<p>10-19</p>
						</div>
						<div>
							<img className={styles.legendMarker} src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="Blue Marker" />
							<p>20+</p>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Map;
