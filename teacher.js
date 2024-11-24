// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOkXzcjRDRA-fH6BHiv4TY7vujcITvjE4",
  authDomain: "school1-8dbfa.firebaseapp.com",
  projectId: "school1-8dbfa",
  storageBucket: "school1-8dbfa.appspot.com",
  messagingSenderId: "72005732928",
  appId: "1:72005732928:web:c56f4964d7eb6fc03aeda5",
  measurementId: "G-QSQMYR3VTL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// التعامل مع تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const teacherName = document.getElementById('teacherName').value.trim();
  const teacherID = document.getElementById('teacherID').value.trim();
  const teacherPhone = document.getElementById('teacherPhone').value.trim();

  try {
    // البحث عن بيانات المعلم في Firestore
    const q = query(
      collection(db, "teachers"),
      where("name", "==", teacherName),
      where("nationalID", "==", teacherID),
      where("phone", "==", teacherPhone)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // إذا كانت البيانات صحيحة، انقل المستخدم إلى صفحة dashboard
      window.location.href = "teacher_dashboard.html";
    } else {
      // إذا كانت البيانات غير صحيحة، عرض رسالة خطأ
      document.getElementById('errorMessage').textContent = "بياناتك غير صحيحة. حاول مرة أخرى.";
      document.getElementById('errorMessage').style.display = 'block';
    }
  } catch (error) {
    console.error("Error during login:", error);
    document.getElementById('errorMessage').textContent = "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.";
    document.getElementById('errorMessage').style.display = 'block';
  }
});
