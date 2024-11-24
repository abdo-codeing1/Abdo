// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOkXzcjRDRA-fH6BHiv4TY7vujcITvjE4",
  authDomain: "school1-8dbfa.firebaseapp.com",
  projectId: "school1-8dbfa",
  storageBucket: "school1-8dbfa.appspot.com",
  messagingSenderId: "72005732928",
  appId: "1:72005732928:web:c56f4964d7eb6fc03aeda5",
  measurementId: "G-QSQMYR3VTL"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Sign-Up
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userType = document.getElementById('userType').value;

  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Display success message
    alert(`تم إنشاء الحساب بنجاح كـ ${userType}`);
    // Redirect based on userType
    if (userType === "teacher") {
      window.location.href = "/teacher.html";
    } else {
      window.location.href = "/student.html";
    }
  } catch (error) {
    document.getElementById('errorMessage').textContent = error.message;
  }
});
