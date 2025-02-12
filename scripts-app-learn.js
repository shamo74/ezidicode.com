// تفعيل زر القائمة (الهامبرغر) للأجهزة الصغيرة
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');

toggleSidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !toggleSidebarBtn.contains(event.target)) {
    sidebar.classList.remove('active');
  }
});
    document.getElementById('close-sidebar').addEventListener('click', () => {
    sidebar.classList.remove('active');
});
    // التنقل بين الأقسام عبر الشريط الجانبي
    document.querySelectorAll('.nav-menu ul li').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-menu ul li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');
        const target = item.getAttribute('data-target');
        document.querySelectorAll('.content-section').forEach(section => {
          section.classList.remove('active');
          if(section.id === target) {
            section.classList.add('active');
          }
        });
        // إغلاق الشريط الجانبي على الأجهزة الصغيرة
        if(window.innerWidth <= 768) {
          sidebar.classList.remove('active');
        }
      });
    });
    
    // متحكم حجم الخط في قسم الإعدادات
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeValue = document.getElementById('font-size-value');
    fontSizeSlider.addEventListener('input', () => {
      const size = fontSizeSlider.value + 'px';
      document.body.style.fontSize = size;
      fontSizeValue.textContent = size;
    });
    
    // تفعيل/إيقاف الوضع الليلي عبر خانة الاختيار في الإعدادات
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    darkModeToggle.addEventListener('change', () => {
      if(darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
    
    // زر تشغيل الصوت المتقدم
    document.querySelectorAll('.play-btn').forEach(button => {
      // استبعاد أي زر غير متعلق بالصوت (مثل أزرار أخرى في الإعدادات)
      if(button.id === 'toggle-dark-mode') return;
      button.playCount = 0;
      button.currentAudio = null;
      
      button.addEventListener('click', function() {
        // في حال كان هناك صوت يعمل مسبقاً، إيقافه وإعادة تشغيله
        if(this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
          this.currentAudio = null;
          this.classList.remove('playing');
        }
        // زيادة عداد التشغيل لتحديد سرعة الصوت:
        // - المرة الأولى: سرعة طبيعية (1.0)
        // - المرة الثانية: سرعة أبطأ (0.8)
        // - للمرات التالية: تبديل بين الطبيعي والأبطأ
        this.playCount++;
        let rate = 1.0;
        if(this.playCount === 1) {
          rate = 1.0;
        } else if(this.playCount === 2) {
          rate = 0.5;
        } else {
          rate = (this.playCount % 2 === 1) ? 1.0 : 0.8;
        }
        const audioUrl = this.getAttribute('data-audio');
        const audio = new Audio(audioUrl);
        audio.playbackRate = rate;
        this.currentAudio = audio;
        this.classList.add('playing');
        audio.play().catch(error => {
          console.error("خطأ في تشغيل الصوت:", error);
          this.classList.remove('playing');
        });
        audio.onended = () => {
          this.classList.remove('playing');
          this.currentAudio = null;
        };
      });
    });
