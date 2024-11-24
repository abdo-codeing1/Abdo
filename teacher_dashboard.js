// وظيفة إنشاء اختبار
document.getElementById('quizForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const quizTitle = document.getElementById('quizTitle').value;
  const quizQuestions = document.getElementById('quizQuestions').value.split('\n');

  if (quizTitle && quizQuestions.length > 0) {
    // حفظ الاختبار (تخزين محلي أو قاعدة بيانات)
    alert(`تم إنشاء اختبار بعنوان "${quizTitle}" مع ${quizQuestions.length} سؤال.`);
    document.getElementById('quizMessage').textContent = 'تم إنشاء الاختبار بنجاح!';
    // يمكنك تخزين البيانات في قاعدة بيانات Firebase
  } else {
    alert('يرجى إدخال عنوان وأسئلة للاختبار!');
  }
});

// وظيفة النشر
document.getElementById('publishForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const publishContent = document.getElementById('publishContent').value;
  const publishFile = document.getElementById('publishFile').files[0];

  if (publishContent) {
    // حفظ المنشور (تخزين محلي أو قاعدة بيانات)
    alert(`تم نشر: "${publishContent}"`);
    document.getElementById('publishMessage').textContent = 'تم نشر المحتوى بنجاح!';
    // يمكن رفع الملف باستخدام Firebase Storage
  } else {
    alert('يرجى إدخال محتوى للنشر!');
  }
});

// وظيفة عرض الإشعارات
function addNotification(message) {
  const notificationsList = document.getElementById('notificationsList');
  const listItem = document.createElement('li');
  listItem.textContent = message;
  notificationsList.appendChild(listItem);
}

// مثال على إشعار
addNotification('قام أحد الطلاب بالتعليق على منشورك.');
