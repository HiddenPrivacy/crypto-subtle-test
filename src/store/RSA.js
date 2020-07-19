import generateRandomBytes from 'hpcrypt/generateRandomBytes'
import {
  generateKeys,
  importPublicKey,
  importPrivateKey,
  encrypt,
  decrypt
} from 'hpcrypt/rsa'

export default {
  namespaced: true,

  state: {
    privateKey: null,
    publicKey: null,
    randomBytes: null,
    cipherBytes: null,
    decryptedBytes: null
  },

  getters: {
    isSame(state) {
      if (
        state.randomBytes != null &&
        state.decryptedBytes != null &&
        state.randomBytes.length == state.decryptedBytes.length &&
        state.randomBytes.every(
          (element, index) => element == state.decryptedBytes[index]
        )
      ) {
        return true
      } else return false
    }
  },

  mutations: {
    DELETE_KEYS(state) {
      state.privateKey = null
      state.publicKey = null
    },
    SET_KEYS(state, keys) {
      state.privateKey = keys.privateKey
      state.publicKey = keys.publicKey
    },
    SET_RANDOM_BYTES(state, bytes) {
      state.randomBytes = bytes
    },
    SET_CIPHER_BYTES(state, bytes) {
      state.cipherBytes = bytes
      state.decryptedBytes = null
    },
    SET_DECRYPTED_BYTES(state, bytes) {
      state.decryptedBytes = bytes
    }
  },
  actions: {
    async generateKeys(context) {
      context.commit('SET_STATUS', 'working', { root: true })
      context.commit('DELETE_KEYS')

      try {
        let keys = await generateKeys()
        context.commit('SET_KEYS', keys)
      } catch (err) {
        console.error(err)
        alert('Keys generation failed\n' + err)
      }
      context.commit('SET_STATUS', 'idle', { root: true })
    },

    generateRandomBytes(context, size) {
      context.commit('SET_RANDOM_BYTES', generateRandomBytes(size))
    },

    async encrypt(context) {
      context.commit('SET_STATUS', 'working', { root: true })

      try {
        let key = await importPublicKey(context.state.publicKey)
        context.commit(
          'SET_CIPHER_BYTES',
          await encrypt(key, context.state.randomBytes)
        )
      } catch (err) {
        console.error(err)
        alert('Encryption Failed\n' + err)
      }
      context.commit('SET_STATUS', 'idle', { root: true })
    },

    async decrypt(context) {
      context.commit('SET_STATUS', 'working', { root: true })

      try {
        let key = await importPrivateKey(context.state.privateKey)
        context.commit(
          'SET_DECRYPTED_BYTES',
          await decrypt(key, context.state.cipherBytes)
        )
      } catch (err) {
        console.error(err)
        alert('Decryption Failed\n' + err)
      }
      context.commit('SET_STATUS', 'idle', { root: true })
    }
  },
  modules: {}
}
