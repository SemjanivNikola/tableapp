<template>
    <th :class="{ hidden: !item.isShown }">
        <span v-if="isPlaceholder">{{item.text}}</span>
        <input
        v-else
            :value="item.text"
            class="header-input"
            @input="onInput"
            @blur="onBlur"
        />
    </th>
</template>
<script>
export default {
    name: "HeaderListItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
        isPlaceholder: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            input: "",
        };
    },
    methods: {
        onInput (event) {
            this.input = event.target.value;
        },
        onBlur () {
            // this.$store.dispatch("handleHeaderRename")
        },
    },
};
</script>

<style scoped>
th {
    border: 1px solid #fff;
}
th.hidden {
    display: none;
}
.header-input {
    width: 100%;
    border: none;
    background: transparent;
    color: white;
    font-size: 14px;
    padding-left: 8px;
    text-align: left;
}
.header-input:focus {
    outline: none;
}
</style>
