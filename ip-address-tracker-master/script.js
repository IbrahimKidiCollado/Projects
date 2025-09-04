function initMap() {
	// Configurar la ubicación
	const coords = { lat: 40.31015793806099, lng: -3.7164322178023346 };
	// Crear el mapa

	const screenWidth = innerWidth;
	let zoom = 19;

	if (screenWidth >= 768) {
		zoom = 18
	}

	const mapOptions = {
		zoom: zoom,
		center: coords,
		gestureHandling: "none",     // Desactiva gestos táctiles y de ratón
		disableDefaultUI: true,      // Oculta todos los controles
		keyboardShortcuts: false,    // Desactiva atajos de teclado
		scrollwheel: false,          // Desactiva zoom con rueda del ratón
		draggable: false,            // Evita arrastrar el mapa
		zoomControl: false,          // Sin control de zoom
		mapTypeControl: false,       // Sin selector de tipo de mapa
		scaleControl: false,         // Sin control de escala
		streetViewControl: false,    // Sin Street View
		rotateControl: false,        // Sin rotación
		fullscreenControl: false     // Sin pantalla completa
	};

	const map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// Añadir un marcador

	const customMarker = {
		url: '/ip-address-tracker-master/images/icon-location.svg',
		scaledSize: new google.maps.Size(50, 60), // Tamaño de la imagen
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(25, 70)
	}

	// Crear un martcador
	const marker = new google.maps.Marker({
		position: coords,
		map: map,
		title: "Puerta del Sol, Madrid",
		icon: customMarker
	});
}