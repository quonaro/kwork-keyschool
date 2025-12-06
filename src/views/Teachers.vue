<template>
  <div class="teachers-page">
    <div class="page-header">
      <div class="container">
        <h1>Наши преподаватели</h1>
        <p>Опытные профессионалы, которые помогут вам достичь успеха</p>
      </div>
    </div>

    <section class="section teachers-section">
      <div class="container">
        <div class="teachers-grid">
          <Card 
            v-for="teacher in teachers" 
            :key="teacher.id"
            class="teacher-card"
          >
            <template #header>
              <div class="teacher-image">
                <img :src="teacher.image" :alt="teacher.name" />
                <Badge 
                  :value="getStudentsText(teacher.students)" 
                  severity="success"
                  class="teacher-badge"
                />
              </div>
            </template>
            <template #title>{{ teacher.name }}</template>
            <template #subtitle>
              <Tag :value="teacher.specialization" severity="info" />
            </template>
            <template #content>
              <div class="teacher-details">
                <div class="detail-row">
                  <i class="pi pi-graduation-cap"></i>
                  <div>
                    <strong>Образование</strong>
                    <p>{{ teacher.education }}</p>
                  </div>
                </div>
                <div class="detail-row">
                  <i class="pi pi-briefcase"></i>
                  <div>
                    <strong>Опыт</strong>
                    <p>{{ teacher.experience }}</p>
                  </div>
                </div>
              </div>
              <div class="teacher-story">
                <p>{{ teacher.story }}</p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAssetPath } from '../utils/path'

// Функция для правильного склонения слова "ученик"
const getStudentsText = (count) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count}+ учеников`
  } else if (lastDigit === 1) {
    return `${count}+ ученик`
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count}+ ученика`
  } else {
    return `${count}+ учеников`
  }
}

const teachers = ref([
  {
    id: 1,
    name: 'Елена Петрова',
    specialization: 'UX/UI дизайн, Графический дизайн',
    education: 'МГХПА им. Строганова, факультет дизайна',
    experience: '10 лет в дизайне, 5 лет преподавания',
    students: 450,
    story: 'Начала карьеру в дизайне 10 лет назад, работала в крупных студиях Москвы. В 2018 году основала собственную дизайн-студию. Люблю делиться опытом и видеть, как студенты раскрывают свой творческий потенциал.',
    image: getAssetPath('/3d-elements/Преподаватель женщина.png')
  },
  {
    id: 2,
    name: 'Дмитрий Смирнов',
    specialization: 'Frontend-разработка, JavaScript',
    education: 'МГУ, факультет вычислительной математики и кибернетики',
    experience: '12 лет в разработке, 6 лет преподавания',
    students: 620,
    story: 'Прошел путь от junior до lead разработчика в крупных IT-компаниях. Участвовал в разработке проектов для Сбербанка, Яндекс, Mail.ru. Преподаю с 2017 года, помогаю студентам понять не только "как", но и "почему".',
    image: getAssetPath('/3d-elements/Преподаватель мужчина.png')
  },
  {
    id: 3,
    name: 'Анна Козлова',
    specialization: 'SMM, Интернет-маркетинг',
    education: 'МГУ, факультет журналистики, дополнительное образование в маркетинге',
    experience: '8 лет в маркетинге, 4 года преподавания',
    students: 380,
    story: 'Начала карьеру в рекламном агентстве, затем перешла в digital-маркетинг. Запустила более 200 успешных рекламных кампаний. Считаю, что маркетинг - это сочетание аналитики и творчества.',
    image: getAssetPath('/3d-elements/Преподаватель женщина.png')
  },
  {
    id: 4,
    name: 'Александр Волков',
    specialization: 'Python, Data Science',
    education: 'МФТИ, факультет управления и прикладной математики',
    experience: '9 лет в разработке, 4 года преподавания',
    students: 520,
    story: 'Работал аналитиком данных в крупных компаниях, затем перешел в разработку. Специализируюсь на машинном обучении и анализе больших данных. Помогаю студентам освоить Python с нуля до уровня профессионала.',
    image: getAssetPath('/3d-elements/Преподаватель мужчина.png')
  },
  {
    id: 5,
    name: 'Мария Новикова',
    specialization: 'Графический дизайн, Брендинг',
    education: 'Британская высшая школа дизайна, курс Visual Communications',
    experience: '7 лет в дизайне, 3 года преподавания',
    students: 290,
    story: 'Работала арт-директором в креативных агентствах, создавала брендинг для известных компаний. В дизайне ценю простоту, функциональность и эмоциональное воздействие. Учу студентов мыслить концептуально.',
    image: getAssetPath('/3d-elements/Преподаватель женщина.png')
  },
  {
    id: 6,
    name: 'Игорь Лебедев',
    specialization: 'Backend-разработка, PHP, Java',
    education: 'СПбГУ, математико-механический факультет',
    experience: '11 лет в разработке, 5 лет преподавания',
    students: 480,
    story: 'Начал программировать еще в школе. Прошел путь от junior до архитектора систем. Участвовал в разработке высоконагруженных проектов. Преподаю backend-разработку, помогаю разобраться в сложных концепциях.',
    image: getAssetPath('/3d-elements/Преподаватель мужчина.png')
  }
])

// Анимация появления карточек
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in')
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  setTimeout(() => {
    document.querySelectorAll('.teacher-card').forEach((el) => {
      observer.observe(el)
    })
  }, 100)
})
</script>

<style scoped>
.teachers-page {
  padding-top: 70px;
}

