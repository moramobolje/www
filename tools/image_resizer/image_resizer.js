const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const workspaceSection = document.getElementById('workspaceSection');
const mainPreview = document.getElementById('mainPreview');
const previewWrapper = document.getElementById('previewWrapper');
const cropOverlay = document.getElementById('cropOverlay');
const cropBox = document.getElementById('cropBox');
const originalMeta = document.getElementById('originalMeta');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const aspectRatio = document.getElementById('aspectRatio');
const formatRadios = document.getElementsByName('format');
const jpgOptions = document.getElementById('jpgOptions');
const pngOptions = document.getElementById('pngOptions');
const qualityRange = document.getElementById('qualityRange');
const qualityVal = document.getElementById('qualityVal');
const transparentCheck = document.getElementById('transparentCheck');
const pngColors = document.getElementById('pngColors');
const downloadBtn = document.getElementById('downloadBtn');
const toggleCropBtn = document.getElementById('toggleCropBtn');

let originalImg = new Image();
let currentRatio = 1;
let rotation = 0;
let isCropping = false;

// File Upload Handling - Triggered by entire zone or the specific button
dropZone.onclick = (e) => {
    if (e.target.tagName !== 'INPUT') fileInput.click();
};

fileInput.onchange = (e) => { 
    if (e.target.files[0]) handleFile(e.target.files[0]); 
};

// Drag and Drop
dropZone.ondragover = (e) => { 
    e.preventDefault(); 
    dropZone.style.borderColor = "var(--primary-color)"; 
    dropZone.style.background = "#f1f5f9";
};
dropZone.ondragleave = () => { 
    dropZone.style.borderColor = "#cbd5e1"; 
    dropZone.style.background = "#ffffff";
};
dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#cbd5e1";
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
};

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        originalImg.src = event.target.result;
        originalImg.onload = () => {
            rotation = 0;
            isCropping = false;
            cropOverlay.style.display = 'none';
            applyRotationToPreview();
            updateMetaAndInputs();
            mainPreview.src = originalImg.src;
            uploadSection.classList.add('d-none');
            workspaceSection.classList.remove('d-none');
        };
    };
    reader.readAsDataURL(file);
}

function resetApp() {
    workspaceSection.classList.add('d-none');
    uploadSection.classList.remove('d-none');
    fileInput.value = '';
}

// UI Toggles
formatRadios.forEach(radio => {
    radio.onchange = (e) => {
        jpgOptions.classList.toggle('d-none', e.target.value !== 'image/jpeg');
        pngOptions.classList.toggle('d-none', e.target.value === 'image/jpeg');
    };
});

function rotateImage(degrees) {
    rotation = (rotation + degrees) % 360;
    applyRotationToPreview();
    updateMetaAndInputs();
    if (isCropping) initCropBox(); 
}

function applyRotationToPreview() {
    mainPreview.style.transform = `rotate(${rotation}deg)`;
}

function updateMetaAndInputs() {
    const isVertical = Math.abs(rotation % 180) === 90;
    const w = isVertical ? originalImg.height : originalImg.width;
    const h = isVertical ? originalImg.width : originalImg.height;
    currentRatio = w / h;
    widthInput.value = w;
    heightInput.value = h;
    originalMeta.innerText = `${w} x ${h}`;
}

// Input Synchronization
widthInput.oninput = () => {
    if (aspectRatio.checked) heightInput.value = Math.round(widthInput.value / currentRatio);
};
heightInput.oninput = () => {
    if (aspectRatio.checked) widthInput.value = Math.round(heightInput.value * currentRatio);
};
qualityRange.oninput = () => qualityVal.innerText = `${qualityRange.value}%`;

// Cropping Logic
toggleCropBtn.onclick = () => {
    isCropping = !isCropping;
    cropOverlay.style.display = isCropping ? 'block' : 'none';
    toggleCropBtn.classList.toggle('btn-primary', isCropping);
    toggleCropBtn.classList.toggle('btn-outline-primary', !isCropping);
    if (isCropping) initCropBox();
};

function initCropBox() {
    const rect = mainPreview.getBoundingClientRect();
    const wrapRect = previewWrapper.getBoundingClientRect();
    const w = rect.width * 0.8;
    const h = rect.height * 0.8;
    cropBox.style.width = w + 'px';
    cropBox.style.height = h + 'px';
    cropBox.style.left = (wrapRect.width - w) / 2 + 'px';
    cropBox.style.top = (wrapRect.height - h) / 2 + 'px';
}

let activeDrag = null;
let startX, startY, startW, startH, startL, startT;

