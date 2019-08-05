<template>
  <div>
    <el-container>
      <h2>项目积分表</h2>
      <el-header>
        <div>
          项目：<el-input clearable style="width: 200px;" size="mini" @keyup.enter.native="search" v-model="searchParams.label"></el-input>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="success" size="mini" icon="el-icon-plus" @click="showAddView()">添加</el-button>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-table :data="integrals" v-loading="tableLoading" size="mini" border @sort-change="tableSortChange" :default-sort="{prop: 'value', order: 'descending'}">
            <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
            <el-table-column align="center" width="500px" prop="label" label="项目" sortable="custom"></el-table-column>
            <el-table-column align="center" width="200px" prop="value" label="积分" sortable="custom"></el-table-column>
            <el-table-column align="center" width="1000px" prop="remark" label="备注"></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showEditView(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <div style="justify-content:space-between;">
            <el-pagination background :page-sizes="sizes" :page-size="searchParams.pageSize" @size-change="sizeChange" :current-page="searchParams.pageNum"
              @current-change="currentChange" layout="sizes, prev, pager, next, jumper, ->, total" :total="total" style="text-align:center"></el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <!-- <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="dialogVisible" :before-close="closeDialog" width="50%" center>
      <el-form :model="integral" ref="saveForm">
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="项目" label-width="120px">
              <el-input v-model="integral.label" size="mini" placeholder="请输入项目"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="积分"  label-width="120px">
              <el-input type="number" v-model="integral.value" size="mini" placeholder="请输入积分"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="备注" label-width="120px">
              <el-input v-model="integral.remark" type="textarea" rows="5" size="mini" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="save('saveForm')">保存</el-button>
        <el-button size="mini" @click="cancelEdit">取消</el-button>
      </span>
    </el-dialog> -->
    <integralEditor :dialogTitle="dialogTitle" :dialogVisible="dialogVisible" :integral="integral" v-on:closeDialog="closeDialog"></integralEditor>
  </div>
</template>

<script>
import integralEditor from '@/components/IntegralEditor'

export default {
  components: {
    integralEditor
  },
  data () {
    return {
      dialogTitle: '',
      dialogVisible: false,
      integral: {
        id: '',
        label: '',
        value: '',
        remark: ''
      },
      integrals: [],
      searchParams: {
        label: '',
        orderBy: '',
        pageNum: 1,
        pageSize: 20,
        value: ''
      },
      sizes: [20, 50, 100],
      tableLoading: false,
      total: 1
    }
  },
  methods: {
    closeDialog () {
      this.dialogVisible = false
      this.emptyData()
      this.load()
    },
    currentChange (currentChange) {
      this.searchParams.pageNum = currentChange
      this.load()
    },
    del (row) {
      this.$confirm('此操作将永久删除[' + row.label + ']，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/integral/' + row.id).then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            this.load()
          }
        })
      }).catch(() => {
      })
    },
    emptyData () {
      this.integral = {
        id: '',
        label: '',
        value: '',
        remark: ''
      }
    },
    load () {
      var _this = this
      this.getRequest('/integral', _this.searchParams).then(resp => {
        _this.tableLoading = false
        _this.total = resp.data.total
        _this.integrals = resp.data.data
      })
    },
    search () {
      this.searchParams.pageNum = 1
      this.load()
    },
    sizeChange (sizeChange) {
      this.searchParams.pageSize = sizeChange
      this.load()
    },
    showAddView () {
      this.dialogTitle = '添加'
      this.dialogVisible = true
    },
    showEditView (row) {
      var _this = this
      this.tableLoading = true
      this.getRequest('/integral/' + row.id).then(resp => {
        _this.integral = resp.data.data
      })
      this.tableLoading = false
      this.dialogTitle = '编辑'
      this.dialogVisible = true
    },
    tableSortChange (column) {
      if (column.order === 'descending') {
        this.searchParams.orderBy = column.prop + ' DESC'
      } else {
        this.searchParams.orderBy = column.prop + ' ASC'
      }
      this.load()
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>
</style>
