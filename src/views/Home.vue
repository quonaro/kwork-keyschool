<template>
  <div class="home-page">
    <!-- Hero-баннер -->
    <section class="hero">
      <div class="hero-background">
        <!-- Градиентный фон -->
        <div class="bg-gradient"></div>
        
        <!-- Фоновые элементы инфографики -->
        <img :src="getAssetPath('/2d-infographics/обтекающие линии.png')" alt="" class="bg-decoration bg-waves-1" />
        <img :src="getAssetPath('/2d-infographics/обтекающие линии.png')" alt="" class="bg-decoration bg-waves-2" />
        <img :src="getAssetPath('/2d-infographics/звездочки.png')" alt="" class="bg-stars bg-stars-1" />
        <img :src="getAssetPath('/2d-infographics/звездочки.png')" alt="" class="bg-stars bg-stars-2" />
        <img :src="getAssetPath('/2d-infographics/звездочки.png')" alt="" class="bg-stars bg-stars-3" />
        <img :src="getAssetPath('/2d-infographics/звездочки линейные.png')" alt="" class="bg-element bg-lines-1" />
        <img :src="getAssetPath('/2d-infographics/звездочки линейные.png')" alt="" class="bg-element bg-lines-2" />
        <img :src="getAssetPath('/2d-infographics/фоновые линии клетки.png')" alt="" class="bg-element bg-grid" />
        <img :src="getAssetPath('/2d-infographics/Овал со звездами.png')" alt="" class="bg-element bg-oval" />
        <img :src="getAssetPath('/2d-infographics/инфографика со звездами.png')" alt="" class="bg-element bg-infographic" />
        <img :src="getAssetPath('/2d-infographics/линейная звезда.png')" alt="" class="bg-element bg-star-line" />
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Ключ - ключ к твоему успеху!</h1>
            <p>Современная образовательная платформа с интерактивными курсами, опытными преподавателями и персонализированным подходом к обучению</p>
            <div class="hero-buttons">
              <button 
                class="hero-cta-button"
                @click="scrollToCourses"
              >
                <span class="button-icon">
                  <i class="pi pi-arrow-down"></i>
                </span>
                <span class="button-text">Выбрать курс</span>
                <span class="button-shine"></span>
              </button>
            </div>
          </div>
          <div class="hero-image">
            <img :src="getAssetPath('/3d-elements/Ключ серебрянный.png')" alt="Key" class="hero-key" />
            <img :src="getAssetPath('/3d-elements/Книги стопка.png')" alt="Books" class="hero-books" />
            <img :src="getAssetPath('/3d-elements/Лампочка.png')" alt="Idea" class="hero-lamp" />
          </div>
        </div>
      </div>
    </section>

    <!-- Витрина курсов -->
    <section id="courses" class="courses-section section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title scroll-animate">Выберите курс или профессию</h2>
          <div class="search-container">
            <span class="p-input-icon-left search-input-wrapper">
              <i class="pi pi-search" />
              <InputText 
                v-model="searchQuery"
                placeholder="Поиск по курсам..." 
                class="search-input"
              />
            </span>
          </div>
          <div v-if="searchQuery || (!selectedCategories.includes('Все категории') && selectedCategories.length > 0)" class="results-count">
            Найдено курсов: <strong>{{ filteredCourses.length }}</strong>
          </div>
        </div>
        <div class="courses-layout">
          <!-- Фильтры -->
          <aside class="filters">
            <Card>
              <template #title>
                <div class="filter-header">
                  <i class="pi pi-filter"></i>
                  <span>Категории</span>
                </div>
              </template>
              <template #content>
                <div class="filter-group">
                  <div 
                    v-for="category in categories" 
                    :key="category"
                    class="filter-item"
                  >
                    <Checkbox 
                      :inputId="category"
                      :value="category"
                      v-model="selectedCategories"
                    />
                    <label :for="category">{{ category }}</label>
                  </div>
                </div>

                <div class="filter-header" style="margin-top: 24px;">
                  <i class="pi pi-sort-alt"></i>
                  <span>Сортировка</span>
                </div>
                <Dropdown 
                  v-model="sortBy" 
                  :options="sortOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                />
              </template>
            </Card>
          </aside>

          <!-- Карточки курсов -->
          <div v-if="filteredCourses.length > 0" class="courses-grid">
            <Card 
              v-for="(course, index) in filteredCourses" 
              :key="course.id"
              class="course-card scroll-animate"
              :style="{ '--index': index }"
            >
              <template #header>
                <div class="course-image">
                  <img :src="course.image" :alt="course.title" />
                  <Tag 
                    v-if="course.discount" 
                    :value="'-' + course.discount + '%'"
                    severity="danger"
                    class="discount-badge"
                  />
                </div>
              </template>
              <template #title>
                {{ course.title }}
              </template>
              <template #content>
                <div class="course-description">
                  {{ course.description }}
                </div>
                <div class="course-meta">
                  <div class="course-meta-item">
                    <i class="pi pi-clock"></i>
                    <span>{{ course.duration }}</span>
                  </div>
                  <div class="course-meta-item">
                    <i class="pi pi-book"></i>
                    <span>{{ course.lessons }} уроков</span>
                  </div>
                  <div class="course-meta-item">
                    <i class="pi pi-star"></i>
                    <span>{{ course.rating }}</span>
                  </div>
                </div>
                <div class="course-price">
                  <span v-if="course.oldPrice" class="old-price">{{ course.oldPrice }} ₽</span>
                  <Tag :value="course.price + ' ₽'" severity="success" class="price-tag" />
                </div>
                <div class="course-installment">
                  <i class="pi pi-calendar"></i>
                  Рассрочка: <strong>{{ course.installment }} ₽/мес</strong>
                </div>
              </template>
              <template #footer>
                <div class="course-actions">
                  <Button 
                    @click="openPaymentModal(course)" 
                    label="Записаться" 
                    icon="pi pi-check"
                    class="p-button-sm"
                  />
                  <Button 
                    @click="showDetails(course)" 
                    label="Подробнее" 
                    icon="pi pi-info-circle"
                    class="p-button-sm p-button-outlined"
                  />
                </div>
              </template>
            </Card>
          </div>
          <div v-else class="no-results">
            <div class="no-results-content">
              <i class="pi pi-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 20px;"></i>
              <h3>Курсы не найдены</h3>
              <p>Попробуйте изменить параметры поиска или выбрать другие категории</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import { getAssetPath } from '../utils/path'