cropBox.addEventListener('mousedown', startDrag);
cropBox.addEventListener('touchstart', (e) => startDrag(e.touches[0]), {passive: false});

function startDrag(e) {
    activeDrag = e.target.dataset.handle || 'move';
    startX = e.clientX;
    startY = e.clientY;
    const rect = cropBox.getBoundingClientRect();
    const wrap = previewWrapper.getBoundingClientRect();
    startW = rect.width;
    startH = rect.height;
    startL = rect.left - wrap.left;
    startT = rect.top - wrap.top;
}

const onMove = (e) => {
    if (!activeDrag) return;
    const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
    const dx = clientX - startX;
    const dy = clientY - startY;

    if (activeDrag === 'move') {
        cropBox.style.left = (startL + dx) + 'px';
        cropBox.style.top = (startT + dy) + 'px';
    } else {
        if (activeDrag.includes('e')) cropBox.style.width = Math.max(20, startW + dx) + 'px';
        if (activeDrag.includes('s')) cropBox.style.height = Math.max(20, startH + dy) + 'px';
        if (activeDrag.includes('w')) {
            cropBox.style.width = Math.max(20, startW - dx) + 'px';
            cropBox.style.left = (startL + dx) + 'px';
        }
        if (activeDrag.includes('n')) {
            cropBox.style.height = Math.max(20, startH - dy) + 'px';
            cropBox.style.top = (startT + dy) + 'px';
        }
    }
};

window.addEventListener('mousemove', onMove);
window.addEventListener('touchmove', onMove, {passive: false});
window.addEventListener('mouseup', () => activeDrag = null);
window.addEventListener('touchend', () => activeDrag = null);

// Final Export
downloadBtn.onclick = () => {
    const selectedFormat = document.querySelector('input[name="format"]:checked').value;
    const targetW = parseInt(widthInput.value);
    const targetH = parseInt(heightInput.value);
    
    const sourceCanvas = document.createElement('canvas');
    const sCtx = sourceCanvas.getContext('2d');
    const isVertical = Math.abs(rotation % 180) === 90;
    
    sourceCanvas.width = isVertical ? originalImg.height : originalImg.width;
    sourceCanvas.height = isVertical ? originalImg.width : originalImg.height;
    
    sCtx.translate(sourceCanvas.width / 2, sourceCanvas.height / 2);
    sCtx.rotate(rotation * Math.PI / 180);
    sCtx.drawImage(originalImg, -originalImg.width / 2, -originalImg.height / 2);
    
    const finalCanvas = document.createElement('canvas');
    const fCtx = finalCanvas.getContext('2d');
    finalCanvas.width = targetW;
    finalCanvas.height = targetH;

    if (selectedFormat === 'image/jpeg') {
        fCtx.fillStyle = '#FFFFFF';
        fCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    }

    if (isCropping) {
        const pRect = mainPreview.getBoundingClientRect();
        const bRect = cropBox.getBoundingClientRect();
        const scaleX = sourceCanvas.width / pRect.width;
        const scaleY = sourceCanvas.height / pRect.height;
        fCtx.drawImage(sourceCanvas, (bRect.left - pRect.left) * scaleX, (bRect.top - pRect.top) * scaleY, bRect.width * scaleX, bRect.height * scaleY, 0, 0, targetW, targetH);
    } else {
        fCtx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, targetW, targetH);
    }

    if (selectedFormat === 'image/png' && pngColors.value !== "0") {
        applyQuantization(fCtx, targetW, targetH, parseInt(pngColors.value));
    }

    const quality = selectedFormat === 'image/jpeg' ? parseInt(qualityRange.value) / 100 : 1;
    const dataUrl = finalCanvas.toDataURL(selectedFormat, quality);
    const link = document.createElement('a');
    link.download = `resizer-export-${Date.now()}.${selectedFormat === 'image/jpeg' ? 'jpg' : 'png'}`;
    link.href = dataUrl;
    link.click();
    showStatus("Image ready!", "text-success");
};

function applyQuantization(ctx, w, h, levels) {
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const factor = 256 / Math.sqrt(levels);
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] / factor) * factor;
        data[i+1] = Math.round(data[i+1] / factor) * factor;
        data[i+2] = Math.round(data[i+2] / factor) * factor;
        if (!transparentCheck.checked) data[i+3] = 255; 
    }
    ctx.putImageData(imgData, 0, 0);
}

function showStatus(msg, colorClass) {
    const statusMsg = document.getElementById('statusMsg');
    statusMsg.innerText = msg;
    statusMsg.className = `mt-3 text-center small ${colorClass}`;
    statusMsg.classList.remove('d-none');
    setTimeout(() => statusMsg.classList.add('d-none'), 3000);
}