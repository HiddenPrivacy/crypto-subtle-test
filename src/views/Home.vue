<template>
  <div class="home">
    <h1>Encrypt / Decrypt Test</h1>
    <div class="box">
      <form @submit.prevent="startEncrypt">
        <textarea v-model="text" rows="10" cols="100" />
        <p><button type="submit">Encrypt</button></p>
      </form>
    </div>
    <div class="box">
      <textarea v-model="cipher" rows="10" cols="100" />
    </div>

    <div class="box">
      <div>
        <p><button @click="startDecrypt">Decrypt</button></p>
        <pre v-text="decryptedText"></pre>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { encryptText, decryptText } from 'hpcrypt'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('RSA')

export default {
  data() {
    return {
      text: '',
      cipher: null,
      decryptedText: null,
    }
  },

  computed: {
    ...mapState(['privateKey', 'publicKey']),
  },

  methods: {
    async startEncrypt() {
      try {
        this.cipher = await encryptText(this.publicKey, this.text)
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
        alert('Encrypt failed\n' + err)
      }
    },

    async startDecrypt() {
      try {
        this.decryptedText = await decryptText(this.privateKey, this.cipher)
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
        alert('Decrypt failed\n' + err)
      }
    },
  },
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

  form,
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
