<template>
  <div class="about-page">
    <div class="page-header">
      <div class="container">
        <h1>О Ключе</h1>
      </div>
    </div>

    <section class="section about-section">
      <div class="container">
        <div class="about-intro">
          <div class="about-visual">
            <img src="/3d-elements/Ключ серебрянный.png" alt="Ключ" class="about-key" />
            <img src="/3d-elements/Звезда.png" alt="Звезда" class="about-star" />
          </div>
          <div class="about-text">
            <h2>История школы</h2>
            <p>Онлайн-школа "Ключ" была основана с целью сделать качественное образование доступным каждому. За два года работы мы помогли тысячам студентов освоить новые профессии и найти свой путь к успеху.</p>
            <p>Наша миссия — открыть для каждого "ключ" к знаниям, которые действительно меняют жизнь. Мы верим, что образование должно быть практичным, доступным и увлекательным.</p>
          </div>
        </div>

        <div class="facts-section">
          <h2 class="section-title">Факты о нас</h2>
          <div class="facts-grid">
            <Card class="fact-card">
              <template #header>
                <div class="fact-icon">
                  <img src="/3d-elements/Календарь.png" alt="Годы" />
                </div>
              </template>
              <template #title>Работаем 2 года</template>
              <template #content>
                <p>С 2023 года мы помогаем людям открывать новые возможности</p>
              </template>
            </Card>
            
            <Card class="fact-card">
              <template #header>
                <div class="fact-icon">
                  <img src="/3d-elements/Шляпа ученика.png" alt="Специалисты" />
                </div>
              </template>
              <template #title>Готовим профессионалов</template>
              <template #content>
                <p>Более 50 направлений: от программирования до дизайна и маркетинга</p>
              </template>
            </Card>
            
            <Card class="fact-card">
              <template #header>
                <div class="fact-icon">
                  <img src="/3d-elements/Лампочка.png" alt="Цель" />
                </div>
              </template>
              <template #title>Наша цель</template>
              <template #content>
                <p>Сделать образование доступным, практичным и результативным для каждого</p>
              </template>
            </Card>
          </div>
        </div>

        <div class="values-section">
          <h2 class="section-title">Наши ценности</h2>
          <div class="values-list">
            <Card class="value-card">
              <template #content>
                <div class="value-item">
                  <img src="/3d-elements/Ключ прозрачный.png" alt="Доступность" />
                  <div>
                    <h3>Доступность</h3>
                    <p>Образование должно быть доступно каждому, независимо от места проживания и финансовых возможностей</p>
                  </div>
                </div>
              </template>
            </Card>
            
            <Card class="value-card">
              <template #content>
                <div class="value-item">
                  <img src="/3d-elements/Книги стопка.png" alt="Практичность" />
                  <div>
                    <h3>Практичность</h3>
                    <p>Мы фокусируемся на реальных навыках, которые можно применить в работе уже сегодня</p>
                  </div>
                </div>
              </template>
            </Card>
            
            <Card class="value-card">
              <template #content>
                <div class="value-item">
                  <img src="/3d-elements/Преподаватель женщина.png" alt="Поддержка" />
                  <div>
                    <h3>Поддержка</h3>
                    <p>Каждый студент получает персональную поддержку и обратную связь от опытных наставников</p>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <Card class="director-card">
          <template #content>
            <div class="director-content">
              <div class="director-image">
                <img src="/3d-elements/Преподаватель мужчина.png" alt="Директор" />
              </div>
              <div class="director-info">
                <Tag value="Руководитель школы" severity="info" />
                <h2>Александр Ключев</h2>
                <p class="director-role">Основатель и директор онлайн-школы "Ключ"</p>
                <p>Более 15 лет опыта в сфере образования и технологий. Основатель нескольких успешных образовательных проектов. Верю, что качественное образование может изменить жизнь каждого человека.</p>
                <blockquote>
                  <i class="pi pi-quote-left"></i>
                  "Ключ к успеху — это не только знания, но и правильное применение этих знаний на практике. Мы создали школу, где теория встречается с практикой."
                </blockquote>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-page {
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
  margin: 0;
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: fadeInDown 0.8s ease-out;
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

.about-section {
  background: linear-gradient(180deg, 
    #ffffff 0%, 
    #f8fafc 50%,
    #f1f5f9 100%);
  padding: 60px 0;
}

.about-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
}

.about-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-key {
  width: 200px;
  height: auto;
  position: absolute;
  z-index: 2;
  animation: float-key 3s ease-in-out infinite;
}

.about-star {
  width: 150px;
  height: auto;
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.8;
  animation: rotate-star 10s linear infinite;
}

@keyframes float-key {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes rotate-star {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.about-text h2 {
  margin-bottom: 20px;
  font-size: 2rem;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
}

.section-title {
  text-align: center;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 50px;
}

.facts-section {
  margin-bottom: 80px;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.fact-card {
  text-align: center;
}

.fact-card :deep(.p-card) {
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(99, 102, 241, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
}

.fact-card :deep(.p-card-body),
.fact-card :deep(.p-card-content) {
  padding: 32px;
}

.fact-card :deep(.p-card:hover) {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.fact-icon {
  width: 100px;
  height: 100px;
  margin: 40px auto 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
}

.fact-icon img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.values-section {
  margin-bottom: 80px;
}

.values-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.value-card :deep(.p-card) {
  border-radius: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(99, 102, 241, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
}

.value-card :deep(.p-card-body),
.value-card :deep(.p-card-content) {
  padding: 32px;
}

.value-card :deep(.p-card:hover) {
  transform: translateX(10px);
  box-shadow: var(--shadow-lg);
}

.value-item {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.value-item img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
}

.value-item h3 {
  margin-bottom: 10px;
  font-size: 1.4rem;
}

.director-card :deep(.p-card) {
  border-radius: 28px;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.08) 100%);
  border: 1px solid rgba(99, 102, 241, 0.12);
}

.director-card :deep(.p-card-body),
.director-card :deep(.p-card-content) {
  padding: 40px;
}

.director-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  align-items: center;
}

.director-image {
  text-align: center;
}

.director-image img {
  width: 250px;
  height: auto;
  border-radius: 24px;
  filter: drop-shadow(0 10px 30px rgba(99, 102, 241, 0.2));
}

.director-info h2 {
  margin: 15px 0 5px;
  font-size: 1.8rem;
}

.director-role {
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 20px;
}

.director-info p {
  line-height: 1.8;
  margin-bottom: 15px;
}

blockquote {
  margin: 20px 0 0;
  padding: 24px;
  background: white;
  border-radius: 20px;
  border-left: 4px solid var(--primary-color);
  font-style: italic;
  position: relative;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
}

blockquote i {
  color: var(--primary-color);
  margin-right: 10px;
  opacity: 0.5;
}

@media (max-width: 968px) {
  .about-intro {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .director-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .value-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
