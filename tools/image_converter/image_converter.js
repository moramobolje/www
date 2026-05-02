const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const workspaceSection = document.getElementById('workspaceSection');
const fileListContainer = document.getElementById('fileList');
const targetFormat = document.getElementById('targetFormat');
const lossyOptions = document.getElementById('lossyOptions');
const indexedOptions = document.getElementById('indexedOptions');
const qualityRange = document.getElementById('qualityRange');
const qualityVal = document.getElementById('qualityVal');
const convertAllBtn = document.getElementById('convertAllBtn');
const downloadZipBtn = document.getElementById('downloadZipBtn');
const fileCountBadge = document.getElementById('fileCount');

let fileQueue = [];

// Interaction Handlers
dropZone.onclick = () => fileInput.click();
fileInput.onchange = (e) => handleFiles(e.target.files);

dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('bg-light'); };
dropZone.ondragleave = () => dropZone.classList.remove('bg-light');
dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('bg-light');
    handleFiles(e.dataTransfer.files);
};

targetFormat.onchange = () => {
    const val = targetFormat.value;
    // PNG uses quantization settings, others (JPG, WEBP, AVIF) use the quality slider
    if (val === 'image/png') {
        lossyOptions.classList.add('d-none');
        indexedOptions.classList.remove('d-none');
    } else {
        lossyOptions.classList.remove('d-none');
        indexedOptions.classList.add('d-none');
    }
};

qualityRange.oninput = () => qualityVal.innerText = `${qualityRange.value}%`;

function handleFiles(files) {
    if (!files.length) return;
    
    uploadSection.classList.add('d-none');
    workspaceSection.classList.remove('d-none');

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const fileId = Math.random().toString(36).substr(2, 9);
        const fileObj = {
            id: fileId,
            file: file,
            status: 'pending',
            resultBlob: null,
            previewUrl: URL.createObjectURL(file)
        };
        
        fileQueue.push(fileObj);
        renderFileItem(fileObj);
    });

    fileCountBadge.innerText = `${fileQueue.length} Files`;
}

function renderFileItem(item) {
    const div = document.createElement('div');
    div.className = 'file-item';
    div.id = `item-${item.id}`;
    div.innerHTML = `
        <img src="${item.previewUrl}" class="file-preview" alt="preview">
        <div class="flex-grow-1">
            <div class="fw-bold text-truncate" style="max-width: 250px;">${item.file.name}</div>
            <div class="text-muted smaller" style="font-size: 0.75rem;">
                ${(item.file.size / 1024).toFixed(1)} KB • <span class="status-text">Ready</span>
            </div>
        </div>
        <div class="status-indicator">
            <span class="status-dot status-pending"></span>
        </div>
    `;
    fileListContainer.appendChild(div);
}

function updateItemStatus(id, status, text) {
    const item = document.getElementById(`item-${id}`);
    if (!item) return;
    const dot = item.querySelector('.status-dot');
    const statusTxt = item.querySelector('.status-text');
    
    dot.className = `status-dot status-${status}`;
    statusTxt.innerText = text;
    if (status === 'complete') statusTxt.classList.add('text-success');
}

convertAllBtn.onclick = async () => {
    convertAllBtn.disabled = true;
    downloadZipBtn.classList.add('d-none');
    
    const quality = parseInt(qualityRange.value) / 100;
    const format = targetFormat.value;
    const colorLimit = parseInt(document.getElementById('pngColors').value);

    for (const item of fileQueue) {
        if (item.status === 'complete') continue;
        
        item.status = 'processing';
        updateItemStatus(item.id, 'processing', 'Converting...');

        try {
            const blob = await processImage(item.file, format, quality, colorLimit);
            item.resultBlob = blob;
            item.status = 'complete';
            updateItemStatus(item.id, 'complete', `Done (${(blob.size / 1024).toFixed(1)} KB)`);
        } catch (err) {
            console.error(err);
            updateItemStatus(item.id, 'pending', 'Error: Format not supported');
        }
    }

    convertAllBtn.disabled = false;
    downloadZipBtn.classList.remove('d-none');
};

function processImage(file, format, quality, colorLimit) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            // Add white background for JPEGs
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
                else reject(new Error("Canvas toBlob failed"));
            }, format, quality);
            
            URL.revokeObjectURL(img.src);
        };
        img.onerror = () => reject(new Error("Image loading failed"));
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

downloadZipBtn.onclick = async () => {
    const zip = new JSZip();
    const extension = targetFormat.value.split('/')[1].replace('jpeg', 'jpg');

    fileQueue.forEach(item => {
        if (item.resultBlob) {
            const name = item.file.name.substring(0, item.file.name.lastIndexOf('.')) || item.file.name;
            zip.file(`${name}.${extension}`, item.resultBlob);
        }
    });

    const content = await zip.generateAsync({type: "blob"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `converted-images-${Date.now()}.zip`;
    link.click();
};