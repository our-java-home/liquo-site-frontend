<!--
 * @Author: kongjingchao
 * @Date: 2023-05-23 17:24:44
 * @Last Modified by: kongjingchao
 * @Last Modified time: 2023-05-23 17:24:44
 * @Description: svg组件
-->
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    svgName: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.svgName}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
