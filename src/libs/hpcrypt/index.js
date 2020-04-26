import rsa from './rsa'
import generateRandomBytes from './generateRandomBytes'

export const config = {
  max: 382,
  rsa: {
    name: 'RSA-OAEP',
    hash: 'SHA-512',
    modulusLength: 4096,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]) //65537
  }
}

export { rsa, generateRandomBytes }
export default { rsa, generateRandomBytes }
