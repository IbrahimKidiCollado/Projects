var contenidoOriginal;
var botonCambia;

function todos() {
    comprobar();
}

function comprobar() {
    botonCambia = document.getElementById("confirmar").textContent

    if (botonCambia === "Continue") {
        restaurarContenido();
        return;
    }

    limpiarErrores()
    
    if (!contenidoOriginal) {
        contenidoOriginal = document.querySelector(".containerForm").innerHTML;
    }

    //Definir inputs
    var inputNombre = document.getElementById("Name").value;
    var inputNumber = document.getElementById("number").value;
    let inputDate1 = document.getElementById("date1").value;
    let inputDate2 = document.getElementById("date2").value;
    let inputCVC = document.getElementById("cvc").value;
    let error = false

    inputNombre = inputNombre.replace(/[" "]/g, "")

    inputNumber = inputNumber.replace(/\s+/g, "")

    if (!/^[a-zA-Z]+$/.test(inputNombre) || inputNombre === "") {
        error = true
        diseñarError()
    }

    if (isNaN(inputNumber) || inputNumber.trim() === "") {
        error = true
        diseñarError1()
    }

    if (inputDate1.length == 0) {
        error = true
        diseñarError2()
    }

    if (inputDate2.length == 0) {
        error = true
        diseñarError3()
    }

    if (inputCVC.length == 0) {
        error = true
        diseñarError4()
    }

    if (!error) {
        confirmar()
    }
}

function restaurarContenido() {
    const container = document.querySelector(".containerForm");
    container.innerHTML = contenidoOriginal;
    document.getElementById("confirmar").textContent = "Confirm";
}

function limpiarErrores() {
    const fallo = document.querySelector("#fallo");
    const fallo1 = document.querySelector("#fallo1");
    const fallo2 = document.querySelector("#fallo2");
    const fallo3 = document.querySelector("#fallo3");
    const fallo4 = document.querySelector("#fallo4");
    const colorBorde = document.querySelectorAll(".color")
    
    colorBorde.forEach(element => {
        element.style.border = "1px solid #5C5092"
    });


    if (fallo) {
        fallo.remove();
    }
    if (fallo1) {
        fallo1.remove();
    }
    if (fallo2) {
        fallo2.remove();
    }
    if (fallo3) {
        fallo3.remove();
    }
    if (fallo4) {
        fallo4.remove();
    }
}

function diseñarError() {
    let inputNombre = document.getElementById("Name")
    const container = document.querySelector(".containerForm")
    const containerNombre = container.querySelector("#Name")

    //Error del NAME
    inputNombre.style.border = "solid 1px red"
    let wrongLetter = document.createElement("p")
    wrongLetter.classList = "wrongLetter"
    wrongLetter.setAttribute("id", "fallo")
    wrongLetter.textContent = "Wrong format, letters only"
    containerNombre.after(wrongLetter)
}

function diseñarError1() {
    const container = document.querySelector(".containerForm")
    let inputNumber = document.getElementById("number")
    const containerNumber = container.querySelector("#number")
    
    //Error del NUMBER
    inputNumber.style.border = "1px solid red"
    let wrongNumber = document.createElement("p")
    wrongNumber.classList = "wrongLetter"
    wrongNumber.setAttribute("id", "fallo1")
    wrongNumber.textContent = "Wrong format, numbers only"
    containerNumber.after(wrongNumber)
}

function diseñarError2() {
    const container = document.querySelector(".containerForm")
    let inputDate1 = document.getElementById("date1")
    const containerDate1 = container.querySelector("#date1")

    //Error del DATE1
    let mensajeError = document.createElement("p")
    inputDate1.style.border = "1px solid red"
    mensajeError.classList = "wrongLetter1"
    mensajeError.setAttribute("id", "fallo2")
    mensajeError.textContent = "Can't be blank"
    containerDate1.after(mensajeError)
}

function diseñarError3() {
    const container = document.querySelector(".containerForm")
    let inputDate2 = document.getElementById("date2")
    const containerDate2 = container.querySelector("#date2")

    //Error DATE2
    let mensajeError = document.createElement("p")
    inputDate2.style.border = "1px solid red"
    mensajeError.classList = "wrongLetter1"
    mensajeError.setAttribute("id", "fallo3")
    mensajeError.textContent = "Can't be blank"
    containerDate2.after(mensajeError)
}

function diseñarError4() {
    const container = document.querySelector(".containerForm")
    let inputCVC = document.getElementById("cvc")
    const containerCVC = container.querySelector("#cvc")
    //Error CVC
    inputCVC.style.border = "solid 1px red"
    let mensajeError = document.createElement("p")
    mensajeError.classList = "wrongLetter2"
    mensajeError.setAttribute("id", "fallo4")
    mensajeError.textContent = "Can't be blank"
    containerCVC.after(mensajeError)
}

function confirmar() {

        //Cambiar numeros de las tarjetas
        //nombre
        let inputName = document.getElementById("Name").value
        let nombreTarjeta = document.getElementById("nombreTarjeta")
        nombreTarjeta.textContent = inputName;
        //numero
        let inputNumero = document.getElementById("number").value
        let numeroTarjeta = document.getElementById("numeroTarjeta")
        numeroTarjeta.textContent = inputNumero.match(/.{1,4}/g).join(" ")
        //fecha
        let inputFecha1 = document.getElementById("date1").value
        let inputFecha2 = document.getElementById("date2").value
        let fechaTarjeta = document.getElementById("fechaTarjeta")
        fechaTarjeta.textContent = inputFecha1 + "/" + inputFecha2
        // CVC
        let inputCVC = document.getElementById("cvc").value
        let tarjetaCVC = document.getElementById("tarjetaCVC")
        tarjetaCVC.textContent = inputCVC

        //Hacer desaparecer el contenido y guardar el contenido
        const container = document.querySelector(".containerForm")
        if (!contenidoOriginal) {
            contenidoOriginal = container.innerHTML
        }
        container.innerHTML = ""

        //Simbolo del tick
        
        const ok = document.createElement("p")
        ok.innerHTML = "&#10004;"
        ok.classList = "tick"
        container.appendChild(ok)

        // Primer mensaje de gracias

        const gracias = document.createElement("p")
        gracias.classList = "gracias"
        gracias.textContent = "THANK YOU!"
        container.appendChild(gracias)

        // Segundo mensaje de gracias

        const gracias2 = document.createElement("p")
        gracias2.classList = "gracias2"
        gracias2.textContent = "We've added your card details"
        container.appendChild(gracias2)

        //Cambiar contenido de boton

        document.getElementById("confirmar").textContent = "Continue"
}