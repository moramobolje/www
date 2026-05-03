const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const workspaceSection = document.getElementById('workspaceSection');
const targetFormat = document.getElementById('targetFormat');
const lossyOptions = document.getElementById('lossyOptions');
const indexedOptions = document.getElementById('indexedOptions');
const qualityRange = document.getElementById('qualityRange');
const qualityVal = document.getElementById('qualityVal');
const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');
const mainPreview = document.getElementById('mainPreview');
const fileDetails = document.getElementById('fileDetails');

let currentFile = null;

// File Pickers
dropZone.onclick = () => fileInput.click();
fileInput.onchange = (e) => {
    handleFile(e.target.files[0]);
};

// Drag and Drop
dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('upload-zone-active'); };
dropZone.ondragleave = () => dropZone.classList.remove('upload-zone-active');
dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('upload-zone-active');
    handleFile(e.dataTransfer.files[0]);
};

// Format Switching Logic
targetFormat.onchange = () => {
    const isPng = targetFormat.value === 'image/png';
    lossyOptions.classList.toggle('d-none', isPng);
    indexedOptions.classList.toggle('d-none', !isPng);
};

qualityRange.oninput = () => qualityVal.innerText = `${qualityRange.value}%`;

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    
    currentFile = file;
    uploadSection.classList.add('d-none');
    workspaceSection.classList.remove('d-none');
    
    // Revoke previous blob if exists to save memory
    if (mainPreview.src) URL.revokeObjectURL(mainPreview.src);
    
    mainPreview.src = URL.createObjectURL(file);
    mainPreview.classList.remove('d-none');
    fileDetails.innerHTML = `<span class="fw-bold">${file.name}</span> • ${(file.size / 1024).toFixed(1)} KB`;
}

// Full Reset Logic
resetBtn.onclick = () => {
    currentFile = null;
    fileInput.value = ''; // CRITICAL: Reset the input so same file can be picked again
    if (mainPreview.src) URL.revokeObjectURL(mainPreview.src);
    mainPreview.src = '';
    mainPreview.classList.add('d-none');
    workspaceSection.classList.add('d-none');
    uploadSection.classList.remove('d-none');
};

convertBtn.onclick = async () => {
    if (!currentFile) return;
    
    convertBtn.disabled = true;
    const originalText = convertBtn.innerHTML;
    convertBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

    const quality = parseInt(qualityRange.value) / 100;
    const format = targetFormat.value;
    const colorLimit = parseInt(document.getElementById('pngColors').value);

    try {
        const blob = await processImage(currentFile, format, quality, colorLimit);
        downloadFile(blob, format);
    } catch (err) {
        alert("Browser error: Selected format not supported for encoding.");
        console.error(err);
    } finally {
        convertBtn.disabled = false;
        convertBtn.innerHTML = originalText;
    }
};

function processImage(file, format, quality, colorLimit) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            if (format === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            ctx.drawImage(img, 0, 0);

            if (format === 'image/png' && colorLimit > 0) {
                applyQuantization(ctx, canvas.width, canvas.height, colorLimit);
            }

            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Encoding failed"));
            }, format, quality);
            
            URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(file);
    });
}

function applyQuantization(ctx, w, h, levels) {
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const factor = 256 / Math.sqrt(levels);
    const keepAlpha = document.getElementById('keepAlpha').checked;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] / factor) * factor;
        data[i+1] = Math.round(data[i+1] / factor) * factor;
        data[i+2] = Math.round(data[i+2] / factor) * factor;
        if (!keepAlpha) data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}

function downloadFile(blob, format) {
    const ext = format.split('/')[1].replace('jpeg', 'jpg');
    const name = currentFile.name.substring(0, currentFile.name.lastIndexOf('.')) || 'converted';
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${name}.${ext}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
}