<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="icon-wrapper"
    v-html="iconName()"
  />
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
        },
        menu () {
            return `<svg width="${this.size}" height="${this.size}" viewBox="0 0 16 16" fill="none">
        <path fill="${this.color}" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>`;
        },
        add () {
            return `<svg width="${this.size}" height="${this.size}" viewBox="0 0 16 16" fill="none">
        <path fill="${this.color}" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
      </svg>`;
        },
        file () {
            return `<svg width="${this.size}" height="${this.size}" viewBox="0 0 16 16" fill="none">
        <path fill="${this.color}" d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      </svg>`;
        },
    },
    methods: {
        iconName () {
            switch (this.name) {
            case "plus": {
                return this.plus;
            }
            case "close": {
                return this.close;
            }
            case "menu": {
                return this.menu;
            }
            case "add": {
                return this.add;
            }
            case "file": {
                return this.file;
            }
            }
        },
    },
};
</script>

<style scoped>
#icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
