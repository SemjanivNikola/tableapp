<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  name: "TabHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
