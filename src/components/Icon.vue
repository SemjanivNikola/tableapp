<template>
  <div id="icon-wrapper" v-html="iconName()" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 24,
    },
    color: {
      type: String,
      required: false,
      default: "rgba(255, 255, 255)",
    },
  },
  computed: {
    plus () {
      return `<svg width="${this.size}" height="${this.size}" viewBox="0 0 16 16" fill="none">
        <path fill="${this.color}" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill="${this.color}" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>`;
    },
    close () {
      return `<svg width="${this.size}" height="${this.size}" viewBox="0 0 24 24" fill="none">
        <path fill="${this.color}" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>`;
    }
  },
  methods: {
    iconName() {
      switch(this.name) {
        case "plus": {
          return this.plus;
        }
        case "close": {
          return this.close;
        }
      }
    }
  }
};
</script>

<style scoped>
#icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
