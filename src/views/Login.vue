<template>
  <div>
    <h2>Авторизация</h2>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: null
    };
  },
  methods: {
    handleSubmit() {
      this.errorMessage = null; 

      if (this.username === 'pepa' && this.password === 'qwerty') {
        localStorage.setItem('isLoggedIn', 'true'); 
        this.$router.push('/'); 
      } else {
        this.errorMessage = 'Введены неверные данные';
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
  margin-bottom: 10px;
}
</style>