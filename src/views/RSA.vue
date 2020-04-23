<template>
  <div class="home">
    <h1>RSA Test</h1>

    <div class="box">
      <button @click="generateKeys">Generate Keys</button>
    </div>

    <div class="box">
      <textarea v-model="privateKey" rows="4" cols="68" />
      <textarea v-model="publicKey" rows="4" cols="68" />
    </div>

    <div class="box">
      <div>
        <form @submit.prevent="onSubmit">
          <input type="number" v-model="size" size="2" />
          <button type="submit">Generate RandomBytes</button>
        </form>
        <BaseHexView :bytes="randomBytes" />
      </div>
      <div>
        <button @click="encrypt">Encrypt</button>
        <BaseHexView :bytes="cipherBytes" />
      </div>
      <div>
        <button @click="decrypt">Decrypt</button>
        <BaseHexView :bytes="decryptedBytes" />
        <p v-if="decryptedBytes && isSame">
          Hurray, decrypted bytes are the same as random bytes.
        </p>
        <p v-else-if="decryptedBytes">
          Oops, decrypted bytes are NOT the same as random bytes.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('RSA')

export default {
  data() {
    return {
      size: 64
    }
  },

  computed: {
    ...mapState([
      'privateKey',
      'publicKey',
      'randomBytes',
      'cipherBytes',
      'decryptedBytes'
    ]),
    ...mapGetters(['isSame'])
  },

  methods: {
    onSubmit() {
      this.generateRandomBytes(this.size)
    },
    ...mapActions(['generateKeys', 'generateRandomBytes', 'encrypt', 'decrypt'])
  }
}
</script>

<style lang="scss">
.box {
  background: #f5f5f5;
  margin: 20px;
  border: 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  @media screen and (min-width: 1500px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  textarea {
    max-width: 100%;
  }

  & > * {
    display: block;
    margin: 5px;

    @media screen and (min-width: 1500px) {
      margin: 20px;
    }
  }
}
</style>