.page-header {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.85) 0%, 
    rgba(139, 92, 246, 0.80) 50%,
    rgba(236, 72, 153, 0.75) 100%);
  color: white;
  padding: 100px 0 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
  pointer-events: none;
}

.page-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.page-header .container {
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  margin: 0 0 20px 0;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: fadeInDown 0.8s ease-out;
}

.page-header p {
  font-size: 1.3rem;
  margin: 0;
  opacity: 1;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.teachers-section {
  background: linear-gradient(180deg, 
    #f8fafc 0%, 
    #f1f5f9 30%,
    #f8fafc 60%,
    #ffffff 100%);
  padding: 100px 0;
  position: relative;
}

.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 35px;
}

.teacher-card {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.teacher-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.teacher-card :deep(.p-card) {
  border-radius: 32px;
  box-shadow: 
    0 6px 24px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(99, 102, 241, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100%;
  border: 1px solid rgba(99, 102, 241, 0.15);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  position: relative;
}

.teacher-card :deep(.p-card)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    rgba(99, 102, 241, 0.8) 0%, 
    rgba(139, 92, 246, 0.8) 50%,
    rgba(236, 72, 153, 0.8) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.teacher-card :deep(.p-card:hover)::before {
  opacity: 1;
}

.teacher-card :deep(.p-card:hover) {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.2);
}

.teacher-card :deep(.p-card-header) {
  padding: 0;
}

.teacher-image {
  position: relative;
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(250, 250, 255, 0.98) 30%,
    rgba(248, 245, 255, 0.95) 60%,
    rgba(255, 250, 255, 0.98) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 32px 32px 0 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.teacher-card:hover .teacher-image {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 1) 0%, 
    rgba(250, 250, 255, 1) 30%,
    rgba(248, 245, 255, 1) 60%,
    rgba(255, 250, 255, 1) 100%);
}

.teacher-image img {
  width: 220px;
  height: auto;
  object-fit: contain;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.2));
}

.teacher-card:hover .teacher-image img {
  transform: scale(1.1) translateY(-10px);
  filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.3));
}

.teacher-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  left: auto;
  z-index: 10;
  transition: all 0.3s ease !important;
}

.teacher-badge :deep(.p-badge) {
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  padding: 12px 24px !important;
  border-radius: 20px !important;
  box-shadow: 
    0 6px 20px rgba(16, 185, 129, 0.4),
    0 0 0 2px rgba(255, 255, 255, 0.2) !important;
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%) !important;
  border: none !important;
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: clip !important;
  max-width: none !important;
  width: auto !important;
  min-width: auto !important;
  box-sizing: border-box !important;
  display: inline-block !important;
  line-height: 1.3 !important;
}

.teacher-badge :deep(.p-badge .p-badge-value) {
  white-space: nowrap !important;
  overflow: visible !important;
  text-overflow: clip !important;
  max-width: none !important;
  display: inline-block !important;
}

.teacher-card:hover .teacher-badge :deep(.p-badge) {
  transform: scale(1.02);
  box-shadow: 
    0 8px 24px rgba(16, 185, 129, 0.5),
    0 0 0 2px rgba(255, 255, 255, 0.3) !important;
}

.teacher-card :deep(.p-card-body) {
  padding: 36px;
}

.teacher-card :deep(.p-card-content) {
  padding: 36px;
}

.teacher-card :deep(.p-card-title) {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  padding: 0 36px;
  padding-top: 28px;
  color: var(--text-dark);
  letter-spacing: -0.5px;
}

.teacher-card :deep(.p-card-subtitle) {
  margin-bottom: 28px;
  padding: 0 36px;
}

.teacher-card :deep(.p-card-subtitle .p-tag) {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%) !important;
  color: var(--primary-color) !important;
  border: 2px solid rgba(99, 102, 241, 0.2) !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
  border-radius: 14px !important;
  font-size: 0.95rem !important;
}

.teacher-details {
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
  padding: 20px 24px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 100%);
  border-radius: 18px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(99, 102, 241, 0.12);
  position: relative;
  overflow: hidden;
}

.detail-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent);
  transition: left 0.5s ease;
}

.detail-row:hover::before {
  left: 100%;
}

.detail-row:hover {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%, 
    rgba(139, 92, 246, 0.12) 100%);
  transform: translateX(6px) translateY(-2px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
}

.detail-row i {
  color: var(--primary-color);
  font-size: 1.4rem;
  margin-top: 2px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.detail-row:hover i {
  transform: scale(1.2) rotate(5deg);
}

.detail-row strong {
  display: block;
  margin-bottom: 6px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: -0.2px;
}

.detail-row p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.5;
}

.teacher-story {
  padding-top: 28px;
  border-top: 2px solid rgba(99, 102, 241, 0.15);
  margin-top: 28px;
  position: relative;
}

.teacher-story::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--gradient-1);
  border-radius: 2px;
}

.teacher-story p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-dark);
  font-weight: 400;
}

@media (max-width: 1200px) {
  .teachers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 968px) {
  .page-header {
    padding: 60px 0 50px;
  }

  .teachers-section {
    padding: 60px 0;
  }

  .teachers-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .teacher-card :deep(.p-card-body),
  .teacher-card :deep(.p-card-content) {
    padding: 24px;
  }

  .teacher-card :deep(.p-card-title),
  .teacher-card :deep(.p-card-subtitle) {
    padding-left: 24px;
    padding-right: 24px;
  }

  .teacher-image {
    height: 250px;
  }

  .teacher-image img {
    width: 180px;
  }
}
</style>