const openPayment = inject('openPayment')

const categories = [
  'Все категории',
  'Программирование',
  'Дизайн',
  'Маркетинг',
  'Бизнес',
  'Языки',
  'Творчество',
  'IT-инфраструктура'
]

const selectedCategories = ref(['Все категории'])
const sortBy = ref('default')
const searchQuery = ref('')

// Автоматическая обработка выбора "Все категории"
watch(selectedCategories, (newVal) => {
  const hasAllCategories = newVal.includes('Все категории')
  const hasOtherCategories = newVal.some(cat => cat !== 'Все категории')
  
  if (hasAllCategories && hasOtherCategories) {
    // Если выбрано "Все категории" вместе с другими, убираем "Все категории"
    selectedCategories.value = newVal.filter(cat => cat !== 'Все категории')
  } else if (!hasAllCategories && newVal.length === 0) {
    // Если ничего не выбрано, выбираем "Все категории"
    selectedCategories.value = ['Все категории']
  }
}, { deep: true })

const sortOptions = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Цена: по возрастанию', value: 'price-asc' },
  { label: 'Цена: по убыванию', value: 'price-desc' },
  { label: 'По названию', value: 'name' }
]

const scrollToCourses = () => {
  document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })
}

// Генерация 55 курсов
const generateCourses = () => {
  const courseTitles = [
    'Frontend-разработчик', 'Backend-разработчик', 'Fullstack-разработчик',
    'UX/UI дизайнер', 'Графический дизайнер', '3D-моделирование',
    'SMM-специалист', 'Контент-менеджер', 'SEO-оптимизатор',
    'Интернет-маркетолог', 'Таргетолог', 'E-mail маркетинг',
    'Python разработчик', 'JavaScript разработчик', 'Java разработчик',
    'Мобильная разработка iOS', 'Мобильная разработка Android',
    'Веб-дизайн с нуля', 'Figma для дизайнеров', 'Adobe Photoshop',
    'Бизнес-аналитик', 'Проект-менеджер', 'Финансовый менеджер',
    'HR-менеджер', 'Менеджер по продажам', 'Тайм-менеджмент',
    'Английский язык', 'Испанский язык', 'Немецкий язык',
    'Китайский язык', 'Французский язык', 'Японский язык',
    'Фотография', 'Видеомонтаж', 'Иллюстрация',
    'Каллиграфия', 'Скетчинг', 'Скульптура',
    'DevOps инженер', 'Системный администратор', 'Кибербезопасность',
    'Data Science', 'Машинное обучение', 'Аналитика данных',
    'Тестирование ПО', 'Автоматизация тестирования', 'QA инженер',
    'Интернет-предпринимательство', 'Стартапы', 'Копирайтинг',
    'Продюсирование', 'Психология общения', 'Ораторское искусство',
    'Управление командой', 'Личная эффективность', 'Нейросети'
  ]

  const categoryMapping = {
    'Программирование': ['Frontend', 'Backend', 'Fullstack', 'Python', 'JavaScript', 'Java', 'Мобильная', 'DevOps', 'Data Science', 'Машинное', 'Тестирование'],
    'Дизайн': ['UX/UI', 'Графический', '3D-моделирование', 'Веб-дизайн', 'Figma', 'Adobe', 'Фотография', 'Иллюстрация', 'Каллиграфия', 'Скетчинг'],
    'Маркетинг': ['SMM', 'Контент', 'SEO', 'Интернет-маркетолог', 'Таргетолог', 'E-mail'],
    'Бизнес': ['Бизнес-аналитик', 'Проект-менеджер', 'Финансовый', 'HR', 'Продажам', 'Интернет-предпринимательство', 'Стартапы', 'Управление'],
    'Языки': ['Английский', 'Испанский', 'Немецкий', 'Китайский', 'Французский', 'Японский'],
    'Творчество': ['Фотография', 'Видеомонтаж', 'Иллюстрация', 'Каллиграфия', 'Скетчинг', 'Скульптура', 'Продюсирование'],
    'IT-инфраструктура': ['DevOps', 'Системный', 'Кибербезопасность', 'Data Science', 'Аналитика']
  }

  const courseImages = [
    getAssetPath('/3d-elements/Книги стопка.png'),
    getAssetPath('/3d-elements/Книги и будильник.png'),
    getAssetPath('/3d-elements/Лампочка.png'),
    getAssetPath('/3d-elements/Шестеренка.png'),
    getAssetPath('/3d-elements/Ключ серебрянный.png'),
    getAssetPath('/3d-elements/Ключ фиолетовый.png'),
    getAssetPath('/3d-elements/Ключ прозрачный.png')
  ]

  const descriptions = [
    'Освойте современные технологии разработки и станьте востребованным специалистом',
    'Изучите все необходимые инструменты и методы для профессиональной работы',
    'Получите практические навыки и создайте портфолио реальных проектов',
    'Научитесь создавать качественные решения и работать в команде',
    'Освойте передовые практики и лучшие инструменты индустрии',
    'Получите комплексные знания от основ до продвинутых техник',
    'Развивайте навыки под руководством опытных наставников',
    'Применяйте полученные знания на практике с первого урока'
  ]

  return courseTitles.slice(0, 55).map((title, index) => {
    const price = Math.floor(Math.random() * 50000) + 10000
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 40) + 10 : 0
    const oldPrice = discount > 0 ? Math.floor(price * (1 + discount / 100)) : null
    const installmentMonths = 6 + Math.floor(Math.random() * 6)
    const installment = Math.floor(price / installmentMonths)
    const lessons = 20 + Math.floor(Math.random() * 40)
    const duration = Math.floor(Math.random() * 6) + 2
    const rating = (4 + Math.random()).toFixed(1)

    // Определяем категорию
    let courseCategory = 'Все категории'
    for (const [cat, keywords] of Object.entries(categoryMapping)) {
      if (keywords.some(kw => title.includes(kw))) {
        courseCategory = cat
        break
      }
    }

    return {
      id: index + 1,
      title,
      price,
      oldPrice,
      discount,
      installment,
      image: courseImages[index % courseImages.length],
      category: courseCategory,
      description: descriptions[index % descriptions.length],
      lessons,
      duration: `${duration}-${duration + 2} мес`,
      rating
    }
  })
}

