<template>
  <div class="reslutWrap">
    <p>查询条件</p>
    <!-- 查询条件 -->
    <div class="queryCond">
      <div class="loc">
        所在地：
        <el-cascader
          v-model="selectedOptions"
          size="large"
          :options="options"
          placeholder="请选择省/市/区(县)"
          @change="cityChange"
        />
        所在乡/镇：
        <el-input v-model="town" placeholder="请输入所在乡/镇" />
        所在村：
        <el-input v-model="village" placeholder="请输入所在村/社区" />
        所在组：
        <el-input v-model="vilNum" placeholder="请输入所在组" />
      </div>
      <div class="queryItem">
        户类型：
        <el-select v-model="huTypeValue" placeholder="请选择户类型">
          <el-option
            v-for="item in huType"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          />
        </el-select>
        申报途径：
        <el-select v-model="wayValue" placeholder="请选择申报途径">
          <el-option
            v-for="item in way"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          />
        </el-select>
        是否办结：
        <el-select v-model="isFinishValue" placeholder="请选择是否办结">
          <el-option
            v-for="item in isFinish"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          />
        </el-select>
        姓名：
        <el-input v-model="name" placeholder="请输入姓名" />
        身份证号：
        <el-input
          v-model="idCard"
          placeholder="请输入身份证号"
          :style="{ width: '180px' }"
        />
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <!-- 查询结果 -->
    <div class="queryResult">
      <div :style="{margin: '20px 0', fontSize: '18px'}">结果列表：</div>
      <el-table :data="queryData">
        <el-table-column prop="order" label="序号" width="50" />
        <el-table-column prop="loc" label="所在地" width="250" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="idCard" label="身份证号" width="180" />
        <el-table-column prop="tel" label="电话" width="120" />
        <el-table-column prop="huType" label="户类型" width="100" />
        <el-table-column prop="resTime" label="受理时间" width="100" />
        <el-table-column prop="pullTime" label="申报时间" width="100" />
        <el-table-column prop="way" label="申报途径" width="120" />
        <el-table-column prop="dealPeople" label="办理人" width="80" />
        <el-table-column prop="dealTel" label="办理人电话" width="120" />
        <el-table-column prop="isBack" label="是否纳入易返贫" width="120" />
        <el-table-column prop="isFinish" label="是否办结" width="80" />
        <el-table-column prop="finishTime" label="办结时间" width="100" />
      </el-table>
    </div>
    <!-- 导出文件 -->
    <div class="exportFile">
      <div class="top">
        <el-button type="primary">导出文件</el-button>
        <div class="pagination">
          <span
            >共 {{ queryData.length }} 条记录 第 {{ currentPage }} /
            {{ Math.ceil(queryData.length / pagesize) }} 页</span
          >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10]"
            :page-size="pagesize"
            layout="prev, pager, next"
            pager-count="5"
            background
            :total="queryData.length"
          >
          </el-pagination>
        </div>
      </div>

      <div class="dealInfo">
        <div>
          办理人：
          <el-input v-model="dealPeople" placeholder="请输入办理人" />
        </div>
        <div>
          办理人电话：
          <el-input v-model="dealTel" placeholder="请输入办理人电话" />
        </div>
        <div>
          是否纳入易返贫：
          <el-select v-model="isBackValue">
            <el-option
              v-for="item in isBack"
              :key="item.id"
              :label="item.type"
              :value="item.type"
            />
          </el-select>
        </div>
        <el-button type="primary">办结</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";

export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      town: "",
      village: "",
      vilNum: "",
      huType: [
        { id: 0, type: "脱贫不稳定户" },
        { id: 1, type: "边缘易返贫户" },
        { id: 2, type: "突发严重困难户" },
        { id: 3, type: "贫困户" },
      ],
      huTypeValue: "无",
      way: [
        { id: 0, type: "智防贫APP" },
        { id: 1, type: "教育部门" },
        { id: 2, type: "住建部门" },
        { id: 3, type: "其他" },
      ],
      wayValue: "无",
      isFinish: [
        { id: 0, type: "是" },
        { id: 1, type: "否" },
      ],
      isFinishValue: "",
      name: "",
      idCard: "",
      queryData: [
        {
          order: 1,
          loc: "重庆市南岸区重庆邮电大学",
          name: "张三冯",
          idCard: "500101199001020301",
          tel: "17638263846",
          huType: "贫困户",
          resTime: "2022-05-01",
          pullTime: "2020-05-01",
          way: "智防贫APP",
          dealPeople: "王五",
          dealTel: "17638263846",
          isBack: "是",
          isFinish: "是",
          finishTime: "2020-05-01",
        },
        {
          order: 2,
          loc: "重庆市南岸区重庆邮电大学",
          name: "张三冯",
          idCard: "500101199001020301",
          tel: "17638263846",
          huType: "贫困户",
          resTime: "2022-05-01",
          pullTime: "2020-05-01",
          way: "智防贫APP",
          dealPeople: "王五",
          dealTel: "17638263846",
          isBack: "是",
          isFinish: "是",
          finishTime: "2020-05-01",
        },
      ],
      dealPeople: "",
      dealTel: "",
      isBackValue: "无",
      isBack: [
        { id: 0, type: "是" },
        { id: 1, type: "否" },
      ],
      // 分页器具数据源
      currentPage: 1,
      pagesize: 5,
    };
  },

  methods: {
    cityChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      console.log(loc);
    },
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
  },
};
</script>

<style lang="scss" scoped>
.reslutWrap {
  padding: 10px;
  p {
    font-size: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .queryCond {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    .loc {
      display: flex;
      // flex-wrap: wrap;
      // justify-content: start;
      align-items: center;
      padding: 10px 0;
      .el-cascader {
        width: 230px;
        margin-right: 20px;
      }
      .el-input {
        width: 150px;
        margin-right: 20px;
      }
    }
    .queryItem {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .el-input {
        width: 150px;
        margin-right: 20px;
      }
      .el-select {
        width: 150px;
        margin-right: 20px;
      }
    }
  }
  .queryResult {
    width: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
      height: calc(100% + 20px); //多出来的20px是横向滚动条默认的样式
    }
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
      white-space: nowrap;
      display: inline-block;
    }
  }
  .exportFile {
    margin-top: 10px;
    .top {
      position: relative;
      .el-button {
        display: inline-block;
      }
      padding: 10px 0;
      .pagination {
        position: absolute;
        display: inline-flex;
        left: 50%;
        transform: translateX(-50%);
        justify-content: flex-end;
        margin-top: 10px;
        span {
          display: inline-flex;
          height: 32px;
          align-items: center;
        }
      }
    }

    .dealInfo {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      .el-input {
        width: 130px;
        margin-right: 10px;
      }
      .el-select {
        width: 80px;
        margin-right: 10px;
      }
    }
  }
}
</style>
