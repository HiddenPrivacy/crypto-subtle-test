import subtle from '../utils/subtle'

/**
 * Use publicKey to encrypt buffer with RSA-OAEP algorithm
 * learn more: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
 * @async
 * @param {CryptoKey} publicKey
 * @param {BufferSource} buffer
 * @returns {Uint8Array}
 * @throws {Error}
 */
export default async function(publicKey, buffer) {
  if (buffer.length > 382) throw 'Max buffer size should be 382'

  let cipherBuffer = await subtle.encrypt(
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-512' } // has was added because MS Edge
    },
    publicKey,
    buffer
  )

  return new Uint8Array(cipherBuffer)
}