const courses = ref(generateCourses())

const filteredCourses = computed(() => {
  let result = [...courses.value]

  // Поиск по названию и описанию
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query)
    )
  }

  // Фильтрация по категориям
  if (selectedCategories.value.length > 0) {
    // Если выбрано "Все категории", показываем все курсы
    if (selectedCategories.value.includes('Все категории')) {
      // Показываем все курсы
    } else {
      // Фильтруем по выбранным категориям
      result = result.filter(course => 
        selectedCategories.value.includes(course.category)
      )
    }
  }

  // Сортировка
  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

const openPaymentModal = (course) => {
  openPayment(course)
}

const showDetails = (course) => {
  alert(`Подробная информация о курсе "${course.title}"\n\nЦена: ${course.price} ₽\nКатегория: ${course.category}\n\nВ демо-версии детальная информация недоступна.`)
}

// Scroll animations
const handleScroll = () => {
  const elements = document.querySelectorAll('.course-card, .section-title, .filters')
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0
    
    if (isVisible && !el.classList.contains('animate-in')) {
      el.classList.add('animate-in')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Проверяем сразу при загрузке
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.home-page {
  padding-top: 70px;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: 
    radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at bottom left, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, 
      rgba(99, 102, 241, 0.06) 0%, 
      rgba(139, 92, 246, 0.1) 25%,
      rgba(236, 72, 153, 0.08) 50%,
      rgba(99, 102, 241, 0.06) 75%,
      rgba(139, 92, 246, 0.08) 100%);
}

.hero::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(to bottom, 
    transparent 0%,
    rgba(248, 250, 252, 0.3) 30%,
    rgba(241, 245, 249, 0.6) 60%,
    rgba(248, 250, 252, 0.9) 85%,
    #f8fafc 100%);
  z-index: 1;
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: 
    radial-gradient(ellipse 800px 200px at center bottom, rgba(255, 255, 255, 0.4) 0%, transparent 70%),
    linear-gradient(to bottom, 
      transparent 0%,
      rgba(248, 250, 252, 0.5) 50%,
      #f8fafc 100%);
  z-index: 2;
  pointer-events: none;
}

.hero-background {
  position: absolute;
  top: -30%;
  left: -15%;
  right: -15%;
  bottom: -30%;
  z-index: 0;
  overflow: visible;
  width: 130%;
  height: 160%;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, 
      rgba(99, 102, 241, 0.04) 0%, 
      rgba(139, 92, 246, 0.06) 33%,
      rgba(236, 72, 153, 0.05) 66%,
      rgba(99, 102, 241, 0.04) 100%);
  z-index: 0;
  animation: gradient-shift 20s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.05);
  }
}

