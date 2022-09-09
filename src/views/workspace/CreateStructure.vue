<template>
  <div class="relative">
    <div class="header">
      <p>Create {{ structure }}</p>
      <button class="btn" @click="$emit('close')">X</button>
    </div>

    <!-- BODY -->
    <div class="body-wrapper">
      <v-form v-model="valid">
        <v-select
          v-if="structure !== 'workspace'"
          v-model="selectedWorkspace"
          :items="workspaceList"
          :rules="selectRule"
          item-value="id"
          item-text="title"
          label="Selected workspace"
        />

        <v-select
          v-if="structure === 'view'"
          v-model="selectedTable"
          :items="tableList"
          :rules="selectRule"
          item-value="id"
          item-text="title"
          label="Selected table"
        />

        <v-text-field
          v-model="title"
          :rules="stringRule"
          :counter="25"
          label="Title"
          requred
        ></v-text-field>

        <v-textarea
          v-if="structure === 'workspace'"
          v-model="description"
          name="description"
          label="Description"
          hint="What is this workspace about?"
          counter
          no-resize
          rows="2"
        ></v-textarea>

        <div class="spacer-md"></div>

        <v-text-field
          v-if="structure === 'table'"
          v-model="viewTitle"
          :rules="stringRule"
          :counter="25"
          label="View title"
          :requred="structure === 'table'"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit" :disabled="!valid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </v-form>
    </div>

    <div class="footer-placeholder" />

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-inner">
        <div class="icon">
          <svg viewBox="0 0 24 24">
            <path
              fill="#696969"
              d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,
              22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </div>
        <p>
          When creating new workspace, by default one table and one grid view is
          added to it. You can add more now or later, as well as change default
          naming of those data structures.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "CreateStructure",
    props: {
        structure: {
            type: String,
            default: "view",
            required: false,
        },
    },
    data () {
        return {
            valid: false,
            title: "Untitled",
            viewTitle: "Untitled",
            selectedWorkspace: null,
            selectedTable: null,
            workspaceList: [],
            tableList: [],
            description: "",
            stringRule: [
                (str) => Boolean(str) || "Title is required",
                (str) => (/^[A-Za-z0-9 ]*$/u).test(str) || "Use only letters and numbers",
                (str) => str.length <= 25 || "Title must be less than 25 characters",
            ],
            selectRule: [(val) => Boolean(val) || "Field is required"],
        };
    },
    watch: {
        structure (val) {
            if (val === "table") {
                this.fillWorkspaceSelect();
            } else if (val === "view") {
                this.fillWorkspaceSelect();
                this.fillTableSelect();
            }
        },
    },
    methods: {
        async submit () {
            const newStructure = this.prepareSubmitData;

            const res = await this.$store.dispatch(`${this.structure}/${this.getFnPath}`, newStructure);
            if (res) {
                this.$emit("close");
                this.clear();
            }
        },
        clear () {
            this.valid = false;
            this.title = "Untitled";
            this.viewTitle = "View 1";
            this.selectedWorkspace = null;
            this.selectedTable = null;
            this.description = "";
        },
        fillWorkspaceSelect () {
            this.workspaceList = this.$store.getters["workspace/getMap"];
            const id = this.$store.getters["workspace/getSelectedId"];
            this.selectedWorkspace = this.workspaceList[id - 1].id;
        },
        fillTableSelect () {
            this.tableList = this.$store.getters["table/getMap"];
            const id = this.$store.getters["table/getSelectedId"];
            const helper = this.tableList.filter((item) => item.id === id);
            this.selectedTable = helper[0].id;
        },
    },
    computed: {
        prepareSubmitData () {
            if (this.structure === "workspace") {
                return {
                    title: this.title,
                    description: this.description,
                    icon: "pen",
                    iconColor: "#fff",
                    backgroundColor: "#f80182",
                    tableTitle: "Untitled",
                    viewTitle: "Untitled",
                };
            } else if (this.structure === "table") {
                return {
                    workspaceId: this.selectedWorkspace,
                    title: this.title,
                    viewTitle: this.viewTitle,
                };
            }

            return {
                workspaceId: this.selectedWorkspace,
                tableId: this.selectedTable,
                title: this.title,
            };
        },
        getFnPath () {
            // eslint-disable-next-line no-nested-ternary
            return this.structure === "workspace" ? "createWorkspace" :
                this.structure === "table" ? "createTable" : "createView";
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
.flex-row,
.header,
.footer-inner {
  display: flex;
  align-items: center;
}
.header {
  justify-content: space-between;
  margin: 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #dcdcdc;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-top: 8px;
  margin: 0 16px;
  background-color: #fff;
  border-top: 2px solid #dcdcdc;
}
.footer-inner {
  padding: 8px;
  background-color: #dcdcdc;
  border-radius: 6px;
}
.footer-inner .icon {
  width: 22px;
  height: 22px;
  margin-right: 16px;
}
.footer-inner p {
  font-size: 14px;
  color: #696969;
}
.footer-placeholder {
  height: 76px;
}
.spacer-md {
  height: 16px;
  width: 16px;
}
.btn {
  padding: 8px;
  cursor: pointer;
}
.btn-fill {
  background-color: #dcdcdc;
}

.body-wrapper {
  overflow-y: auto;
  max-height: 350px;
  padding: 8px 16px;
}
.item-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.item-list .list-item {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #dcdcdc;
}
.item-list .list-item:last-child {
  border-bottom: none;
}
</style>
