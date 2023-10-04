let qrImage = document.getElementById("qrimg");
let qrtxt = document.getElementById("qrTxt");
let downloadLink = document.getElementById("downloadLink");
let uploadInput = document.getElementById("uploadInput");
let decodedResult = document.getElementById("decodedResult");
let decodedLink = document.getElementById("decodedLink");

function generateQr() {
    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrtxt.value;
    qrImage.src = qrUrl;
    downloadLink.href = qrUrl;
    downloadLink.style.display = "block";
}

function decodeQr() {
    const file = uploadInput.files[0];
    if (!file) {
        alert("Please select a QR code image to decode.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function() {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                decodedLink.textContent = code.data;
                decodedResult.style.display = "block";
            } else {
                alert("No QR code found in the selected image.");
            }
        };
    };

    reader.readAsDataURL(file);
}

let generateButton = document.getElementById("generateButton");
let decodeButton = document.getElementById("decodeButton");
let generateSection = document.querySelector(".generate-section");
let decodeSection = document.querySelector(".decode-section");

function showGenerateSection() {
    generateSection.style.display = "block";
    decodeSection.style.display = "none";
}

function showDecodeSection() {
    generateSection.style.display = "none";
    decodeSection.style.display = "block";
}

generateButton.addEventListener("click", showGenerateSection);
decodeButton.addEventListener("click", showDecodeSection);