/* Обтекающие линии */
.bg-waves-1 {
  position: absolute;
  top: -150px;
  right: -300px;
  width: 900px;
  height: 900px;
  opacity: 0.25;
  animation: float 25s ease-in-out infinite;
  z-index: 1;
}

.bg-waves-2 {
  position: absolute;
  bottom: -200px;
  left: -250px;
  width: 800px;
  height: 800px;
  opacity: 0.2;
  animation: float 30s ease-in-out infinite reverse;
  z-index: 1;
}

/* Звездочки */
.bg-stars-1 {
  position: absolute;
  bottom: -80px;
  left: -150px;
  width: 700px;
  height: 700px;
  opacity: 0.25;
  animation: float 20s ease-in-out infinite;
  z-index: 1;
}

.bg-stars-2 {
  position: absolute;
  top: 50px;
  left: 10%;
  width: 400px;
  height: 400px;
  opacity: 0.15;
  animation: float 18s ease-in-out infinite reverse;
  z-index: 1;
}

.bg-stars-3 {
  position: absolute;
  top: 200px;
  right: 15%;
  width: 350px;
  height: 350px;
  opacity: 0.2;
  animation: float 22s ease-in-out infinite;
  z-index: 1;
}

/* Линейные звезды */
.bg-lines-1 {
  position: absolute;
  top: 100px;
  right: 5%;
  width: 300px;
  height: 300px;
  opacity: 0.15;
  animation: rotate 30s linear infinite;
  z-index: 1;
}

