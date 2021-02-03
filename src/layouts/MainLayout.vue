<template>
  <div class="app-main-layout">
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="https://hh.ru/resume/56f4ea3eff085cc9410039ed1f456e44364f70">
            <i class="material-icons black-text">FOMINA G</i>
          </a>
        </div>
        <ul class="right hide-on-small-and-down">
          <li>
            <button class="btn-small btn" @click="logout()">
              <span>Выйти</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <main class="app-content">
      <div class="app-page">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>

export default {

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>