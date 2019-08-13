<template>
  <el-select :value="value" multiple :size="size" @input="change($event)">
    <el-option v-for="item in employeeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      employeeOptions: []
    }
  },
  methods: {
    change (val) {
      this.$emit('input', val)
    },
    getEmployee () {
      this.getRequest('/employee').then(resp => {
        var employees = resp.data.data
        for (let i = 0; i < employees.length; i++) {
          const item = employees[i]
          this.employeeOptions.push({label: item.name, value: item.id})
        }
      })
    }
  },
  mounted () {
    this.getEmployee()
  },
  props: {
    size: {
      default: 'mini'
    },
    value: Array
  }
}
</script>

<style>
</style>