.bg-lines-2 {
  position: absolute;
  bottom: 150px;
  right: 20%;
  width: 250px;
  height: 250px;
  opacity: 0.12;
  animation: rotate 35s linear infinite reverse;
  z-index: 1;
}

/* Сетка */
.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  object-fit: cover;
  z-index: 1;
}

/* Овал со звездами */
.bg-oval {
  position: absolute;
  top: 20%;
  left: 5%;
  width: 500px;
  height: 500px;
  opacity: 0.15;
  animation: float 24s ease-in-out infinite;
  z-index: 1;
}

/* Инфографика со звездами */
.bg-infographic {
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 600px;
  height: 600px;
  opacity: 0.12;
  animation: float 28s ease-in-out infinite reverse;
  z-index: 1;
}

/* Линейная звезда */
.bg-star-line {
  position: absolute;
  top: 40%;
  right: 25%;
  width: 200px;
  height: 200px;
  opacity: 0.18;
  animation: rotate 20s linear infinite;
  z-index: 1;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  33% {
    transform: translateY(-20px) rotate(3deg) scale(1.05);
  }
  66% {
    transform: translateY(10px) rotate(-2deg) scale(0.98);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 3;
}

.hero-text h1 {
  margin-bottom: 24px;
  line-height: 1.2;
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.hero-text p {
  font-size: 1.25rem;
  margin-bottom: 32px;
  max-width: 500px;
}

.hero-buttons {
  margin-top: 40px;
}

.hero-cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 20px 48px;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, 
    #6366f1 0%, 
    #8b5cf6 50%,
    #ec4899 100%);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4),
              0 4px 16px rgba(139, 92, 246, 0.3);
  z-index: 1;
}

.hero-cta-button::before {
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
  z-index: 2;
}

.hero-cta-button:hover::before {
  left: 100%;
}

.hero-cta-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 48px rgba(99, 102, 241, 0.5),
              0 8px 24px rgba(139, 92, 246, 0.4);
  background: linear-gradient(135deg, 
    #5855eb 0%, 
    #7c3aed 50%,
    #db2777 100%);
}

.hero-cta-button:active {
  transform: translateY(-2px) scale(0.98);
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 3;
  position: relative;
  backdrop-filter: blur(10px);
}

.hero-cta-button:hover .button-icon {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px) rotate(5deg);
  animation: bounce-arrow 1.5s ease-in-out infinite;
}

@keyframes bounce-arrow {
  0%, 100% {
    transform: translateY(0) rotate(5deg);
  }
  50% {
    transform: translateY(-6px) rotate(5deg);
  }
}

