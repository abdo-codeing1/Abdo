// Import Firestore
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// إعداد Firestore
const db = getFirestore(app);

// قسم إنشاء الاختبارات
document.getElementById('quizForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const quizTitle = document.getElementById('quizTitle').value;
  const quizQuestions = document.getElementById('quizQuestions').value.split('\n');

  if (quizTitle && quizQuestions.length > 0) {
    try {
      // إضافة الاختبار إلى Firestore
      await addDoc(collection(db, 'quizzes'), {
        title: quizTitle,
        questions: quizQuestions,
        createdAt: serverTimestamp(),
      });
      alert(`تم إنشاء الاختبار بنجاح: "${quizTitle}"`);
      document.getElementById('quizMessage').textContent = 'تم إنشاء الاختبار بنجاح!';
    } catch (error) {
      console.error('Error adding quiz: ', error);
    }
  } else {
    alert('يرجى إدخال عنوان وأسئلة للاختبار!');
  }
});

// قسم النشر
document.getElementById('publishForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const publishContent = document.getElementById('publishContent').value;
  const publishFile = document.getElementById('publishFile').files[0];

  try {
    let fileURL = '';
    if (publishFile) {
      // رفع الملف إلى Firebase Storage
      const storageRef = ref(storage, `uploads/${publishFile.name}`);
      const uploadTask = await uploadBytes(storageRef, publishFile);
      fileURL = await getDownloadURL(uploadTask.ref);
    }

    // إضافة المنشور إلى Firestore
    await addDoc(collection(db, 'posts'), {
      content: publishContent,
      fileURL,
      createdAt: serverTimestamp(),
    });
    alert('تم نشر المحتوى بنجاح!');
    document.getElementById('publishMessage').textContent = 'تم نشر المحتوى بنجاح!';
  } catch (error) {
    console.error('Error publishing content: ', error);
  }
});
