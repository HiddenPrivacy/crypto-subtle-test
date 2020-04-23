import subtle from '../utils/subtle'

/**
 * Use privateKey to dencrypt buffer with RSA-OAEP algorithm
 * learn more: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
 * @async
 * @param {CryptoKey} privateKey
 * @param {BufferSource} cipherBuffer
 * @returns {Uint8Array}
 * @throws {Error}
 */
export default async function(privateKey, cipherBuffer) {
  let buffer = await subtle.decrypt(
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-512' } // has was added because MS Edge
    },
    privateKey,
    cipherBuffer
  )
  return new Uint8Array(buffer)
}
