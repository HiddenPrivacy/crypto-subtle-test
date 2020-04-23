<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/RSA">RSA</router-link>
        </li>
        <li>
          <router-link to="/AES">AES</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  padding: 30px 0;
  background: #0099ff;

  nav {
    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;

      li {
        display: block;
        margin: 0 10px;
        padding: 0;

        a {
          text-decoration: none;
          display: flex;
          font-weight: bold;
          color: #fff;
          width: 4em;
          height: 4em;
          justify-content: center;
          align-items: center;
          border: 1px solid #fff;
          border-radius: 8px;

          &.router-link-exact-active {
            background-color: #fff;
            color: #0099ff;
          }
        }
      }
    }
  }
}
</style>
