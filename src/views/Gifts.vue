<template>
  <div class="gifts-page">
    <div class="page-header">
      <div class="container">
        <h1>Подарки и акции</h1>
        <p>Специальные предложения для наших студентов</p>
      </div>
    </div>

    <section class="section gifts-section">
      <div class="container">
        <div class="gifts-grid">
          <!-- Промокоды -->
          <Card class="gift-card promo-card">
            <template #header>
              <div class="gift-icon">
                <img :src="getAssetPath('/3d-elements/Ключ фиолетовый.png')" alt="Промокод" />
              </div>
            </template>
            <template #title>Промокоды</template>
            <template #subtitle>Используйте промокоды для получения скидок на курсы</template>
            <template #content>
              <div class="promo-list">
                <div class="promo-item" v-for="promo in promoCodes" :key="promo.code">
                  <Tag :value="promo.code" severity="info" class="promo-tag" />
                  <span class="promo-discount">{{ promo.description }}</span>
                </div>
              </div>
            </template>
            <template #footer>
              <Button 
                @click="copyPromo" 
                label="Скопировать промокод" 
                icon="pi pi-copy"
                class="w-full action-button promo-button"
              />
            </template>
          </Card>

          <!-- Скидки на курсы -->
          <Card class="gift-card discount-card">
            <template #header>
              <div class="gift-icon">
                <img :src="getAssetPath('/3d-elements/Звезда.png')" alt="Скидки" />
              </div>
            </template>
            <template #title>Скидки на курсы</template>
            <template #subtitle>Специальные цены на популярные направления</template>
            <template #content>
              <div class="discount-list">
                <div class="discount-item" v-for="discount in discounts" :key="discount.name">
                  <span class="discount-name">{{ discount.name }}</span>
                  <Tag :value="discount.value" severity="danger" />
                </div>
              </div>
            </template>
            <template #footer>
              <Button 
                @click="showDiscounts" 
                label="Посмотреть курсы" 
                icon="pi pi-external-link"
                class="w-full action-button discount-button"
              />
            </template>
          </Card>

          <!-- Приведи друга -->
          <Card class="gift-card friend-card">
            <template #header>
              <div class="gift-icon">
                <img :src="getAssetPath('/3d-elements/Круг красивый.png')" alt="Друзья" />
              </div>
            </template>
            <template #title>Приведи друга</template>
            <template #subtitle>Получи бонусы за каждого друга</template>
            <template #content>
              <div class="friend-benefits">
                <div class="benefit-item">
                  <Avatar icon="pi pi-gift" shape="circle" class="benefit-avatar" />
                  <div>
                    <strong>Вы получаете:</strong>
                    <p>3000 рублей на счет или скидку 10% на любой курс</p>
                  </div>
                </div>
                <div class="benefit-item">
                  <Avatar icon="pi pi-user-plus" shape="circle" class="benefit-avatar" />
                  <div>
                    <strong>Друг получает:</strong>
                    <p>Скидку 15% на первый курс</p>
                  </div>
                </div>
              </div>
            </template>
            <template #footer>
              <Button 
                @click="inviteFriend" 
                label="Пригласить друга" 
                icon="pi pi-share-alt"
                class="w-full action-button friend-button"
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
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { getAssetPath } from '../utils/path'

const toast = useToast()

const promoCodes = ref([
  { code: 'WELCOME2025', description: 'Скидка 15% на первый курс' },
  { code: 'STUDENT20', description: 'Скидка 20% для студентов' },
  { code: 'NEWYEAR25', description: 'Скидка 25% до конца января' }
])

const discounts = ref([
  { name: 'Все курсы программирования', value: '-20%' },
  { name: 'Курсы дизайна', value: '-15%' },
  { name: 'Маркетинг и SMM', value: '-25%' }
])

const copyPromo = () => {
  toast.add({
    severity: 'success',
    summary: 'Промокод скопирован',
    detail: 'Используйте промокод при оформлении заказа',
    life: 4500
  })
}

const showDiscounts = () => {
  toast.add({
    severity: 'info',
    summary: 'Демо-версия',
    detail: 'Перейдите в каталог курсов, чтобы увидеть актуальные скидки',
    life: 4500
  })
}

const inviteFriend = () => {
  toast.add({
    severity: 'success',
    summary: 'Ссылка скопирована',
    detail: 'Отправьте ссылку другу, и вы оба получите бонусы',
    life: 4500
  })
}
</script>

