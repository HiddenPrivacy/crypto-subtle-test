<template>
  <div>
    <h1>AES Test</h1>
    <div class="box">
      <form @submit.prevent="startEncrypt">
        <textarea v-model="text" rows="10" cols="100" />
        <p><button type="submit">Encrypt</button></p>
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
        Hash
        <BaseHexView :bytes="hash" />
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
import { aes } from 'hpcrypt'
import { encode, decode } from 'hpcrypt/utils/base64'
import textEncode from 'hpcrypt/utils/textEncode'
import textDecode from 'hpcrypt/utils/textDecode'

export default {
  data() {
    return {
      text: '',
      decryptedText: null,
      key: null,
      iv: null,
      cipher: null,
      json: null,
      hash: null,
    }
  },

  methods: {
    async startEncrypt() {
      try {
        let kvh = await aes.generateKVH()
        this.key = await aes.exportKey(kvh.key)
        this.iv = kvh.iv
        this.hash = kvh.hash
        let buffer = textEncode(this.text)
        this.cipher = await aes.encrypt(kvh, buffer)
      } catch (err) {
        console.error(err)
        alert('Encrypt failed\n' + err)
      }
    },

    async startDecrypt() {
      try {
        let kvh = await aes.importHash(this.hash)
        this.decryptedText = textDecode(await aes.decrypt(kvh, this.cipher))
      } catch (err) {
        console.error(err)
        alert('Decrypt failed\n' + err)
      }
    },

    async copy() {
      let json = {
        hash: encode(this.hash),
        cipher: encode(this.cipher),
      }
      this.json = JSON.stringify(json)
    },

    async paste() {
      try {
        let json = JSON.parse(this.json)
        this.hash = new Uint8Array(decode(json.hash))
        this.cipher = new Uint8Array(decode(json.cipher))
      } catch (err) {
        console.error(err)
        alert('Paste failed')
      }
    },
  },
}
</script>
