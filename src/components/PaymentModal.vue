<template>
  <Dialog 
    :visible="true" 
    modal 
    :closable="true"
    :draggable="false"
    :style="{ width: '550px' }"
    class="payment-dialog"
    @update:visible="$emit('close')"
  >
    <template #header>
      <div class="payment-header">
        <i class="pi pi-credit-card header-icon"></i>
        <h2>Оплата курса</h2>
      </div>
    </template>

    <div v-if="!loading && !error">
      <Card v-if="course" class="course-info-card">
        <template #content>
          <div class="course-info">
            <h3>{{ course.title }}</h3>
            <div class="price-info">
              <Tag :value="course.price + ' ₽'" severity="success" class="price-tag" />
              <span v-if="course.installment" class="installment">
                или {{ course.installment }} ₽/мес
              </span>
            </div>
          </div>
        </template>
      </Card>

      <div class="payment-methods">
        <h4><i class="pi pi-wallet"></i> Выберите способ оплаты:</h4>
        <div class="methods-grid">
          <div 
            v-for="method in paymentMethods" 
            :key="method.id"
            @click="processPayment(method)"
            class="method-card"
            :class="{ selected: selectedMethod === method.id }"
          >
            <div class="method-logo">
              <img :src="method.logo" :alt="method.name" />
            </div>
            <div class="method-info">
              <h5>{{ method.name }}</h5>
              <p>{{ method.description }}</p>
            </div>
            <i class="pi pi-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-animation">
        <div class="spinner"></div>
        <div class="spinner-ring"></div>
      </div>
      <h3>Обработка платежа...</h3>
      <p>Пожалуйста, подождите</p>
      <ProgressBar mode="indeterminate" class="loading-progress" />
    </div>

    <div v-if="error" class="error-state">
      <div class="error-icon-wrapper">
        <i class="pi pi-exclamation-triangle error-icon"></i>
        <div class="error-pulse"></div>
      </div>
      <h3>Технические заминки</h3>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-suggestions">
        <div class="suggestion-item">
          <i class="pi pi-clock"></i>
          <span>Подождите 10 минут</span>
        </div>
        <div class="suggestion-item">
          <i class="pi pi-wifi"></i>
          <span>Проверьте VPN</span>
        </div>
      </div>
      <Button 
        @click="resetPayment" 
        label="Попробовать снова" 
        icon="pi pi-refresh"
        class="retry-button"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAssetPath } from '../utils/path'

const props = defineProps({
  course: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const loading = ref(false)
const error = ref(false)
const selectedMethod = ref(null)

const errorMessage = computed(() => {
  return 'Попробуйте в течение 10 минут повторно. Или выключите VPN, если он включён.'
})

const paymentMethods = [
  {
    id: 'sberbank',
    name: 'Сбербанк',
    description: 'Карта, СБП',
    color: '#21A038',
    logo: getAssetPath('/bank-logos/sberbank.jpg')
  },
  {
    id: 'tinkoff',
    name: 'Т-Банк',
    description: 'Карта, СБП, QR-Code',
    color: '#FFDD2D',
    logo: getAssetPath('/bank-logos/tinkoff.png')
  },
  {
    id: 'alfabank',
    name: 'Альфа-Банк',
    description: 'Карта, СБП',
    color: '#EF3124',
    logo: getAssetPath('/bank-logos/alfabank.jpg')
  },
  {
    id: 'installment',
    name: 'Рассрочка',
    description: 'Без переплаты',
    color: '#6366f1',
    logo: getAssetPath('/bank-logos/installment.svg')
  }
]

const processPayment = async (method) => {
  selectedMethod.value = method.id
  loading.value = true
  error.value = false

  await new Promise(resolve => setTimeout(resolve, 2000))

  loading.value = false
  error.value = true
}

const resetPayment = () => {
  loading.value = false
  error.value = false
  selectedMethod.value = null
}
</script>

<style scoped>
.payment-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}

.header-icon {
  font-size: 2rem;
  color: var(--primary-color);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.payment-header h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.course-info-card {
  margin-bottom: 28px;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 50%,
    rgba(236, 72, 153, 0.05) 100%);
  border: 2px solid rgba(99, 102, 241, 0.15);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
}

.course-info {
  padding: 4px 0;
}

.course-info h3 {
  margin: 0 0 16px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.3;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.price-tag {
  font-size: 1.4rem !important;
  font-weight: 700 !important;
  padding: 12px 20px !important;
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
}

.installment {
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 18px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 10px;
}

.payment-methods h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-dark);
}

