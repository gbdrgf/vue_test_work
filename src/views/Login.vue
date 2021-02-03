<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Добро пожаловать</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="this.$v.email.$dirty && !this.$v.email.required"
        >Поле Email не должно быть пустым</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите корретный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="this.$v.password.$dirty && !this.$v.password.required"
        >
          Введите пароль
        </small>
        <small
            class="helper-text invalid"
            v-else-if="this.$v.password.$dirty && !this.$v.password.minLength"
        >
          Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
        await this.$store.dispatch('login', formData)
        await this.$router.push('/table')
    }
  }
}
</script>