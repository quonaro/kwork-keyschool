<template>
  <div id="app">
    <Toast 
      position="top-right" 
      :breakpoints="{'960px': {width: '100%', right: '0', left: '0'}}"
      :baseZIndex="1100"
    />
    <Header />
    <router-view />
    <Footer />
    <PaymentModal 
      v-if="showPaymentModal" 
      @close="showPaymentModal = false"
      :course="selectedCourse"
    />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PaymentModal from './components/PaymentModal.vue'

const showPaymentModal = ref(false)
const selectedCourse = ref(null)

const openPayment = (course) => {
  selectedCourse.value = course
  showPaymentModal.value = true
}

provide('openPayment', openPayment)
</script>

<style>
#app {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
