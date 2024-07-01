<template>
  <div class="osnova">
    <div class="form">
      <el-form class="main-form"
        :model="loginForm"
        status-icon
        :rules="rules" 
        ref="loginForm"  
        @submit.prevent="handleSubmit"
      >
        <h2>Авторизация</h2>
        <el-form-item class="el-form-item"
          prop="username"
          label="Логин:"
          label-width="120px" 
        >
          <el-input class="input" v-model="loginForm.username" placeholder="Введите логин"></el-input>
        </el-form-item>

        <el-form-item class="el-form-item"
          prop="password"
          label="Пароль:"
          label-width="120px"
        >
          <el-input 
            type="password" 
            v-model="loginForm.password" 
            placeholder="Введите пароль" 
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item class="el-form-item">
          <el-button type="primary" native-type="submit">Войти</el-button>
        </el-form-item>
      </el-form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: { 
        username: '',
        password: '',
      },
      errorMessage: null,
      rules: {
        username: [
          { required: true, message: 'Пожалуйста, введите логин', trigger: 'blur' } 
        ],
        password: [
          { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' }, 
        ],
      },
    };
  },
  methods: {
    handleSubmit() { 
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.errorMessage = null;

          if (this.loginForm.username === 'pepa' && this.loginForm.password === 'qwerty') { 
            localStorage.setItem('isLoggedIn', 'true');
            this.$router.push('/');
          } else {
            this.errorMessage = 'Введены неверные данные';
          }
        } else {
          return false; 
        }
      });
    },
  },
};
</script>

<style>
.error {
  color: red;
  margin-bottom: 10px;
}
.el-form-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.main-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: hsla(210, 62%, 57%, 0.603);
  width: 600px;
  border-radius: 14px;
  height: 215px;
}
.osnova {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>