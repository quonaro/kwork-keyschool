<template>
  <div class="reviews-page">
    <div class="page-header">
      <div class="container">
        <h1>Отзывы наших студентов</h1>
        <p>Реальные истории успеха выпускников школы "Ключ"</p>
      </div>
    </div>

    <section class="section reviews-section">
      <div class="container">
        <!-- Галерея отзывов -->
        <div class="reviews-gallery">
          <Card 
            v-for="review in reviews" 
            :key="review.id"
            class="review-card"
          >
            <template #header>
              <div class="review-header">
                <div class="reviewer-info">
                  <Avatar 
                    :label="review.name[0]" 
                    size="large" 
                    shape="circle"
                    class="reviewer-avatar"
                  />
                  <div>
                    <h3>{{ review.name }}</h3>
                    <p class="reviewer-location">
                      <i class="pi pi-map-marker"></i>
                      {{ review.city }}, {{ review.age }} лет
                    </p>
                  </div>
                </div>
                <Rating :modelValue="review.rating" :readonly="true" :cancel="false" />
              </div>
            </template>
            <template #content>
              <p class="review-text">"{{ review.text }}"</p>
              <Tag :value="review.course" severity="info" icon="pi pi-book" />
            </template>
          </Card>
        </div>

        <!-- Кейсы выпускников -->
        <h2 class="section-title">Кейсы выпускников</h2>
        <div class="cases-grid">
          <Card 
            v-for="caseItem in cases" 
            :key="caseItem.id"
            class="case-card"
          >
            <template #header>
              <div class="case-header">
                <Avatar 
                  :label="caseItem.name[0]" 
                  size="xlarge" 
                  shape="circle"
                  class="case-avatar"
                />
                <div class="case-info">
                  <h3>{{ caseItem.name }}</h3>
                  <p><i class="pi pi-map-marker"></i> {{ caseItem.city }}, {{ caseItem.age }} лет</p>
                </div>
              </div>
            </template>
            <template #content>
              <div class="case-transformation">
                <div class="transformation-item">
                  <Tag value="Было" severity="warning" />
                  <span class="value">{{ caseItem.professionBefore }}</span>
                </div>
                <i class="pi pi-arrow-right arrow"></i>
                <div class="transformation-item">
                  <Tag value="Стало" severity="success" />
                  <span class="value success">{{ caseItem.professionAfter }}</span>
                </div>
              </div>
              
              <div class="case-story">
                <h4><i class="pi pi-star"></i> История успеха</h4>
                <p>{{ caseItem.story }}</p>
                <div class="case-details">
                  <div class="detail-item">
                    <i class="pi pi-briefcase"></i>
                    <span>{{ caseItem.howFoundWork }}</span>
                  </div>
                  <div v-if="caseItem.portfolio" class="detail-item">
                    <i class="pi pi-folder-open"></i>
                    <span>Портфолио: {{ caseItem.portfolio }} работ</span>
                  </div>
                </div>
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

const reviews = ref([
  {
    id: 1,
    name: 'Мария Иванова',
    city: 'Москва',
    age: 28,
    course: 'UX/UI дизайнер',
    text: 'Отличный курс! Преподаватели объясняют очень доступно, много практики. После обучения смогла найти работу дизайнером в крупной IT-компании.',
    rating: 5
  },
  {
    id: 2,
    name: 'Дмитрий Петров',
    city: 'Санкт-Петербург',
    age: 32,
    course: 'Frontend-разработчик',
    text: 'Прошел курс за 6 месяцев. Материал структурированный, домашние задания интересные. Теперь работаю удаленно и получаю в 2 раза больше, чем раньше.',
    rating: 5
  },
  {
    id: 3,
    name: 'Анна Смирнова',
    city: 'Екатеринбург',
    age: 25,
    course: 'SMM-специалист',
    text: 'Понравился подход к обучению. Много реальных кейсов, поддержка кураторов на всех этапах. Через 3 месяца после выпуска получила предложение о работе.',
    rating: 5
  },
  {
    id: 4,
    name: 'Игорь Козлов',
    city: 'Новосибирск',
    age: 30,
    course: 'Python разработчик',
    text: 'Отличная школа! Преподаватели - практикующие специалисты. Уже на 4 месяце обучения начал делать заказы на фрилансе.',
    rating: 5
  },
  {
    id: 5,
    name: 'Елена Волкова',
    city: 'Казань',
    age: 27,
    course: 'Графический дизайнер',
    text: 'Курс превзошел ожидания. Научилась работать в профессиональных программах, создавать брендинг. Теперь работаю в дизайн-студии.',
    rating: 5
  },
  {
    id: 6,
    name: 'Алексей Новиков',
    city: 'Краснодар',
    age: 35,
    course: 'Интернет-маркетолог',
    text: 'Долго искал качественное обучение маркетингу. Здесь нашел именно то, что нужно. Практические навыки, актуальные инструменты. Рекомендую!',
    rating: 5
  }
])

