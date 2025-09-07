// Variables globales
let map;
let markers = [];

// Función inicial para cargar un mapa básico
function initMap() {
	console.log("Google Maps API loaded");
	// Inicializar un mapa básico
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 40.6892, lng: -74.0445 }, // Coordenadas por defecto (Estatua de la Libertad)
		zoom: 10,
		gestureHandling: "none",
		disableDefaultUI: true,
		keyboardShortcuts: false,
		scrollwheel: false,
		draggable: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false
	});

	// Cargar la IP del usuario al iniciar
	getCurrentIP();
}

// Función para obtener la IP actual del usuario
function getCurrentIP() {
	fetch('https://api.ipify.org?format=json')
		.then(response => response.json())
		.then(data => {
			document.getElementById('InitialIP').value = data.ip;
			recogeIp(); // Automáticamente buscar la IP del usuario
		})
		.catch(error => {
			console.error("Error obteniendo IP actual:", error);
		});
}

// Función principal que recoge la IP del input
function recogeIp() {
	const ip = document.getElementById('InitialIP').value;
	const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

	if (ipPattern.test(ip)) {
		console.log("IP válida:", ip);
		ipTracker(ip)
			.then(datos => {
				updateMap(datos);
				updateUI(datos, ip);
			})
			.catch(error => {
				console.error("Error:", error);
				alert("Error al obtener los datos de la IP: " + error.message);
			});
	} else {
		console.log("IP no válida");
		document.getElementById('InitialIP').value = '';
		alert("Por favor, introduce una IP válida (formato: 192.168.1.1)");
	}
}

// Función para obtener datos de la IP
function ipTracker(ip) {
	const apiURL = `https://ipapi.co/${ip}/json/`;

	return fetch(apiURL)
		.then(response => {
			if (!response.ok) {
				throw new Error("Error en la respuesta del servidor");
			}
			return response.json();
		})
		.then(data => {
			if (!data.error) {
				const datos = {
					isp: data.org || "Desconocido",
					coords: {
						lat: parseFloat(data.latitude),
						lng: parseFloat(data.longitude)
					},
					timezone: data.timezone || "UTC",
					city: data.city || "Desconocida",
					codPostal: data.postal || "00000",
					region: data.region || "Desconocida",
					country: data.country_name || "Desconocido"
				};
				return datos;
			} else {
				throw new Error("IP no encontrada o no válida");
			}
		});
}

// Función para actualizar el mapa con los nuevos datos
function updateMap(datos) {
	const coords = datos.coords;

	const screenWidth = window.innerWidth;
	let zoom = 16;

	if (screenWidth >= 768) {
		zoom = 15;
	}

	// Actualizar el centro y zoom del mapa
	map.setCenter(coords);
	map.setZoom(zoom);

	// Limpiar marcadores anteriores
	clearMarkers();

	// Crear y añadir nuevo marcador
	const customMarker = {
		url: 'images/icon-location.svg',
		scaledSize: new google.maps.Size(46, 56),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(23, 56)
	};

	const marker = new google.maps.Marker({
		position: coords,
		map: map,
		icon: customMarker,
		title: `Ubicación: ${datos.city}, ${datos.region}`
	});

	markers.push(marker);
}

// Función para limpiar marcadores
function clearMarkers() {
	markers.forEach(marker => marker.setMap(null));
	markers = [];
}

// Función para actualizar la interfaz con los datos
function updateUI(datos, ip) {
	document.getElementById('id').textContent = ip;
	document.getElementById('location').textContent =
		`${datos.city}, ${datos.region} ${datos.codPostal}`;
	document.getElementById('timezone').textContent = `UTC ${getTimezoneOffset(datos.timezone)}`;
	document.getElementById('isp').textContent = datos.isp;
}

// Función auxiliar para formatear la zona horaria
function getTimezoneOffset(timezone) {
	// Intenta extraer el offset de la zona horaria
	const match = timezone.match(/UTC([+-]\d+):?(\d+)?/);
	if (match) {
		return match[1] + (match[2] ? ':' + match[2] : ':00');
	}
	return "+00:00"; // Valor por defecto
}

// Event listener para el botón (como alternativa al onclick en HTML)
document.addEventListener('DOMContentLoaded', function () {
	const button = document.querySelector('.button');
	if (button) {
		button.addEventListener('click', recogeIp);
	}

	// También buscar al presionar Enter en el input
	const input = document.getElementById('InitialIP');
	if (input) {
		input.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				recogeIp();
			}
		});
	}
});