.payment-methods h4 i {
  color: var(--primary-color);
  font-size: 1.3rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.methods-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.method-card:hover {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.03);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.method-card.selected {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08));
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
}

.method-logo {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 6px;
}

.method-card:hover .method-logo {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.method-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
  max-width: 100%;
  max-height: 100%;
}

.method-info {
  flex: 1;
  min-width: 0;
}

.method-info h5 {
  margin: 0 0 6px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
}

.method-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 500;
}

.method-card i.pi-chevron-right {
  color: var(--text-light);
  transition: transform 0.3s ease;
}

.method-card:hover i.pi-chevron-right {
  transform: translateX(4px);
  color: var(--primary-color);
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.loading-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
}

.spinner {
  width: 80px;
  height: 80px;
  border: 6px solid rgba(99, 102, 241, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-ring {
  width: 100px;
  height: 100px;
  border: 4px solid rgba(139, 92, 246, 0.1);
  border-top-color: rgba(139, 92, 246, 0.5);
  border-radius: 50%;
  animation: spin 1.5s linear infinite reverse;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.loading-state h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
}

.loading-state p {
  margin: 0 0 30px 0;
  font-size: 1rem;
  color: var(--text-light);
}

.loading-progress {
  max-width: 300px;
  margin: 0 auto;
  height: 8px !important;
  border-radius: 10px !important;
}

.error-state {
  text-align: center;
  padding: 50px 30px;
}

.error-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.error-icon {
  font-size: 5rem;
  color: #f59e0b;
  position: relative;
  z-index: 2;
  animation: shake 0.5s ease-in-out;
}

.error-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: rgba(245, 158, 11, 0.2);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  z-index: 1;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.2;
  }
}

.error-state h3 {
  margin: 0 0 16px 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: -0.5px;
}

.error-message {
  margin: 0 0 30px 0;
  font-size: 1.05rem;
  color: var(--text-dark);
  line-height: 1.6;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.error-suggestions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  text-align: left;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  transform: translateX(5px);
}

.suggestion-item i {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.suggestion-item span {
  color: var(--text-dark);
  font-weight: 600;
  font-size: 0.95rem;
}

.retry-button {
  padding: 16px 32px !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3) !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
  margin: 0 auto !important;
  width: auto !important;
}

.retry-button :deep(.p-button-icon) {
  margin: 0 !important;
}

.retry-button :deep(.p-button-label) {
  margin: 0 !important;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.4) !important;
  background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important;
}
</style>

<style>
.payment-dialog .p-dialog {
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.payment-dialog .p-dialog-header {
  padding: 28px 30px;
  border-bottom: 2px solid rgba(99, 102, 241, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
}

.payment-dialog .p-dialog-content {
  padding: 30px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
}

.payment-dialog .p-dialog-header-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.payment-dialog .p-dialog-header-icon:hover {
  background: rgba(99, 102, 241, 0.1);
  transform: rotate(90deg);
}

.payment-dialog .p-card {
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.payment-dialog .p-card-content {
  padding: 20px 24px;
}

.payment-dialog .p-button {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  padding: 16px 28px !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.payment-dialog .p-button :deep(.p-button-icon) {
  margin: 0 !important;
}

.payment-dialog .p-button :deep(.p-button-label) {
  margin: 0 !important;
}

.payment-dialog .p-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
}
</style>
