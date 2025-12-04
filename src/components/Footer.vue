<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <img src="/3d-elements/Ключ прозрачный.png" alt="Ключ" />
            <span>Онлайн-школа Ключ</span>
          </div>
          <p>Образовательная платформа нового поколения. Ключ к твоему успеху!</p>
        </div>
        <div class="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><router-link to="/about">О Ключе</router-link></li>
            <li><router-link to="/reviews">Отзывы</router-link></li>
            <li><router-link to="/teachers">Наши преподаватели</router-link></li>
            <li><router-link to="/gifts">Подарки</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Документы</h4>
          <ul>
            <li><a href="#" @click.prevent>Политика обработки персональных данных</a></li>
            <li><a href="#" @click.prevent>Публичная оферта</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Контакты</h4>
          <ul>
            <li>Email: info@klyuch-school.ru</li>
            <li>Телеграм: @klyuch_school</li>
            <li>Поддержка 24/7</li>
          </ul>
          <div class="footer-social">
            <a href="#" class="social-link">
              <img src="/3d-elements/Телеграм.png" alt="Telegram" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-legal">
          <p><strong>Организация Ключ</strong></p>
          <p>ИНН: 7707083893</p>
          <p>ОГРН: 1234567890123</p>
        </div>
        <p>&copy; 2025 Онлайн-школа Ключ. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: var(--text-dark);
  color: white;
  padding: 60px 0 20px;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-image: url('/2d-infographics/Линии разноцветные.png');
  background-repeat: no-repeat;
  background-position: bottom;
  opacity: 0.1;
  z-index: 0;
}

.footer .container {
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h4 {
  color: white;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.footer-logo img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 12px;
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-section ul li a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.footer-social {
  display: flex;
  gap: 15px;
  margin-top: 16px;
}

.social-link {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-link:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}

.social-link img {
  width: 25px;
  height: 25px;
  object-fit: contain;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-legal {
  color: rgba(255, 255, 255, 0.7);
}

.footer-legal p {
  margin: 4px 0;
  font-size: 0.9rem;
}

.footer-bottom > p {
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
