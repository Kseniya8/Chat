<script>
export default {
  data() {
    return {
      enteredName: '',
      uploadedImg: '',
      isErrorName: false, 
      isErrorImg: false
    }
  },
  methods: {
    UploadImage(event) {
      this.uploadedImg =  URL.createObjectURL(event.target.files[0]);
    },
    Auth() {
      !this.enteredName ? this.isErrorName = true : this.isErrorName = false;
      !this.uploadedImg ? this.isErrorImg = true : this.isErrorImg = false;
      if (this.enteredName && this.uploadedImg) {
        localStorage.setItem('userAvatar', this.uploadedImg);
        localStorage.setItem('userName', this.enteredName);
        this.$router.push('/chat')
      }
    }
  }
}
</script>

<template>
  <main class="container">
    <h1>ВОЙТИ В ЧАТ</h1>
    <div class="auth-block">
      <p class="label-name" :class="{ active: isErrorName }">Ваше имя</p>
      <input class="name-input" type="text" placeholder="Введите имя" maxlength="30"  v-model="enteredName">

      <p class="label-img" :class="{ active: isErrorImg }">Загрузите изображение</p>
      <input type="file" accept="image/jpeg,image/png"  @change="UploadImage($event)">  
    </div>
     <div class="auth-btn" @click="Auth" >Войти в чат</div>
  </main>
</template>


<style scoped>
@import '@/assets/base.css';

main {
  text-align: center;
}

.auth-block {
  margin: 50px auto 0;
  max-width: 500px;
  width: 100%;
  text-align: left;
}

.name-input {
  width: 100%;
  padding: 5px 15px;
  border-radius: 5px;
  margin-bottom: 25px;
}

p {
  margin-bottom: 5px;
}

.label-img.active, .label-name.active {
  color: red;
}

.auth-btn {
  width: 150px;
  margin: 25px auto 0;
  font-size: 20px;
  line-height: 20px;
  color: black;
  background-color: var(--vt-c-text-dark-2);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 8px 15px;
}

.auth-btn:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

@media (prefers-color-scheme: dark) {
  .auth-btn {
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  .auth-btn:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
}

</style>