.button-icon i {
  font-size: 1.1rem;
  color: white;
}

.button-text {
  position: relative;
  z-index: 3;
  letter-spacing: 0.3px;
}

.button-shine {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
  z-index: 2;
}

.hero-cta-button:hover .button-shine {
  width: 300px;
  height: 300px;
}

.hero-image {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  overflow: visible;
}

.hero-key {
  width: 200px;
  height: auto;
  position: absolute;
  z-index: 4;
  animation: float-key 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px rgba(99, 102, 241, 0.3));
}

.hero-books {
  width: 180px;
  height: auto;
  position: absolute;
  left: 50px;
  bottom: 50px;
  z-index: 3;
  animation: float-books 4s ease-in-out infinite;
}

.hero-lamp {
  width: 150px;
  height: auto;
  position: absolute;
  right: 50px;
  top: 50px;
  z-index: 3;
  animation: float-lamp 3.5s ease-in-out infinite;
}

@keyframes float-key {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-books {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-3deg); }
}

@keyframes float-lamp {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(3deg); }
}

.courses-section {
  background: 
    radial-gradient(ellipse at top center, rgba(248, 250, 252, 0.8) 0%, transparent 50%),
    linear-gradient(180deg, 
      #f8fafc 0%, 
      #f1f5f9 30%,
      #f8fafc 60%,
      #ffffff 100%);
  position: relative;
  margin-top: -250px;
  padding-top: 270px;
  padding-bottom: 100px;
  z-index: 2;
}

.courses-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, 
    rgba(248, 250, 252, 0.95) 0%,
    rgba(248, 250, 252, 0.8) 50%,
    transparent 100%);
  z-index: 1;
  pointer-events: none;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  margin-bottom: 24px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto 20px;
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  display: block;
  width: 100%;
}

.search-input-wrapper .search-input {
  width: 100%;
  padding: 16px 20px 16px 50px !important;
  border-radius: 20px !important;
  border: 2px solid rgba(99, 102, 241, 0.15) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  font-size: 1rem !important;
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%) !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.08) !important;
}

.search-input-wrapper .search-input:focus {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 6px 24px rgba(99, 102, 241, 0.2) !important;
  outline: none !important;
}

.search-input-wrapper i {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  z-index: 1;
  pointer-events: none;
  font-size: 1.1rem;
}

.results-count {
  color: var(--text-light);
  font-size: 0.95rem;
  margin-top: 8px;
}

.results-count strong {
  color: var(--primary-color);
  font-weight: 600;
}

.courses-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.filters {
  height: fit-content;
  position: sticky;
  top: 90px;
  align-self: start;
  width: 100%;
  max-width: 280px;
}

