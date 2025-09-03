// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB6vIwzAz7XImW0tCJCMzPFRuA27CP4HUk",
  authDomain: "skillswapchat.firebaseapp.com",
  projectId: "skillswapchat",
  storageBucket: "skillswapchat.firebasestorage.app",
  messagingSenderId: "225231300692",
  appId: "1:225231300692:web:ed2ffbfc2f1fc5a356a5c1",
  measurementId: "G-BTL94RZT0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Send message function
window.sendMessage = function () {
    const username = document.getElementById("username").value;
    const message = document.getElementById("messageInput").value;

    if (username && message) {
        push(ref(db, "messages"), {
            name: username,
            text: message
        });

        document.getElementById("messageInput").value = "";
    }
}

// Display messages
const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${msg.name}:</strong> ${msg.text}`;
    document.getElementById("messages").appendChild(msgElement);
});
