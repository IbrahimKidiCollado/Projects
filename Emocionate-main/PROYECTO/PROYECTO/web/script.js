

let aparecer = document.querySelectorAll(".animacion");

function mostrarscroll() {

	let scrollTop = document.documentElement.scrollTop;

	for (var i = 0; i < aparecer.length; i++) {

		let altura = aparecer[i].offsetTop;

		if (altura - 450 < scrollTop) {
			aparecer[i].style.opacity = 1;
		}
	}

}

window.addEventListener("scroll", mostrarscroll)

src = "https://code.jquery.com/jquery-3.6.1.min.js"
integrity = "sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
crossorigin = "anonymous"

function enviarMensaje() {
	const nombre = document.getElementById("username").value.trim();
	const mensaje = document.getElementById("message").value.trim();

	if (!nombre || !mensaje) {
		alert("Por favor, introduce un nombre y un mensaje.");
		return;
	}

	const ahora = new Date();
	const hora = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	const chatBox = document.getElementById("chat-box");
	const burbuja = document.createElement("div");
	burbuja.classList.add("mensaje-burbuja"); // <- clase nueva para el fondo y estilo

	burbuja.innerHTML = `
        <div class="mensaje-burbuja-usuario">${nombre}</div>
        <div class="mensaje-burbuja-texto">${mensaje}</div>
        <div class="mensaje-burbuja-hora">${hora}</div>
    `;

	chatBox.appendChild(burbuja);
	document.getElementById("message").value = "";
	chatBox.scrollTop = chatBox.scrollHeight;
}
