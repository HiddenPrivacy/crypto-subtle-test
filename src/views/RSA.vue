<template>
  <div class="home">
    <h1>RSA Test</h1>

    <div class="box">
      <button @click="startGenerate">Generate Keys</button>
      <span v-show="generationTime.valueOf()"
        >{{ generationTime.valueOf() }} ms</span
      >
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
        <button @click="startEncrypt">Encrypt</button>
        <span v-show="encryptTime.valueOf()"
          >{{ encryptTime.valueOf() }} ms</span
        >
        <BaseHexView :bytes="cipherBytes" />
      </div>
      <div>
        <button @click="startDecrypt">Decrypt</button>
        <span v-show="decryptTime.valueOf()"
          >{{ decryptTime.valueOf() }} ms</span
        >
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
import timer from '@/libs/timer'

export default {
  data() {
    return {
      size: 64,
      generationTime: new timer(),
      encryptTime: new timer(),
      decryptTime: new timer()
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
    async startGenerate() {
      this.generationTime.start()
      await this.generateKeys()
      this.generationTime.end()
    },
    async startDecrypt() {
      this.decryptTime.start()
      await this.decrypt()
      this.decryptTime.end()
    },
    async startEncrypt() {
      this.encryptTime.start()
      await this.encrypt()
      this.encryptTime.end()
    },
    ...mapActions(['generateKeys', 'generateRandomBytes', 'encrypt', 'decrypt'])
  }
}
</script>
