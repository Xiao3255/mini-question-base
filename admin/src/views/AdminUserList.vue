<template>
  <div>
    <h2>管理员列表</h2>
    <el-table :data="items">
      <el-table-column label="用户名">
        <template #default="{row}">
          <div v-if="row.editable">
            <el-input v-model="row.username"></el-input>
          </div>
          <span v-else>{{row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码">
        <template #default="{row}">
          <div v-if="row.editable">
            <el-input v-model="row.password"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="{ row, $index }">
          <div v-if="row.editable">
            <el-button type="text" size="medium" @click="handleSave(row)">保存</el-button>
            <el-button type="text" size="medium" @click="handleCancel(row,$index)">取消</el-button>
          </div>
          <template v-else>
            <el-button type="text" size="medium" @click="handleEdit(row)">编辑</el-button>
          </template>
          <el-button type="text" size="medium" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      cacheItems: []
    };
  },
  methods: {
    handleEdit(row) {
      this.$set(row, "editable", true);
      this.cacheItems = [].concat(JSON.parse(JSON.stringify(this.items)));
    },
    async handleSave(row) {
      const res = await this.$http.put(`rest/admin_users/${row._id}`, row);
      if (res) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      }
      row.editable = false;
      delete row.editable;
    },
    handleCancel(row, index) {
      Object.assign(row, this.cacheItems.filter((_, i) => i === index)[0]);
      row.editable = false;
      delete row.editable;
    },
    async fetch() {
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除'${row.username}'?`, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/admin_users/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetch();
  }
};
</script>