const cases = ref([
  {
    id: 1,
    name: 'Сергей Морозов',
    city: 'Москва',
    age: 29,
    professionBefore: 'Менеджер по продажам',
    professionAfter: 'Frontend-разработчик',
    story: 'Работал 5 лет менеджером, понял что хочу заниматься программированием. Прошел курс Frontend-разработчика в школе "Ключ". Учился по вечерам после работы, через 6 месяцев получил первое предложение от работодателя.',
    howFoundWork: 'Нашел работу через 2 месяца после выпуска на HeadHunter',
    portfolio: 15
  },
  {
    id: 2,
    name: 'Ольга Соколова',
    city: 'Санкт-Петербург',
    age: 26,
    professionBefore: 'Бухгалтер',
    professionAfter: 'UX/UI дизайнер',
    story: 'Мечтала работать в дизайне, но не знала с чего начать. Курс помог освоить все необходимые инструменты и понять принципы дизайна. Создала портфолио из 12 проектов и начала получать заказы.',
    howFoundWork: 'Работаю фрилансером, клиентов нахожу через Behance и соцсети',
    portfolio: 12
  },
  {
    id: 3,
    name: 'Владимир Лебедев',
    city: 'Екатеринбург',
    age: 34,
    professionBefore: 'Водитель',
    professionAfter: 'Python разработчик',
    story: 'Решил кардинально изменить жизнь. Прошел курс Python разработчика, делал все домашние задания и дополнительные проекты. Через 8 месяцев после начала обучения получил оффер в IT-компанию.',
    howFoundWork: 'Устроился через центр карьеры школы "Ключ"',
    portfolio: 8
  },
  {
    id: 4,
    name: 'Татьяна Орлова',
    city: 'Новосибирск',
    age: 31,
    professionBefore: 'Преподаватель английского',
    professionAfter: 'SMM-специалист',
    story: 'Хотела работать в digital, но не хватало знаний. Прошла курс SMM в школе "Ключ". Научилась работать с рекламой, аналитикой, контентом. Теперь веду несколько проектов одновременно.',
    howFoundWork: 'Создала аккаунт и начала предлагать услуги клиентам',
    portfolio: null
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
    document.querySelectorAll('.review-card, .case-card').forEach((el) => {
      observer.observe(el)
    })
  }, 100)
})
</script>

<style scoped>
.reviews-page {
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

.reviews-section {
  background: linear-gradient(180deg, 
    #f8fafc 0%, 
    #f1f5f9 30%,
    #f8fafc 60%,
    #ffffff 100%);
  padding: 100px 0;
  position: relative;
}

.reviews-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
  margin-bottom: 100px;
}

.review-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.review-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.review-card :deep(.p-card) {
  border-radius: 32px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(99, 102, 241, 0.08);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(99, 102, 241, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  position: relative;
  overflow: hidden;
}

.review-card :deep(.p-card)::before {
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

.review-card :deep(.p-card:hover)::before {
  opacity: 1;
}

.review-card :deep(.p-card-body),
.review-card :deep(.p-card-content) {
  padding: 36px;
}

.review-card :deep(.p-card:hover) {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 12px 40px rgba(99, 102, 241, 0.15),
    0 0 0 1px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.25);
}

.review-card :deep(.p-card-header) {
  padding: 36px 36px 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.reviewer-info {
  display: flex;
  gap: 18px;
  align-items: center;
  flex: 1;
}

.reviewer-avatar {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%) !important;
  color: white !important;
  font-weight: 700 !important;
  font-size: 1.3rem !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3) !important;
  transition: all 0.3s ease !important;
}

.review-card:hover .reviewer-avatar {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.4) !important;
}

.reviewer-info h3 {
  margin: 0 0 6px 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: -0.3px;
}

.reviewer-location {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.reviewer-location i {
  color: var(--primary-color);
  font-size: 0.95rem;
}

.review-card :deep(.p-rating) {
  flex-shrink: 0;
}

.review-card :deep(.p-rating .p-rating-icon) {
  color: #fbbf24 !important;
  font-size: 1.1rem !important;
  margin-right: 2px !important;
}

.review-text {
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.05rem;
  color: var(--text-dark);
  position: relative;
  padding-left: 20px;
}

.review-text::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -5px;
  font-size: 3rem;
  color: rgba(99, 102, 241, 0.2);
  font-family: Georgia, serif;
  line-height: 1;
}

