<template>
  <div class="container">
    <div style="margin-top: 5px">
      <el-input v-model="searchForm.Query" class="input-with-select" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" plain type="primary" @click="doSearch" />
      </el-input>
      <div class="advancedFilter">
        <span>高级搜索</span>
        <span>表单搜索</span>
      </div>
    </div>
    <el-tabs style="margin-top: 10px" type="border-card">
      <el-tab-pane>
        <span slot="label">搜索列表</span>
        <div class="d-flex flex-row filters">
          <span class="filter-active">概况</span>
          <span>按时间</span>
          <span>按产业分类</span>
          <span>按机构</span>
          <span>按发明人</span>
          <span>法律状态</span>
        </div>
        <search-list ref="search" :query="searchForm" />
      </el-tab-pane>
      <el-tab-pane label="搜索分析">
        <table-analysis />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import tableAnalysis from '@/views/users/search/components/tableAnalysis'
import SearchList from '@/views/users/components/SearchList'

export default {
  components: { tableAnalysis, SearchList },
  data() {
    return {
      searchForm: {
        Query: ''
      },
      searchLoading: false
    }
  },
  mounted() {
    const { q } = this.$route.query
    if (q) {
      this.searchForm.Query = q
      this.doSearch()
    }
  },
  methods: {
    doSearch() {
      this.$refs.search.search()
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0 15px;
}

.filters {
  font-size: 0.8rem;
  padding: 0 10px;
  margin-bottom: 5px;
}

.filters span {
  margin-right: 10px;
  color: gray;
  transition: 0.3s;

}

.filters span:hover {
  cursor: pointer;
  color: #00a9ed !important;
}

.filter-active {
  color: #00a9ed !important;
}

.advancedFilter {
  font-size: 13px;
  margin: 5px 0;
  color: gray;
}

.advancedFilter span {
  margin-right: 10px;
}
</style>
