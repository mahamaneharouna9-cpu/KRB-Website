const https = require('https');
const fs = require('fs');

const url = "https://storage.googleapis.com/storage/v1/b/krbengineering/o?prefix=favicons/";

function downloadFile(fileUrl, filename) {
    https.get(fileUrl, response => {
        if (response.statusCode === 200) {
            const fileStream = fs.createWriteStream('./public/' + filename);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log('Downloaded ' + filename);
            });
        } else {
            console.log('Failed to download ' + filename + ' (Status: ' + response.statusCode + ')');
        }
    }).on('error', err => {
        console.log('Error downloading ' + filename + ': ' + err.message);
    });
}

https.get(url, res => {
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            if (parsedData.items) {
                parsedData.items.forEach(item => {
                    const filename = item.name.split('/').pop();
                    if (!filename) return; // skip directory itself
                    const fileUrl = "https://storage.googleapis.com/krbengineering/" + item.name.split('/').map(encodeURIComponent).join('/');
                    downloadFile(fileUrl, filename);
                });
            } else {
                console.log('No items found or bucket not publicly listable.');
                probeCommon();
            }
        } catch (e) {
            console.error('Error parsing JSON', e);
            probeCommon();
        }
    });
}).on('error', e => {
    console.error('Got error: ' + e.message);
    probeCommon();
});

function probeCommon() {
    const files = [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'site.webmanifest',
        'favicon.svg',
        'favicon.png'
    ];
    files.forEach(file => {
        const fileUrl = "https://storage.googleapis.com/krbengineering/favicons/" + file;
        downloadFile(fileUrl, file);
    });
}
