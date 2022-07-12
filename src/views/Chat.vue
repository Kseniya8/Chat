<script>
export default {
  data() {
    return {
      userName: '',
      userImg: '',
      actualSender: '',
      actualDialog: [],
      writtedLetter:'',
      IsMyChat: true,
      messagesIvanToSelf: [],
      messagesInanAndI: [],
      messagesSelf: []
    }
  },
  created() {
    this.userImg = localStorage.getItem('userAvatar'); 
    this.userName = localStorage.getItem('userName');
    if (!this.userName || !this.userImg) {
      alert('Ошибка! Вы еще не авторизовались');
      this.$router.push('/auth');
    }

    if (localStorage.getItem('messagesIvanToSelf') !== null) this.messagesIvanToSelf = JSON.parse(localStorage.getItem('messagesIvanToSelf')); 
    if (localStorage.getItem('messagesInanAndI') !== null) this.messagesInanAndI = JSON.parse(localStorage.getItem('messagesInanAndI')); 
    if (localStorage.getItem('messagesSelf') !== null) this.messagesSelf = JSON.parse(localStorage.getItem('messagesSelf')); 

    this.actualSender = this.userName;
    this.actualDialog = this.messagesSelf;
  },
  mounted() {
    document.querySelector('.messages-block').scrollTo(0, document.body.scrollHeight);
  },
  methods: {
    SignOut() {
      localStorage.clear();
      this.$router.push('/auth');
    },
    SendLetter() {
      if (this.writtedLetter === '' || !this.writtedLetter.trim().length) return;
      this.actualDialog.push({
        id: new Date().valueOf(),
        date: new Date().toLocaleString(),
        text: this.writtedLetter,
        sender: this.actualSender
      });

      if ( this.actualDialog === this.messagesIvanToSelf) localStorage.setItem("messagesIvanToSelf", JSON.stringify(this.messagesIvanToSelf));
      else if ( this.actualDialog === this.messagesInanAndI) localStorage.setItem("messagesInanAndI", JSON.stringify(this.messagesInanAndI));
      else if ( this.actualDialog === this.messagesSelf) localStorage.setItem("messagesSelf", JSON.stringify(this.messagesSelf));

      this.writtedLetter = '';
    },
    changeUser() {
      if (this.actualSender === this.userName)  {
        this.actualSender = 'Ivan'
        if  (this.actualDialog === this.messagesSelf) this.actualDialog = this.messagesIvanToSelf;
      } else {
        this.actualSender = this.userName;
        if  (this.actualDialog === this.messagesIvanToSelf) this.actualDialog = this.messagesSelf;
      }
    },
    ChangeDialog(dialog) {
      if (dialog === 'my' && this.actualSender === this.userName) {
        this.actualDialog = this.messagesSelf;
        this.IsMyChat = true;
      }
      else if (dialog === 'my' && this.actualSender !== this.userName) {
        this.actualDialog = this.messagesIvanToSelf;
        this.IsMyChat = true;
      }
      else if (dialog === 'friend') {
        this.actualDialog = this.messagesInanAndI;
        this.IsMyChat = false;
      }
    }
  },
}
</script>

<template>
  <main>
    <div class="container">
      <nav>
        <span class="nav__item-name">{{ userName }}</span>
        <input type="checkbox" id="switch" :checked="actualSender === 'Ivan'" @change="changeUser"/>
        <label for="switch">switch</label>
        <span class="nav__item-friend">Иван Иванов</span>
        <span class="nav__item-out" @click="SignOut">Выход</span>
      </nav>

      <div class="main-window">
        <div class="list-friends">
          <div class="list-friends__item">
            <div class="list-friends__title">Список друзей:</div>
          </div>
          <!--Friend chat-->
          <div class="list-friends__item" :class="{active : !IsMyChat}" @click="ChangeDialog('friend')">
            <img class="block-userimg" :src="actualSender === userName ? `/ivan.jpg` : userImg.toString()" :alt="actualSender === userName ? 'Ivan' : userName">
            <div class="block-username">{{actualSender === userName ? 'Ivan' : userName}}</div>
          </div>
          <!--My chat-->
          <div class="list-friends__item" :class="{active : IsMyChat}" @click="ChangeDialog('my')">
             <img class="block-userimg" :src="actualSender === userName ? userImg.toString() : `/ivan.jpg`" :alt="actualSender">
            <div class="block-username">{{actualSender}} (Saved Messages)</div>
          </div>
        </div>
        <div class="chat">
          <div class="messages-block">
            <div class="message" v-for="item in actualDialog" :class="{ mself : item.sender === actualSender }" :key="item.id">
              <div class="message-date"> {{item.date}} </div>
              <div class="message-text"> {{item.text}} </div>
            </div>
          </div>
          <div class="enter-letter-block">
            <textarea class="enter-letter-block__input" placeholder="Введите ваше сообщение" v-model="writtedLetter"></textarea>
            <div class="enter-letter-block__btn" @click="SendLetter"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import '@/assets/base.css';

main {
  background-color: var(--vt-c-text-dark-2);
  height: 100vh;
}

.container {
  height: 100%;
}

nav {
  text-align: right;
  height: 35px;
}

.nav__item-name {
  color:black;
  font-weight: bold;
  padding-right: 20px;
}

input[type=checkbox]{
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  color: transparent;
  margin-right: 20px;
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 25px;
  background: grey;
  display: inline-block;
  border-radius: 25px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 5px;
  width: 23px;
  height: 23px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + label {
  background: #bada55;
}

input:checked + label:after {
  left: calc(100% - 27px);
}

label:active:after {
  width: 30px;
}

.nav__item-friend {
  color:black;
  font-weight: 500;
  padding-right: 50px;
}

.nav__item-out {
  color: blue;
  cursor: pointer;
}

.nav__item-out:hover {
  color: darkblue;
}

.main-window {
  display: flex;
  flex-direction: row;
  height: calc(100% - 30px);
  justify-content: space-between;
}

.list-friends {
  display: flex;
  flex-direction: column;
  width: 35%;
  background-color: #fff;
}

.list-friends__item {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 10px 20px;
  border-bottom: 1px solid lightgray;
}

.list-friends__item.active {
  background-color: lightblue;
}

.list-friends__title {
  color: black;
  font-size: 15px;
}

.block-username {
  color: black;
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  font-weight: bold;
}

.block-userimg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chat {
  width: calc(65% - 2px);
  background-color: lightgray;
  display: flex;
  flex-direction: column;
}

.messages-block {
  height: 90%;
  padding: 5px;
  overflow: scroll;
}

.message {
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  width: fit-content;

  margin: 0 auto 8px 0;
  text-align: left;
  background-color: #eedb73;
}

.mself {
  margin: 0 0 8px auto;
  text-align: right;
  background-color: #bada55;
}


.message-date {
  font-size: 12px;
  color:rgb(37, 37, 37);
}
.message-text {
  font-size: 16px;
  color:black;
}

.enter-letter-block {
  height: 10%;
  display: flex;
  flex-direction: row;
}

.enter-letter-block__input {
  width: 100%;
  border: none;
  resize: none;
  outline: none;
}

.enter-letter-block__btn {
  cursor: pointer;
  margin: auto 15px;
  width: 40px;
  height: 40px;
  background: no-repeat center/cover url("@/assets/telegram_logo.png");;
}

</style>
