// Function to load a CSS file
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Function to dynamically load the Waline comment system
function loadComments() {
    // Load local Waline and Prism CSS
    loadCSS('https://cdn.jsdelivr.net/gh/sugarlessmuffins/walineclient@v0.0.2/dist/waline.css');
    loadCSS('https://unpkg.com/prismjs@v1/themes/prism-tomorrow.min.css');
    
    // Load fonts asynchronously
    loadCSS('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');

    // Create a script element for PrismJS
    const prismScript = document.createElement('script');
    prismScript.src = 'https://unpkg.com/prismjs@v1/plugins/autoloader/prism-autoloader.min.js';
    document.body.appendChild(prismScript);

    // Dynamically import the local Waline script as a module
    import('https://cdn.jsdelivr.net/gh/sugarlessmuffins/walineclient@v0.0.2/dist/waline.js').then(({ init }) => {
        init({
            el: '#waline',
            serverURL: 'https://komen.izanami.rest',
            path: '/3',
            lang: 'en',
            dark: 'auto',
            locale: {
                nick: 'Nickname',
                nickError: 'Nickname tidak boleh kurang dari 3 digit.',
                mail: 'E-mail',
                mailError: 'Mohon konfirmasi alamat email kamu.',
                link: 'Website',
                optional: 'Opsional',
                placeholder: 'Komen di mari...',
                sofa: 'Belum ada komentar.',
                submit: 'Kirim',
                like: 'Suka',
                cancelLike: 'Batal suka',
                reply: 'Balas',
                cancelReply: 'Batal balas',
                comment: 'Komentar',
                refresh: 'Reload',
                more: 'Lebih Banyak...',
                preview: 'Pratinjau',
                emoji: 'Emoji',
                uploadImage: 'Unggah Gambar',
                seconds: 'detik yang lalu',
                minutes: 'menit yang lalu',
                hours: 'jam yang lalu',
                days: 'hari yang lalu',
                now: 'baru saja',
                uploading: 'Meng-upload',
                login: 'Login',
                logout: 'Logout',
                admin: 'Admin',
                sticky: 'Sticky',
                word: 'Kata',
                wordHint: 'Silakan masukkan komentar antara $0 dan $1 kata!\n Jumlah kata saat ini: $2',
                anonymous: 'Anonim',
                level0: 'Villager',
                level1: 'Knight',
                level2: 'Earl',
                level3: 'Marquess',
                level4: 'Duke',
                level5: 'Archduke',
                gif: 'GIF',
                gifSearchPlaceholder: 'Cari GIF',
                profile: 'Profil',
                approved: 'Disetujui',
                waiting: 'Menunggu',
                spam: 'Spam',
                unsticky: 'Unsticky',
                oldest: 'Terlama',
                latest: 'Terbaru',
                hottest: 'Terpopuler',
                reactionTitle: 'Gimana Menurutmu?',
            },
            reaction: true,
            reaction: [
                'https://cdn.discordapp.com/emojis/954256341944397864.webp',
                'https://cdn.discordapp.com/emojis/1029399978583539742.webp',
                'https://cdn.discordapp.com/emojis/1181987772618264606.webp',
                'https://cdn.discordapp.com/emojis/1073942886518890566.webp',
            ],
            emoji: [
                'https://cdn.jsdelivr.net/gh/sugarlessmuffins/pepemoji@1.0.1/',
                'https://cdn.jsdelivr.net/gh/sugarlessmuffins/papanmoji@v.0.0.1/',
            ],
            imageUploader: (file) => {
                let formData = new FormData();
        
                formData.append('image', file);
                formData.append('key', 'd8dc5b96ed210c8360b48acb0fa5ee32');
        
                return fetch('https://api.imgbb.com/1/upload', {
                    method: 'POST',
                    body: formData,
                })
                .then((resp) => resp.json())
                .then((resp) => resp.data.url);
            },
        });
    });

    // Hide the load comments button
    document.getElementById('load-comments').style.display = 'none';

    // Show the Waline container
    document.getElementById('waline').style.display = 'block';
}

// Attach event listener to button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('load-comments').addEventListener('click', loadComments);
});
