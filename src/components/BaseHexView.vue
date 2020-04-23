<template>
  <pre class="hex">
    <div
  v-for="(line, index) in lines"
  :key="`hex-${index}`"
  :data-num="(index * 16).toString(16).padStart(8, '0')"
>
      <span v-for="(segment, sindex) in line" :key="`segment-${sindex}`" v-text="segment" />
    </div>
  </pre>
</template>

<script>
function segment(typedArray) {
  let arr = []

  typedArray.forEach(bit => {
    arr.push(
      bit
        .toString(16)
        .toUpperCase()
        .padStart(2, '0')
    )
  })

  return arr.length ? arr.join(' ') : null
}

export default {
  props: {
    bytes: {
      type: [Uint8Array]
    }
  },
  computed: {
    lines: function() {
      if (!this.bytes) return []

      let lines = []
      for (let i = 0; i < this.bytes.length; i = i + 16) {
        let segment1 = segment(this.bytes.slice(i, i + 8))
        let segment2 = segment(this.bytes.slice(i + 8, i + 16))
        let segments = [segment1]
        if (segment2) segments.push(segment2)
        lines.push(segments)
      }
      return lines
    }
  }
}
</script>

<style lang="scss">
.hex {
  text-align: left;
  line-height: 1;
  display: block;
  font-size: 2.2vw;

  @media screen and (min-width: 600px) {
    font-size: 1em;
  }

  div {
    display: flex;
    height: 1em;

    &::before {
      color: #aaa;
      font-weight: normal;
      content: attr(data-num) ': ';
      margin-right: 0.5em;
    }

    span {
      font-weight: bold;

      &:not(:first-child) {
        border-left: 1px solid #ccc;
        margin-left: 1em;
        padding-left: 1em;
      }
    }
  }
}
</style>
