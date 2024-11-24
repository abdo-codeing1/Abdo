// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// التعامل مع نموذج تسجيل المعلم
document.getElementById('teacherForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const teacherName = document.getElementById('teacherName').value.trim();
  const teacherID = document.getElementById('teacherID').value.trim();
  const teacherPhone = document.getElementById('teacherPhone').value.trim();

  try {
    // إضافة معلومات المعلم إلى Firestore
    await addDoc(collection(db, 'teachers'), {
      name: teacherName,
      nationalID: teacherID,
      phone: teacherPhone,
      createdAt: serverTimestamp(),
    });

    // عرض رسالة نجاح
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';

    // إعادة تعيين النموذج
    document.getElementById('teacherForm').reset();
  } catch (error) {
    console.error("Error saving teacher data: ", error);
    document.getElementById('errorMessage').textContent = 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.';
    document.getElementById('errorMessage').style.display = 'block';
  }
});
