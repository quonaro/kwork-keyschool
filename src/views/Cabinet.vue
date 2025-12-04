<template>
  <div class="cabinet-page">
    <div class="page-header">
      <div class="container">
        <h1>Личный кабинет</h1>
        <p v-if="userEmail">Добро пожаловать, {{ userEmail }}!</p>
      </div>
    </div>

    <section class="section cabinet-section">
      <div class="container">
        <div class="cabinet-content">
          <!-- Информация о пользователе -->
          <Card class="cabinet-card user-info-card">
            <template #title>
              <i class="pi pi-user"></i> Мой профиль
            </template>
            <template #content>
              <div class="user-profile">
                <Avatar 
                  :label="userEmail ? userEmail[0].toUpperCase() : 'U'" 
                  size="xlarge" 
                  shape="circle"
                  class="user-avatar"
                />
                <div class="user-details">
                  <p><strong>Email:</strong> {{ userEmail || 'Не указан' }}</p>
                  <p>
                    <strong>Статус:</strong> 
                    <Tag value="Активный" severity="success" />
                  </p>
                </div>
              </div>
            </template>
            <template #footer>
              <Button 
                @click="logout" 
                label="Выйти" 
                icon="pi pi-sign-out"
                class="p-button-outlined p-button-danger w-full"
              />
            </template>
          </Card>

          <!-- Мои курсы -->
          <Card class="cabinet-card my-courses-card">
            <template #title>
              <i class="pi pi-book"></i> Мои курсы
            </template>
            <template #content>
              <div v-if="userCourses.length === 0" class="empty-state">
                <img src="/3d-elements/Книги стопка.png" alt="Нет курсов" />
                <p>У вас пока нет активных курсов</p>
                <router-link to="/">
                  <Button label="Выбрать курс" icon="pi pi-search" />
                </router-link>
              </div>
              <div v-else class="courses-list">
                <div 
                  v-for="course in userCourses" 
                  :key="course.id"
                  class="course-item"
                >
                  <img :src="course.image" :alt="course.title" />
                  <div class="course-details">
                    <h4>{{ course.title }}</h4>
                    <p>Прогресс: {{ course.progress }}%</p>
                    <ProgressBar :value="course.progress" :showValue="false" />
                  </div>
                  <Button label="Продолжить" icon="pi pi-play" class="p-button-sm" />
                </div>
              </div>
            </template>
          </Card>

          <!-- Сертификаты -->
          <Card class="cabinet-card certificates-card">
            <template #title>
              <i class="pi pi-verified"></i> Мои сертификаты
            </template>
            <template #content>
              <div class="empty-state">
                <img src="/3d-elements/Шляпа ученика.png" alt="Нет сертификатов" />
                <p>У вас пока нет сертификатов</p>
                <small>Получите сертификат после завершения курса</small>
              </div>
            </template>
          </Card>

          <!-- Настройки -->
          <Card class="cabinet-card settings-card">
            <template #title>
              <i class="pi pi-cog"></i> Настройки
            </template>
            <template #content>
              <div class="settings-list">
                <div class="setting-item">
                  <label>Уведомления по email</label>
                  <Checkbox v-model="settings.emailNotifications" :binary="true" />
                </div>
                <div class="setting-item">
                  <label>Уведомления о новых курсах</label>
                  <Checkbox v-model="settings.newCourses" :binary="true" />
                </div>
                <div class="setting-item">
                  <label>Еженедельная рассылка</label>
                  <Checkbox v-model="settings.weeklyDigest" :binary="true" />
                </div>
              </div>
            </template>
            <template #footer>
              <Button 
                @click="saveSettings" 
                label="Сохранить настройки" 
                icon="pi pi-check"
                class="w-full"
              />
            </template>
          </Card>
        </div>
      </div>
    </section>
    
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()
const userEmail = ref('')
const userCourses = ref([])

const settings = ref({
  emailNotifications: true,
  newCourses: true,
  weeklyDigest: false
})

onMounted(() => {
  const email = localStorage.getItem('userEmail')
  if (!email || localStorage.getItem('userLoggedIn') !== 'true') {
    router.push('/')
    return
  }
  userEmail.value = email
})

const logout = () => {
  localStorage.removeItem('userLoggedIn')
  localStorage.removeItem('userEmail')
  toast.add({
    severity: 'info',
    summary: 'Выход выполнен',
    detail: 'До скорой встречи!',
    life: 3000
  })
  setTimeout(() => {
    router.push('/')
  }, 500)
}