<style scoped>
.gifts-page {
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

.gifts-section {
  background: linear-gradient(180deg, 
    #f8fafc 0%, 
    #f1f5f9 50%,
    #ffffff 100%);
  padding: 80px 0;
  min-height: calc(100vh - 200px);
}

.gifts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 35px;
  max-width: 1400px;
  margin: 0 auto;
}

.gift-card {
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gift-card:hover {
  transform: translateY(-8px);
}

.gift-card :deep(.p-card) {
  border-radius: 28px;
  overflow: hidden;
  height: 100%;
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
}

.gift-card :deep(.p-card-body),
.gift-card :deep(.p-card-content) {
  padding: 32px;
}

.gift-card:hover :deep(.p-card) {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.promo-card :deep(.p-card) {
  border-top: 5px solid;
  border-image: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) 1;
  background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
}

.discount-card :deep(.p-card) {
  border-top: 5px solid;
  border-image: linear-gradient(135deg, #ec4899 0%, #f472b6 100%) 1;
  background: linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%);
}

.friend-card :deep(.p-card) {
  border-top: 5px solid;
  border-image: linear-gradient(135deg, #10b981 0%, #34d399 100%) 1;
  background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%);
}

.gift-icon {
  width: 120px;
  height: 120px;
  margin: 40px auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 50%;
  position: relative;
  transition: transform 0.3s ease;
}

.gift-card:hover .gift-icon {
  transform: scale(1.1) rotate(5deg);
}

.gift-icon::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gift-card:hover .gift-icon::before {
  opacity: 1;
}

.gift-icon img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.promo-card .gift-icon {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
}

.discount-card .gift-icon {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(244, 114, 182, 0.15) 100%);
}

.friend-card .gift-icon {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.15) 100%);
}

.gift-card :deep(.p-card-title) {
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-dark);
  letter-spacing: -0.5px;
}

.gift-card :deep(.p-card-subtitle) {
  font-size: 1.05rem;
  color: var(--text-light);
  margin-bottom: 30px;
  line-height: 1.6;
}

.promo-list {
  text-align: left;
}

.promo-item {
  padding: 18px 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 18px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.promo-item:hover {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  transform: translateX(5px);
  border-color: rgba(99, 102, 241, 0.2);
}

.promo-tag {
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  letter-spacing: 1px;
}

.promo-discount {
  font-size: 0.95rem;
  color: var(--text-light);
  font-weight: 500;
}

.discount-list {
  text-align: left;
}

.discount-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(244, 114, 182, 0.05) 100%);
  border-radius: 18px;
  margin-bottom: 14px;
  border: 1px solid rgba(236, 72, 153, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.discount-item:hover {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 114, 182, 0.1) 100%);
  transform: translateX(5px);
  border-color: rgba(236, 72, 153, 0.2);
}

.discount-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-dark);
}

.friend-benefits {
  text-align: left;
}

.benefit-item {
  display: flex;
  gap: 18px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.05) 100%);
  border-radius: 18px;
  margin-bottom: 14px;
  align-items: flex-start;
  border: 1px solid rgba(16, 185, 129, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.benefit-item:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%);
  transform: translateX(5px);
  border-color: rgba(16, 185, 129, 0.2);
}

.benefit-avatar {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  flex-shrink: 0;
  width: 48px !important;
  height: 48px !important;
  font-size: 1.2rem !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.benefit-item strong {
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
  color: var(--text-dark);
}

.benefit-item p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-light);
  line-height: 1.5;
}

.w-full {
  width: 100%;
}

/* Улучшенные кнопки в стиле EdTech */
.action-button {
  padding: 16px 28px !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  border-radius: 18px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
  letter-spacing: 0.3px !important;
}

.action-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
}

.action-button:active {
  transform: translateY(0) !important;
}

.promo-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  color: white !important;
}

.promo-button:hover {
  background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%) !important;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
}

.discount-button {
  background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%) !important;
  color: white !important;
}

.discount-button:hover {
  background: linear-gradient(135deg, #db2777 0%, #f06292 100%) !important;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4) !important;
}

.friend-button {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%) !important;
  color: white !important;
}

.friend-button:hover {
  background: linear-gradient(135deg, #059669 0%, #2dd4bf 100%) !important;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4) !important;
}

.gift-card :deep(.p-card-footer) {
  padding: 24px 32px 32px !important;
  border-top: 1px solid rgba(99, 102, 241, 0.08);
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.02) 100%);
}

.gift-card :deep(.p-card-content) {
  padding: 0 32px 24px !important;
}

.gift-card :deep(.p-card-header) {
  padding: 0 !important;
}

@media (max-width: 768px) {
  .gifts-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .gifts-section {
    padding: 50px 0;
  }

  .action-button {
    padding: 14px 20px !important;
    font-size: 1rem !important;
  }
}
</style>
