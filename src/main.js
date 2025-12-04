import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// PrimeVue Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Avatar from 'primevue/avatar'
import Rating from 'primevue/rating'
import ProgressBar from 'primevue/progressbar'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

// Register components globally
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Dialog', Dialog)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Dropdown', Dropdown)
app.component('Textarea', Textarea)
app.component('Tag', Tag)
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('Rating', Rating)
app.component('ProgressBar', ProgressBar)
app.component('Toast', Toast)

// Directives
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)

app.mount('#app')