const saveSettings = () => {
  toast.add({
    severity: 'success',
    summary: 'Настройки сохранены',
    detail: 'Ваши настройки были успешно обновлены',
    life: 4500
  })
}
</script>

<style scoped>
.cabinet-page {
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

.cabinet-section {
  background: linear-gradient(180deg, 
    #f8fafc 0%, 
    #f1f5f9 30%,
    #f8fafc 60%,
    #ffffff 100%);
  padding: 100px 0;
  position: relative;
}

.cabinet-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.cabinet-card :deep(.p-card) {
  border-radius: 32px;
  box-shadow: 
    0 6px 24px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(99, 102, 241, 0.1);
  height: 100%;
  border: 1px solid rgba(99, 102, 241, 0.15);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
  position: relative;
  overflow: hidden;
}

.cabinet-card :deep(.p-card)::before {
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

.cabinet-card :deep(.p-card:hover)::before {
  opacity: 1;
}

.cabinet-card :deep(.p-card-body),
.cabinet-card :deep(.p-card-content) {
  padding: 36px;
}

.cabinet-card :deep(.p-card:hover) {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 
    0 12px 40px rgba(99, 102, 241, 0.15),
    0 0 0 1px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.25);
}

.cabinet-card :deep(.p-card-title) {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-dark);
  border-bottom: 2px solid rgba(99, 102, 241, 0.15);
  padding-bottom: 20px;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

.cabinet-card :deep(.p-card-title i) {
  color: var(--primary-color);
  font-size: 1.3rem;
}

.user-profile {
  text-align: center;
}

.user-avatar {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%) !important;
  color: white !important;
  margin-bottom: 24px;
  width: 120px !important;
  height: 120px !important;
  font-size: 3rem !important;
  font-weight: 800 !important;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.35) !important;
  transition: all 0.4s ease !important;
}

.user-info-card:hover .user-avatar {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.45) !important;
}

.user-details p {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.empty-state {
  text-align: center;
  padding: 30px 10px;
}

.empty-state img {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
  opacity: 0.6;
}

.empty-state p {
  color: var(--text-light);
  margin-bottom: 8px;
}

.empty-state small {
  color: var(--text-light);
  font-size: 0.85rem;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.course-item {
  display: flex;
  gap: 18px;
  padding: 20px 24px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 100%);
  border-radius: 20px;
  align-items: center;
  border: 2px solid rgba(99, 102, 241, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.course-item::before {
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

.course-item:hover::before {
  left: 100%;
}

.course-item:hover {
  transform: translateX(6px) translateY(-2px);
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%, 
    rgba(139, 92, 246, 0.12) 100%);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
}

.course-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
}

.course-details {
  flex: 1;
}

.course-details h4 {
  margin: 0 0 8px 0;
  font-size: 1rem;
}

.course-details p {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 8px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 100%);
  border-radius: 18px;
  border: 2px solid rgba(99, 102, 241, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.setting-item::before {
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

.setting-item:hover::before {
  left: 100%;
}

.setting-item:hover {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.12) 0%, 
    rgba(139, 92, 246, 0.12) 100%);
  transform: translateX(6px) translateY(-2px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
}

.setting-item label {
  font-weight: 500;
  color: var(--text-dark);
}

.w-full {
  width: 100%;
}

/* Улучшенные стили кнопок */
.cabinet-card :deep(.p-button) {
  padding: 16px 28px !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  border-radius: 18px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  letter-spacing: 0.3px !important;
}

.cabinet-card :deep(.p-button-outlined) {
  border-width: 2px !important;
  padding: 16px 28px !important;
}

.cabinet-card :deep(.p-button-sm) {
  padding: 12px 20px !important;
  font-size: 0.95rem !important;
}

.cabinet-card :deep(.p-button:hover),
.cabinet-card :deep(.p-button-outlined:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
}

.cabinet-card :deep(.p-button-danger) {
  border-color: #ef4444 !important;
  color: #ef4444 !important;
}

.cabinet-card :deep(.p-button-danger:hover) {
  background: #ef4444 !important;
  color: white !important;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4) !important;
}

.cabinet-card :deep(.p-card-footer) {
  padding: 24px 36px 36px !important;
  border-top: 2px solid rgba(99, 102, 241, 0.12) !important;
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.02) 100%) !important;
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 0 50px;
  }

  .cabinet-section {
    padding: 60px 0;
  }
  .cabinet-content {
    grid-template-columns: 1fr;
  }

  .course-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
