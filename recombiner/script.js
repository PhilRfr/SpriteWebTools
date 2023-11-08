// Fonction pour charger l'image
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
    });
}

// Fonction pour dessiner l'image sur le canvas avec les paramètres de taille de grille et de tuiles
function drawImageOnCanvas(canvas, image, gridSize, tileSize) {
    const ctx = canvas.getContext('2d');
    const gridSpacing = gridSize;
    const tileWidth = tileSize;
    const tileHeight = tileSize;

    // Calculer le nombre de tuiles en largeur et en hauteur
    const numTilesX = Math.floor((image.width + gridSpacing) / (tileWidth + gridSpacing));
    const numTilesY = Math.floor((image.height + gridSpacing) / (tileHeight + gridSpacing));

    // Redimensionner le canvas pour accueillir les tuiles recombinées
    canvas.width = numTilesX * tileWidth;
    canvas.height = numTilesY * tileHeight;

    // Dessiner les tuiles recombinées sur le canvas
    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const sourceX = x * (tileWidth + gridSpacing);
            const sourceY = y * (tileHeight + gridSpacing);
            const destinationX = x * tileWidth;
            const destinationY = y * tileHeight;
            ctx.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, destinationX, destinationY, tileWidth, tileHeight);
        }
    }
}

// Fonction principale pour traiter l'image
function processImage() {
    const canvas = document.getElementById('canvas');
    const gridSizeInput = document.getElementById('gridSize');
    const tileSizeInput = document.getElementById('tileSize');
    const imageInput = document.getElementById('imageInput');
    const processButton = document.getElementById('processButton');

    // Événement de clic du bouton
    processButton.addEventListener('click', async () => {
        const file = imageInput.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const image = await loadImage(imageUrl);
            const gridSize = parseInt(gridSizeInput.value, 10);
            const tileSize = parseInt(tileSizeInput.value, 10);
            drawImageOnCanvas(canvas, image, gridSize, tileSize);
        }
    });
}

// Appeler la fonction principale lorsque la page est entièrement chargée
window.addEventListener('load', processImage);
