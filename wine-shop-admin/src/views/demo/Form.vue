<template>
  <div class="form-container">
    <el-form :model="formData" ref="formData" label-width="80px" size="mini">
      <el-form-item label="开关">
        <el-switch v-model="formData.switch" active-text="开" inactive-text="关" active-color="#444"
          inactive-color="#ccc"></el-switch>
      </el-form-item>
      <el-form-item label="输入框">
        <el-input style="width: 200px;" suffix-icon="el-icon-search" prefix-icon="el-icon-search"
          v-model="formData.input"></el-input><br>
        <el-input-number v-model="formData.num" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="单选">
        <el-radio-group v-model="formData.radio">
          <el-radio label="0">普通</el-radio>
          <el-radio label="1" border>带边框</el-radio>
          <el-radio label="2" border disabled>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单选">
        <el-radio-group v-model="formData.radio1" text-color="#fffdda" fill="#edafaa">
          <el-radio-button label="1">单项1</el-radio-button>
          <el-radio-button label="2">单项2</el-radio-button>
          <el-radio-button label="3">单项3</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="多选">
        <el-checkbox :indeterminate="formData.isIndeterminate" v-model="formData.checkAll"
          @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="formData.checkbox" @change="handleCheckedChange">
          <el-checkbox v-for="(item, index) in checkboxOptions" :key="index" :label="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="下拉">
        <el-select v-model="formData.select" placeholder="请选择" clearable>
          <el-option v-for="item in selOptions" :key="item" :label="item" :value="item" :disabled="item == 1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级联">
        <el-cascader v-model="formData.cascader" clearable :options="cascaderOptions" :show-all-levels="false"
          @change="handleChange"></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'demoForm',
  data() {
    return {
      checkboxOptions: ['1', '2', '3', '4'],
      selOptions: ['1', '2', '3', '4'],
      cascaderOptions: [{
        value: '1',
        label: '1',
        children: [{
          value: '1-1',
          label: '1-1',
          children: [{
            value: '1-1-1',
            label: '1-1-1'
          }, {
            value: '1-1-2',
            label: '1-1-2'
          }]
        }, {
          value: '1-2',
          label: '1-2',
          children: [{
            value: '1-2-1',
            label: '1-2-1'
          }, {
            value: '1-2-2',
            label: '1-2-2'
          }]
        }]
      }, {
        value: '2',
        label: '2',
        children: [{
          value: '2-1',
          label: '2-1',
          children: [{
            value: '2-1-1',
            label: '2-1-1'
          }, {
            value: '2-1-2',
            label: '2-1-2'
          }]
        }, {
          value: '2-2',
          label: '2-2',
          children: [{
            value: '2-2-1',
            label: '2-2-1'
          }, {
            value: '2-2-2',
            label: '2-2-2'
          }]
        }]
      }],
      formData: {
        switch: false,
        input: '',
        num: '',
        radio: '1',
        radio1: '1',
        checkbox: [],
        checkAll: false,
        isIndeterminate: true,
        select: '',
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleCheckAllChange(val) {
      this.formData.checkbox = val ? this.checkboxOptions : [];
      this.formData.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.formData.checkAll = checkedCount === this.checkboxOptions.length;
      this.formData.isIndeterminate = checkedCount > 0 && checkedCount < this.checkboxOptions.length;
    }
  },
  mounted() { },
};
</script>

<style lang="scss" scoped></style>
