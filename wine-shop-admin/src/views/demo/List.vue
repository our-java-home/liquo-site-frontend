<template>
  <div class="table-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="number" min="0" v-model="searchForm.age" placeholder="年龄" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tags" style="margin-bottom: 10px">
      <el-checkbox v-model="isShowId">序号</el-checkbox>
      <el-checkbox v-model="isShowSel">多选</el-checkbox>
    </div>
    <el-table id="table" ref="table" :data="tableData" :border="true" size="mini" :row-class-name="tableRowClassName"
      header-row-class-name="headerRow" highlight-current-row empty-text="没数据" show-summary sum-text="合计"
      :summary-method="summaryFn" :span-method="spanFn" max-height="600" @selection-change="toggleRowSel">
      <!-- 多项列 -->
      <el-table-column v-if="isShowId" type="index" align="center" fixed="left" />
      <el-table-column v-if="isShowSel" type="selection" width="55" align="center" :selectable="setSelDisabled"
        fixed="left">
      </el-table-column>
      <template v-for="(item, index) in titleData">
        <!-- 标签列 -->
        <el-table-column v-if="item.key == 'tag'" :prop="item.key" :label="item.title" width="100" align="center"
          :filters="[
            { text: 'A', value: 'A' },
            { text: 'B', value: 'B' },
          ]" :filter-method="filterTag" filter-placement="bottom-end">
          <template v-slot="scope">
            <el-tag :type="scope.row.tag === 'A' ? 'primary' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <!-- 日期列 -->
        <el-table-column v-else-if="item.key == 'date'" :prop="item.key" :label="item.title" :key="index" align="center"
          sortable width="200">
          <template v-slot="scope">
            <i class="el-icon-timer"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <!-- 普通列 -->
        <el-table-column v-else-if="item.key != 'action'" :prop="item.key" :label="item.title" :key="item.id"
          align="center" sortable width="200">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column v-else :prop="item.key" :label="item.title" :key="index + ''" align="center" width="180"
          fixed="right">
          <!-- 自定义表头内容 -->
          <template v-slot:header> 自定义列内容 </template>
          <!-- 自定义列内容 -->
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
      <!-- 表格最后一行的内容 -->
      <template v-slot:append>
        <div style="width: 100%; text-align: center; padding: 10px">
          已经到底啦!
        </div>
      </template>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="success" plain @click="handleCancelSel">取消选择</el-button>
      <el-button type="danger" plain @click="handleDeleteSel">批量删除</el-button>
      <el-button type="info" plain @click="handleExport">批量导出</el-button>
    </div>
  </div>
</template>

<script>
import tableData from '@/data/table';
export default {
  name: 'demoList',
  data() {
    return {
      isShowId: true,
      isShowSel: true,
      tableData,
      titleData: [
        {
          title: '姓名',
          key: 'name',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '地址',
          key: 'address',
        },
        {
          title: '日期',
          key: 'date',
        },
        {
          title: '标签',
          key: 'tag',
        },
        {
          title: '操作',
          key: 'action',
        },
      ],
      searchForm: {
        id: '',
        name: '',
        age: '',
        date: '',
      },
    };
  },

  mounted() { },

  methods: {
    search() {
      const values = this.searchForm;
      this.tableData = tableData.filter((item) => {
        const name = !values.name || values.name == item.name;
        const age = !values.age || values.age == item.age;
        return name && age;
      });
    },
    // 行样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'warning-row';
      } else if (rowIndex === 1) {
        return 'success-row';
      }
      return '';
    },
    toggleRowSel(row) {
      const ids = row.map((item) => item.id);
      const rows = document.querySelectorAll('.el-table__row');
      rows.forEach((item, index) => {
        if (ids.includes(index)) {
          item.classList.add('selected-row');
        } else {
          item.classList.remove('selected-row');
        }
      });
    },
    // 多选禁用
    setSelDisabled(row, index) {
      if (index % 4 === 0) {
        return false;
      }
      return true;
    },
    // 合计
    summaryFn({ columns, data }) {
      return columns.map((column, index) => {
        if (index === 0) {
          return '合计';
        }
        if (column.label == '年龄') {
          const sum = data
            .map((item) => item.age)
            .reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          return sum;
        }
        return '——';
      });
    },
    // 合并单元格
    spanFn({ row, column, rowIndex, columnIndex }) { },
    // 删除
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    // 取消选择
    handleCancelSel() {
      this.$refs.table.clearSelection();
    },
    // 批量删除
    handleDeleteSel() {
      const ids = this.$refs.table.selection.map((item) => item.id);
      this.tableData = this.tableData.filter((item) => !ids.includes(item.id));
    },
    // 标签筛选
    filterTag(value, row) {
      return row.tag === value;
    },
  },

  watch: {
    // 监听tableData变化
    tableData: {
      deep: true,
      handler(val) {
        val.forEach((item, index) => {
          if (index != item.id) {
            item.id = index;
          }
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.el-table .headerRow) {
  .el-table__cell {
    background: none;
  }

  background: #94d8e9;
  font-weight: bold;
  font-size: 14px;
}

::v-deep(.el-table) {
  .warning-row {
    background: rgb(247, 188, 188);
  }

  .success-row {
    background: rgb(195, 240, 195);
  }

  .selected-row {
    background: #8e91e5 !important;
  }
}
</style>
