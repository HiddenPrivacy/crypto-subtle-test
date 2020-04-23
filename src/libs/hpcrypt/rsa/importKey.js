import subtle from '../utils/subtle'
import { decode } from '../utils/base64'
import unwrap from '../utils/unwrap'

export default async function(keyBuffer, format, usage) {
  if (!keyBuffer) throw 'Key is Empty'

  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
  return await subtle.importKey(
    format, //format
    decode(unwrap(keyBuffer)), //keyData
    {
      name: 'RSA-OAEP', //algorithm
      hash: 'SHA-512'
    },
    false, //extractable
    usage
  )
}
