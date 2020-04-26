<template>
  <div>
    <h1>AES Test</h1>
    <div class="box">
      <form @submit.prevent="startEncrypt">
        <textarea v-model="text" rows="10" cols="100" />
        <p><button type="submit">Encode</button></p>
      </form>
    </div>

    <div class="box">
      <div>
        Key
        <BaseHexView :bytes="key" />
      </div>
      <div>
        IV
        <BaseHexView :bytes="iv" />
      </div>
      <div>
        Cipher
        <BaseHexView :bytes="cipher" />
      </div>
    </div>
    <button @click.prevent="copy">Create Copyable Text</button>
    <input v-model="json" @focus="$event.target.select()" />
    <button @click.prevent="paste">Import Text</button>

    <div class="box">
      <div>
        <p><button @click="startDecrypt">Decrypt</button></p>
        <pre v-text="decryptedText"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { generateRandomBytes, aes, config } from '@/libs/hpcrypt'
import { encode, decode } from '@/libs/hpcrypt/utils/base64'

export default {
  data() {
    return {
      text: '',
      decryptedText: null,
      key: null,
      iv: null,
      cipher: null,
      json: null
    }
  },

  methods: {
    async startEncrypt() {
      try {
        let key = await aes.generateKey()
        this.key = await aes.exportKey(key)
        this.iv = generateRandomBytes(config.aes.ivSize)
        this.cipher = await aes.encrypt(key, this.iv, this.text)
      } catch (err) {
        console.error(err)
        alert('Encrypt failed\n' + err)
      }
    },

    async startDecrypt() {
      try {
        let key = await aes.importKey(this.key)
        this.decryptedText = await aes.decrypt(key, this.iv, this.cipher)
      } catch (err) {
        console.error(err)
        alert('Decrypt failed\n' + err)
      }
    },

    async copy() {
      let json = {
        key: encode(this.key),
        iv: encode(this.iv),
        cipher: encode(this.cipher)
      }
      this.json = JSON.stringify(json)
    },

    async paste() {
      try {
        let json = JSON.parse(this.json)
        this.key = new Uint8Array(decode(json.key))
        this.iv = new Uint8Array(decode(json.iv))
        this.cipher = new Uint8Array(decode(json.cipher))
      } catch (err) {
        console.error(err)
        alert('Paste failed')
      }
    }
  }
}
</script>

<style lang="scss"></style>
