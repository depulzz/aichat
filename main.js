document.addEventListener("DOMContentLoaded", function () {
    // Elemen Chat
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const saveChatButton = document.getElementById("saveChat");
    const loadChatButton = document.getElementById("loadChat");
    const fileUpload = document.getElementById("fileUpload");
    const chatBox = document.getElementById("chatBox");
    const sendMessageButton = document.getElementById("sendMessage");

    // Elemen Profil
    const userNameInput = document.getElementById("userName");
    const userBioInput = document.getElementById("userBio");
    const saveProfileButton = document.getElementById("saveProfileButton");
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
    //  saveProfileButton.addEventListener("click", function () {
//         const userName = userNameInput.value.trim();
//         const userBio = userBioInput.value.trim();
// 
//         if (userName && userBio) {
//             localStorage.setItem("userName", userName);
//             localStorage.setItem("userBio", userBio);
//             alert("Profile saved!");
//             showProfile(userName, userBio);
//         } else {
//             alert("Please enter both username and bio.");
//         }
//     });

    // Menampilkan profil
    function showProfile(userName, userBio) {
        profileNameDisplay.textContent = userName;
        profileBioDisplay.textContent = userBio;
    }

    // Tampilkan profil saat pertama kali dimuat
    const savedUserName = localStorage.getItem("userName");
    const savedUserBio = localStorage.getItem("userBio");

    if (savedUserName && savedUserBio) {
        showProfile(savedUserName, savedUserBio);
    } else {
     console.log('else')
    }

    // Tombol untuk menampilkan profil
    

    // Tombol Edit profil
    document.getElementById("editProfileButton").addEventListener("click", function () {
        profileContent.classList.remove("d-none");
        profileDisplay.classList.add("d-none");
    });

const themeSwitcher = document.getElementById("themeSwitcher");

// Cek jika localStorage sudah menyimpan dark mode
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// Event listener untuk mengaktifkan atau menonaktifkan dark mode
themeSwitcher.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "true");
    } else {
        localStorage.setItem("darkMode", "false");
    }
});

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
    

    // Event listener untuk menu navigasi
    chatMenu.addEventListener("click", function () {
        showContent(chatContainer);
    });


});
const canvas = document.getElementById("animatedBackground");
const ctx = canvas.getContext("3d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const leaves = [];
const leafEmoji = "🍃"; // Emoji daun

// Kelas untuk objek daun
class Leaf {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10; // Ukuran daun antara 10-30px (lebih kecil)
        this.speedX = Math.random() * 2 - 1; // Gerakan horizontal acak
        this.speedY = Math.random() * 0.5 + 0.5; // Gerakan vertikal lebih pelan (antara 0.5-1)
        this.rotation = Math.random() * 360; // Rotasi awal
        this.rotationSpeed = Math.random() * 2 - 1; // Rotasi ke kiri/kanan
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Jika daun keluar dari bawah layar, kembalikan ke atas
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.font = `${this.size}px Arial`; // Menyesuaikan ukuran font dengan size daun
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillText(leafEmoji, -this.size / 2, this.size / 2);
        ctx.restore();
    }
}

// Buat banyak daun
for (let i = 0; i < 50; i++) {
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