.review-card :deep(.p-tag) {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
  color: var(--primary-color) !important;
  border: 1px solid rgba(99, 102, 241, 0.2) !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
  border-radius: 12px !important;
  font-size: 0.9rem !important;
}

.section-title {
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 60px;
  color: var(--text-dark);
  font-weight: 800;
  letter-spacing: -1px;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 20px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--gradient-1);
  border-radius: 2px;
}

.cases-grid {
  display: grid;
  gap: 40px;
}

.case-card {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.case-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.case-card :deep(.p-card) {
  border-radius: 32px;
  box-shadow: 
    0 6px 24px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(99, 102, 241, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(99, 102, 241, 0.15);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  position: relative;
  overflow: hidden;
}

.case-card :deep(.p-card)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, 
    rgba(99, 102, 241, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 50%,
    rgba(236, 72, 153, 0.9) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.case-card :deep(.p-card:hover)::before {
  opacity: 1;
}

.case-card :deep(.p-card-body),
.case-card :deep(.p-card-content) {
  padding: 40px;
}

.case-card :deep(.p-card:hover) {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 
    0 16px 48px rgba(99, 102, 241, 0.2),
    0 0 0 1px rgba(99, 102, 241, 0.25);
  border-color: rgba(99, 102, 241, 0.3);
}

.case-card :deep(.p-card-header) {
  padding: 40px 40px 0;
}

.case-header {
  display: flex;
  gap: 24px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 2px solid rgba(99, 102, 241, 0.1);
  margin-bottom: 24px;
}

.case-avatar {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%) !important;
  color: white !important;
  font-weight: 800 !important;
  font-size: 1.8rem !important;
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.35) !important;
  transition: all 0.4s ease !important;
}

.case-card:hover .case-avatar {
  transform: scale(1.15) rotate(-5deg);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.45) !important;
}

.case-info h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-dark);
  letter-spacing: -0.5px;
}

.case-info p {
  margin: 0;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 0.95rem;
}

.case-info i {
  color: var(--primary-color);
}

.case-transformation {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 50%,
    rgba(236, 72, 153, 0.06) 100%);
  border-radius: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  border: 2px solid rgba(99, 102, 241, 0.15);
  position: relative;
  overflow: hidden;
}

.case-transformation::before {
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
  transition: left 0.6s ease;
}

.case-card:hover .case-transformation::before {
  left: 100%;
}

.transformation-item {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.transformation-item :deep(.p-tag) {
  font-weight: 700 !important;
  padding: 6px 14px !important;
  border-radius: 10px !important;
  font-size: 0.85rem !important;
}

.transformation-item .value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: -0.3px;
}

.transformation-item .value.success {
  color: var(--primary-color);
  font-size: 1.3rem;
}

.arrow {
  font-size: 2rem;
  color: var(--primary-color);
  animation: pulse-arrow 2s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes pulse-arrow {
  0%, 100% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(5px);
    opacity: 0.8;
  }
}

.case-story h4 {
  margin-bottom: 18px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-dark);
  font-weight: 700;
  letter-spacing: -0.3px;
}

.case-story h4 i {
  color: #f59e0b;
  font-size: 1.2rem;
  animation: star-twinkle 2s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.8;
  }
}

.case-story p {
  line-height: 1.9;
  margin-bottom: 24px;
  font-size: 1.05rem;
  color: var(--text-dark);
}

.case-details {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-dark);
  padding: 16px 22px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 100%);
  border-radius: 18px;
  border: 2px solid rgba(99, 102, 241, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  flex: 1;
  min-width: 200px;
}

.detail-item:hover {
  transform: translateX(6px) translateY(-2px);
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%, 
    rgba(139, 92, 246, 0.12) 100%);
  border-color: rgba(99, 102, 241, 0.25);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
}

.detail-item i {
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.detail-item:hover i {
  transform: scale(1.2) rotate(5deg);
}

@media (max-width: 1200px) {
  .reviews-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 0 50px;
  }

  .reviews-section {
    padding: 60px 0;
  }

  .reviews-gallery {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }

  .review-card :deep(.p-card-body),
  .review-card :deep(.p-card-content),
  .review-card :deep(.p-card-header) {
    padding: 24px;
  }

  .case-card :deep(.p-card-body),
  .case-card :deep(.p-card-content),
  .case-card :deep(.p-card-header) {
    padding: 24px;
  }

  .case-transformation {
    flex-direction: column;
    padding: 24px;
    gap: 16px;
  }

  .arrow {
    transform: rotate(90deg);
  }

  .case-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .case-details {
    flex-direction: column;
    gap: 12px;
  }

  .detail-item {
    min-width: 100%;
  }
}
</style>
