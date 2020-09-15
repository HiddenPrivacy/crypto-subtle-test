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
      keyIV: null,
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
        this.keyIV = await aes.generateKeyIV()
        await this.update()
        let buffer = textEncode(this.text)
        this.cipher = await aes.encrypt(this.keyIV, buffer)
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
        alert('Encrypt failed\n' + err)
      }
    },

    async startDecrypt() {
      try {
        this.decryptedText = textDecode(
          await aes.decrypt(this.keyIV, this.cipher)
        )
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
        alert('Decrypt failed\n' + err)
      }
    },

    async update() {
      this.key = await aes.exportKey(this.keyIV.key)
      this.iv = this.keyIV.iv
    },

    async copy() {
      const hash = await aes.exportKeyIV(this.keyIV)
      let json = {
        hash: encode(hash),
        cipher: encode(this.cipher),
      }
      this.json = JSON.stringify(json)
    },

    async paste() {
      try {
        let json = JSON.parse(this.json)
        const hash = new Uint8Array(decode(json.hash))
        this.keyIV = await aes.importKeyIV(hash)
        await this.update()
        this.cipher = new Uint8Array(decode(json.cipher))
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
        alert('Paste failed')
      }
    },
  },
}
</script>
