<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-background"></div>
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          <img src="/3d-elements/Ключ прозрачный.png" alt="Ключ" class="logo-img" />
          <span class="logo-text">Ключ</span>
        </router-link>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><router-link to="/about">О Ключе</router-link></li>
          <li><router-link to="/reviews">Отзывы</router-link></li>
          <li><router-link to="/teachers">Наши преподаватели</router-link></li>
          <li><router-link to="/gifts">Подарки</router-link></li>
        </ul>
        <div class="header-actions">
          <Button 
            v-if="!isLoggedIn" 
            @click="showLogin = true" 
            label="Войти" 
            icon="pi pi-sign-in"
            class="login-button"
          />
          <router-link v-else to="/cabinet" class="cabinet-link">
            <Button label="Личный кабинет" icon="pi pi-user" class="cabinet-button" />
          </router-link>
        </div>
        <button class="menu-toggle" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
    
    <!-- Модальное окно входа -->
    <Dialog 
      v-model:visible="showLogin" 
      modal 
      :closable="true"
      :draggable="false"
      :style="{ width: '450px' }"
      class="login-dialog"
    >
      <template #header>
        <div class="modal-header">
          <div class="modal-icon">
            <img src="/3d-elements/Ключ прозрачный.png" alt="Ключ" />
          </div>
          <div>
            <h2>Вход в личный кабинет</h2>
            <p class="modal-subtitle">Добро пожаловать обратно!</p>
          </div>
        </div>
      </template>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="p-field">
          <label for="email">Email</label>
          <span class="p-input-icon-left w-full">
            <i class="pi pi-envelope" />
            <InputText 
              id="email"
              v-model="loginForm.email"
              placeholder="your@email.com" 
              class="w-full"
              required
            />
          </span>
        </div>
        
        <div class="p-field">
          <label for="password">Пароль</label>
          <Password 
            id="password"
            v-model="loginForm.password"
            placeholder="Введите пароль" 
            :feedback="false"
            toggleMask
            class="w-full"
            inputClass="w-full"
            required
          />
        </div>

        <Button 
          type="submit" 
          label="Войти" 
          icon="pi pi-arrow-right"
          iconPos="right"
          class="w-full p-button-lg"
        />
      </form>
      
      <div class="modal-note">
        <i class="pi pi-info-circle"></i>
        <span>Демо-версия: введите любой email и пароль для входа</span>
      </div>
    </Dialog>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)
const showLogin = ref(false)
const isScrolled = ref(false)
const loginForm = ref({
  email: '',
  password: ''
})

const isLoggedIn = computed(() => {
  return localStorage.getItem('userLoggedIn') === 'true'
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleLogin = () => {
  localStorage.setItem('userLoggedIn', 'true')
  localStorage.setItem('userEmail', loginForm.value.email)
  showLogin.value = false
  router.push('/cabinet')
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
  transition: all 0.3s ease;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.98) 0%, 
    rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
}

.header.scrolled .header-background {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.99) 0%, 
    rgba(255, 255, 255, 0.97) 100%);
  box-shadow: 0 4px 30px rgba(99, 102, 241, 0.08);
  border-bottom: 1px solid rgba(99, 102, 241, 0.15);
}

.header .container {
  position: relative;
  z-index: 1;
  padding: 20px 30px;
  transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header.scrolled .container {
  padding: 16px 30px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  padding: 10px 16px;
  border-radius: 20px;
}

.logo-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
  position: relative;
}

.logo-text {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  position: relative;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 12px;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  position: relative;
}

.nav-menu a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 14px 24px;
  border-radius: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: block;
}

.nav-menu a::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.12));
  border-radius: 18px;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.nav-menu a:hover::before {
  opacity: 1;
}

.nav-menu a.router-link-active {
  color: var(--primary-color);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.12));
}

.nav-menu a.router-link-active::before {
  opacity: 1;
}

.nav-menu a:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: var(--gradient-1);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-menu a:hover::after,
.nav-menu a.router-link-active::after {
  width: calc(100% - 48px);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-button,
.cabinet-button {
  padding: 14px 32px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2) !important;
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.login-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  border: none !important;
  color: white !important;
}

.login-button :deep(.p-button-icon) {
  margin-right: 0 !important;
}

.login-button :deep(.p-button-label) {
  margin-left: 0 !important;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35) !important;
  background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important;
}

.cabinet-link {
  text-decoration: none;
}

.cabinet-button {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1)) !important;
  border: 2px solid rgba(99, 102, 241, 0.3) !important;
  color: var(--primary-color) !important;
}

.cabinet-button :deep(.p-button-icon) {
  margin-right: 0 !important;
}

.cabinet-button :deep(.p-button-label) {
  margin-left: 0 !important;
}

.cabinet-button:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15)) !important;
  border-color: rgba(99, 102, 241, 0.5) !important;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25) !important;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.12));
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px;
  cursor: pointer;
  padding: 14px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.menu-toggle:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
  border-color: rgba(99, 102, 241, 0.3);
  transform: scale(1.05);
}

.menu-toggle span {
  width: 28px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Login Dialog Styles */
.modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-icon img {
  width: 35px;
  height: 35px;
  object-fit: contain;
}

.modal-header h2 {
  margin: 0 0 4px 0;
  font-size: 1.5rem;
  color: var(--text-dark);
}

.modal-subtitle {
  margin: 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

.login-form {
  padding: 20px 0;
}

.p-field {
  margin-bottom: 24px;
}

.p-field label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-dark);
}

.w-full {
  width: 100%;
}

.modal-note {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: var(--bg-light);
  border-radius: 16px;
  font-size: 0.85rem;
  color: var(--text-light);
}

.modal-note i {
  font-size: 1.1rem;
  color: var(--primary-color);
}

@media (max-width: 968px) {
  .nav-menu {
    gap: 4px;
  }

  .nav-menu a {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .header-actions {
    display: none;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 100px 30px 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    gap: 12px;
  }

  .nav-menu.active {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-menu li {
    width: 100%;
  }

  .nav-menu a {
    width: 100%;
    padding: 18px 24px;
    font-size: 1.1rem;
    text-align: center;
    border-radius: 20px;
    margin-bottom: 12px;
  }

  .nav-menu a::after {
    display: none;
  }

  .logo {
    font-size: 1.4rem;
  }

  .logo-img {
    width: 40px;
    height: 40px;
  }
}
</style>

<style>
/* Global Dialog Styles */
.login-dialog .p-dialog-header {
  padding: 24px 24px 0;
  border-bottom: none;
}

.login-dialog .p-dialog-content {
  padding: 0 24px 24px;
}

.login-dialog .p-dialog {
  border-radius: 24px;
  overflow: hidden;
}

.login-dialog .p-inputtext {
  padding: 14px 14px 14px 45px;
  border-radius: 16px;
  border: 2px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-dialog .p-inputtext:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.login-dialog .p-password-input {
  padding: 14px;
  border-radius: 16px;
  border: 2px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-dialog .p-password-input:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.login-dialog .p-button-lg {
  padding: 14px;
  border-radius: 16px;
  font-weight: 600;
}
</style>