.filters :deep(.p-card) {
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
  padding: 0;
  border: 1px solid rgba(99, 102, 241, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
}

.filters :deep(.p-card-body) {
  padding: 28px;
}

.filters :deep(.p-card-content) {
  padding: 28px;
}

.filters :deep(.p-card-header) {
  padding: 24px 28px 0;
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.filter-header i {
  color: var(--primary-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-item:hover {
  background: var(--bg-light);
}

.filter-item label {
  cursor: pointer;
}

.w-full {
  width: 100%;
}

.no-results {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 60px 20px;
}

.no-results-content {
  text-align: center;
  max-width: 500px;
}

.no-results-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.no-results-content p {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.6;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* Scroll animations */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title.scroll-animate {
  transition-delay: 0.1s;
}

.course-card.scroll-animate {
  transition-delay: calc(var(--index, 0) * 0.1s);
}

.course-card.p-card {
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  border: 1px solid rgba(99, 102, 241, 0.12);
  position: relative;
}

.course-card.p-card::before {
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

.course-card.p-card:hover::before {
  opacity: 1;
}

.course-card.p-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.2);
}

.course-card :deep(.p-card-header) {
  padding: 0;
}

.course-card :deep(.p-card-title) {
  font-size: 1.3rem;
  font-weight: 700;
  min-height: 60px;
  margin-bottom: 16px;
  padding: 0 32px;
  padding-top: 24px;
  color: var(--text-dark);
  line-height: 1.4;
  letter-spacing: -0.3px;
}

.course-card :deep(.p-card-content) {
  padding: 28px 32px;
}

.course-card :deep(.p-card-footer) {
  padding: 0 32px 32px;
  border-top: 1px solid rgba(99, 102, 241, 0.08);
  padding-top: 24px;
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.02) 100%);
}

.course-image {
  position: relative;
  width: 100%;
  height: 240px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%, 
    rgba(139, 92, 246, 0.18) 50%,
    rgba(236, 72, 153, 0.12) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 28px 28px 0 0;
  padding: 20px;
}

.course-card:hover .course-image {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%, 
    rgba(139, 92, 246, 0.18) 50%,
    rgba(236, 72, 153, 0.12) 100%);
}

.course-image img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  transition: transform 0.4s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.course-card:hover .course-image img {
  transform: scale(1.1) rotate(5deg);
}

.discount-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  padding: 8px 14px !important;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.course-price {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.old-price {
  text-decoration: line-through;
  color: var(--text-light);
  font-size: 1rem;
  font-weight: 500;
}

.price-tag {
  font-size: 1.3rem !important;
  font-weight: 700 !important;
  padding: 10px 18px !important;
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
}

.course-installment {
  color: var(--text-dark);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.06) 100%);
  border-radius: 16px;
  margin-top: 8px;
}

.course-installment i {
  color: var(--primary-color);
  font-size: 1.1rem;
}

.course-installment strong {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.05rem;
}

.course-description {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  padding: 12px 0;
  border-top: 1px solid rgba(99, 102, 241, 0.08);
  border-bottom: 1px solid rgba(99, 102, 241, 0.08);
}

.course-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-dark);
  font-size: 0.9rem;
  font-weight: 500;
}

.course-meta-item i {
  color: var(--primary-color);
  font-size: 0.95rem;
}

.course-actions {
  display: flex;
  gap: 12px;
}

.course-actions .p-button {
  flex: 1;
  padding: 14px 24px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
}

.course-actions .p-button :deep(.p-button-icon) {
  margin: 0 !important;
}

.course-actions .p-button :deep(.p-button-label) {
  margin: 0 !important;
}

.course-actions .p-button:first-child {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
}

.course-actions .p-button:first-child:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
}

.course-actions .p-button-outlined {
  border: 2px solid #6366f1 !important;
  color: #6366f1 !important;
  background: transparent !important;
}

.course-actions .p-button-outlined:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
  transform: translateY(-2px);
  border-color: #8b5cf6 !important;
  color: #8b5cf6 !important;
}

@media (max-width: 1200px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 968px) {
  .hero-background {
    top: -10%;
    left: -5%;
    right: -5%;
    bottom: -10%;
  }

  .bg-waves-1,
  .bg-waves-2 {
    width: 600px;
    height: 600px;
  }

  .bg-stars-1,
  .bg-stars-2,
  .bg-stars-3 {
    width: 300px;
    height: 300px;
  }

  .bg-oval,
  .bg-infographic {
    width: 350px;
    height: 350px;
  }

  .search-container {
    max-width: 100%;
    padding: 0 20px;
  }

  .search-input-wrapper .search-input {
    padding: 14px 18px 14px 45px !important;
    font-size: 0.95rem !important;
  }

  .courses-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .filters {
    position: static;
    max-width: 100%;
  }

  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text p {
    max-width: 100%;
  }

  .hero-cta-button {
    padding: 18px 40px;
    font-size: 1.1rem;
    width: 100%;
    justify-content: center;
  }

  .button-icon {
    width: 32px;
    height: 32px;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>

