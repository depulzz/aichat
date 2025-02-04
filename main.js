document.addEventListener("DOMContentLoaded", function () {
    // Elemen Chat
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const emojiButton = document.getElementById("emojiButton");
    const emojiPicker = document.getElementById("emojiPicker");
    const saveChatButton = document.getElementById("saveChat");
    const loadChatButton = document.getElementById("loadChat");
    const fileUpload = document.getElementById("fileUpload");
    const chatBox = document.getElementById("chatBox");
    const sendMessageButton = document.getElementById("sendMessage");

    // Elemen Profil
    const userNameInput = document.getElementById("userName");
    const userBioInput = document.getElementById("userBio");
    const saveProfileButton = document.getElementById("saveProfile");
    const displayProfileButton = document.getElementById("displayProfile");
    const profileContent = document.getElementById("profileContent");
    const profileDisplay = document.getElementById("profileDisplay");
    const profileNameDisplay = document.getElementById("displayUsername");
    const profileBioDisplay = document.getElementById("displayBio");

    // Elemen Pengaturan
    const darkModeToggle = document.getElementById("darkModeToggle");
    const resetSettingsButton = document.getElementById("resetSettings");

    // Fungsi untuk menambahkan pesan ke dalam chat box
    function appendMessage(message, sender) {
        const messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-bubble", sender);
        messageBubble.textContent = message;
        chatBox.appendChild(messageBubble);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Fungsi untuk mengirim pesan
    chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, "user");
            userInput.value = ""; // Kosongkan input pengguna

            // Simulasi balasan dari AI
            setTimeout(() => {
                appendMessage("AI is typing...", "ai");
                setTimeout(() => {
                    chatBox.lastChild.remove(); // Hapus "AI is typing..."
                    appendMessage("Hello, how can I help you?", "ai");
                }, 1000);
            }, 500);
        }
    });

    // Emoji Picker
    emojiButton.addEventListener("click", function () {
        emojiPicker.classList.toggle("d-none");
    });

    // Menambahkan emoji ke input
    emojiPicker.addEventListener("click", function (event) {
        if (event.target.classList.contains("emoji")) {
            const emoji = event.target.getAttribute("data-emoji");
            userInput.value += emoji;
            emojiPicker.classList.add("d-none"); // Menyembunyikan emoji picker setelah memilih emoji
        }
    });

    // Menyembunyikan emoji picker jika klik di luar
    document.addEventListener("click", function (event) {
        if (!emojiButton.contains(event.target) && !emojiPicker.contains(event.target)) {
            emojiPicker.classList.add("d-none");
        }
    });

    // Menyimpan chat ke localStorage
    saveChatButton.addEventListener("click", function () {
        const chatMessages = [];
        const messageElements = chatBox.querySelectorAll(".chat-bubble");
        messageElements.forEach(function (messageElement) {
            chatMessages.push(messageElement.textContent);
        });
        localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
        alert("Chat has been saved!");
    });

    // Memuat chat dari localStorage
    loadChatButton.addEventListener("click", function () {
        const savedChat = JSON.parse(localStorage.getItem("chatMessages"));
        if (savedChat && savedChat.length > 0) {
            chatBox.innerHTML = ""; // Hapus pesan yang ada di chat box
            savedChat.forEach(function (message) {
                appendMessage(message, "user"); // Menambahkan pesan yang disimpan
            });
        } else {
            alert("No saved chat found.");
        }
    });

    // Menangani unggah file
    fileUpload.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const fileContent = event.target.result;
                appendMessage(`File uploaded: ${file.name}`, "user");
                // Anda bisa menambahkan logika untuk menangani isi file jika diperlukan
            };
            reader.readAsText(file); // Membaca file sebagai teks (untuk file teks)
        }
    });

    // Menyimpan profil ke localStorage
    saveProfileButton.addEventListener("click", function () {
        const userName = userNameInput.value.trim();
        const userBio = userBioInput.value.trim();

        if (userName && userBio) {
            localStorage.setItem("userName", userName);
            localStorage.setItem("userBio", userBio);
            alert("Profile saved!");
            showProfile(userName, userBio);
        } else {
            alert("Please enter both username and bio.");
        }
    });

    // Menampilkan profil
    function showProfile(userName, userBio) {
        profileNameDisplay.textContent = userName;
        profileBioDisplay.textContent = userBio;
        profileContent.classList.add("d-none");
        profileDisplay.classList.remove("d-none");
    }

    // Tampilkan profil saat pertama kali dimuat
    const savedUserName = localStorage.getItem("userName");
    const savedUserBio = localStorage.getItem("userBio");

    if (savedUserName && savedUserBio) {
        showProfile(savedUserName, savedUserBio);
    } else {
        profileContent.classList.remove("d-none");
    }

    // Tombol untuk menampilkan profil
    displayProfileButton.addEventListener("click", function () {
        if (savedUserName && savedUserBio) {
            showProfile(savedUserName, savedUserBio);
        } else {
            alert("No profile data found.");
        }
    });

    // Tombol Edit profil
    document.getElementById("editProfileButton").addEventListener("click", function () {
        profileContent.classList.remove("d-none");
        profileDisplay.classList.add("d-none");
    });

    // Pengaturan dark mode
    darkModeToggle.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "true");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "false");
        }
    });

    // Mengatur dark mode saat pertama kali
    if (localStorage.getItem("darkMode") === "true") {
        darkModeToggle.checked = true;
        document.body.classList.add("dark-mode");
    }

    // Reset pengaturan
    resetSettingsButton.addEventListener("click", function () {
        localStorage.removeItem("darkMode");
        darkModeToggle.checked = false;
        document.body.classList.remove("dark-mode");
    });

    // Navigasi menu
    const chatMenu = document.getElementById("chatMenu");
    const settingsMenu = document.getElementById("settingsMenu");
    const profileMenu = document.getElementById("profileMenu");

    const chatContainer = document.getElementById("chatContainer");
    const settingsContainer = document.getElementById("settingsContainer");
    const profileContainer = document.getElementById("profileContainer");

    // Fungsi untuk menyembunyikan semua konten
    function hideAllContent() {
        chatContainer.style.display = "none";
        settingsContainer.style.display = "none";
        profileContainer.style.display = "none";
    }

    // Fungsi untuk menampilkan konten
    function showContent(content) {
        hideAllContent();
        content.style.display = "block";
    }

    // Event listener untuk menu navigasi
    chatMenu.addEventListener("click", function () {
        showContent(chatContainer);
    });

    settingsMenu.addEventListener("click", function () {
        showContent(settingsContainer);
    });

    profileMenu.addEventListener("click", function () {
        showContent(profileContainer);
    });

    // Tampilkan chat secara default
    showContent(chatContainer);
});
const canvas = document.getElementById("animatedBackground");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const leaves = [];
const leafEmoji = "🍃"; // Emoji daun

// Kelas untuk objek daun
class Leaf {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5; // Ukuran lebih kecil (5-20px)
        this.speedX = Math.random() * 1 - 0.5; // Gerakan horizontal acak
        this.speedY = Math.random() * 2 + 0.5; // Gerakan turun ke bawah lebih lambat
        this.rotation = Math.random() * 360; // Rotasi awal
        this.rotationSpeed = Math.random() * 1 - 0.5; // Rotasi lebih halus
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Jika daun keluar dari bawah layar, reset ke atas
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillText(leafEmoji, -this.size / 2, this.size / 2);
        ctx.restore();
    }
}

// Buat banyak daun kecil
for (let i = 0; i < 100; i++) {
    leaves.push(new Leaf());
}

// Animasi loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let leaf of leaves) {
        leaf.update();
        leaf.draw();
    }

    requestAnimationFrame(animate);
}

// Jalankan animasi
animate();

// Perbarui ukuran canvas saat jendela berubah
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});