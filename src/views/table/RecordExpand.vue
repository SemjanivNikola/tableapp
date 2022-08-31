<template>
  <div class="relative">
    <div class="header">
      <button class="btn" @click="$emit('close')">X</button>
    </div>

    <!-- BODY -->
    <div class="body-wrapper">
      <v-row align="center">
        <v-col>
         <p>Place holder for a input field</p>
        </v-col>
        <v-col>
          <p>Place holder for a input field</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
    name: "RecordExpand",
    props: {
        fields: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {};
    },
    methods: {
        submit () {
            console.warn("SUBMITTING");
        },
    },
};
</script>

<style scoped>
.relative {
  position: relative;
  min-height: inherit;
}
p {
  margin: 0;
}
.header {
  text-align: end;
  margin: 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #dcdcdc;
}
</style>
