<script>
import * as echarts from "echarts";
import {coinList, coinRateList, coinRateRank} from "@/api/coin.js";
import {walletList, walletUpdate} from "@/api/wallet.js";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      coins: [],
      rank: [],
      name: 'BTC',
      walletDataList: [],
      chargeValue: 0,
      chargeForm: {},
      chargeVisiable: false
    };
  },
  setup() {
    // hidden
    const formatString = function (str) {
      if (str.length <= 8) {
        return str;
      }
      var prefix = str.substring(0, 4);
      var suffix = str.substring(str.length - 4);
      var middle = '...';
      return prefix + middle + suffix;
    }

    const compare = function (val1, val2) {
      console.log(val1, val2)
      if (val1 < val2) {
        return (val1 / val2) * 100 - 100;
      } else if (val1 > val2) {
        return (val1 / val2) * 100 - 100;
      } else {
        return 0;
      }
    }

    const geticon = function (val) {
      if (val < 0) {
        return 'ArrowDown';
      } else if (val > 0) {
        return 'ArrowUp';
      } else {
        return 'SemiSelect';
      }
    }

    return {
      formatString,
      compare,
      geticon
    }
  },
  mounted() {
    this.getCoinList()
    this.getCoinRateRankList()
  },
  methods: {
    showChargeBox(value) {
      this.chargeForm = value
      this.chargeVisiable = true
    },
    handleCharge() {
      this.chargeForm.balance = parseFloat(this.chargeValue) + parseFloat(this.chargeForm.balance)
      console.log(this.chargeForm)
      let params = {
        "id": this.chargeForm.id,
        "balance": this.chargeForm.balance,
        "user_id": this.chargeForm.user_id,
        "name": this.chargeForm.name,
        "hash_id": this.chargeForm.hash_id
      }
      walletUpdate(params).then((res) => {
        if (res.code === 200) {
          this.chargeValue = 0
          this.chargeVisiable = false
          ElMessage.success("Purchase success")
        } else {
          ElMessage.error("Purchase failed, please try again!")
        }
      })
    },
    getCoinList() {
      coinList().then((res) => {
        if (res.code === 200) {
          this.coins = res.data
          this.getCoinRateList()
          this.getWalletList()
        }
      })
    },
    getCoinRateRankList() {
      coinRateRank().then((res) => {
        if (res.code === 200) {
          this.rank = res.data
          this.rank.forEach(item => {
            item.cur_rate = item.rate.split(",")[0]
            item.pre_rate = item.rate.split(",")[1]
          })
        }
      })
    },
    // handleAddWallet
    handleAddWallet() {
      this.$router.push({name: "CreateWallet"})
    },

    async getWalletList() {
      let user = localStorage.getItem("user");
      if (!user) {
        return
      }
      let userinfo = JSON.parse(user);
      const res = await walletList({"user_id": userinfo.id, "page": 1, "page_size": 100});
      if (res.code === 200) {
        // order by total money
        let data = res.data.list
        for (const item of data) {
          item.last_rate = await this.getLastRate(item)
          item.total_money = item.balance * this.coins.find(row => row.id === item.coin_id).rate
        }
        data.sort((a, b) => b.total_money - a.total_money)
        this.walletDataList = data.slice(0, 3)
      } else {
        console.log("Get user wallet list failed, please try again!");
      }
    },

    getCoinRateList() {
      let ecObj = document.getElementById("chart1");
      ecObj.removeAttribute('_echarts_instance_');

      let myChart = echarts.init(ecObj);

      let option = {
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: 'Exchange Rate (USD)',
            type: 'line',
            data: []
          }
        ]
      };

      coinRateList({name: this.name}).then((res) => {
        if (res.code === 200) {
          let data = res.data.slice(-10)
          option.xAxis.data = data.map(item => item.date)
          option.series[0].data = data.map(item => item.rate);
        }
        myChart.setOption(option);
      })

      // myChart.setOption(option);
    },
    async getLastRate(item) {
      let coin = this.coins.find(row => row.id === item.coin_id);
      let rate = coin.rate;
      let name = coin.name;

      const res = await coinRateList({"name": name});
      if (res.code === 200) {
        // console.log(res.data);
        // console.log(rate, "-", res.data[res.data.length - 2].rate)
        console.log(rate - res.data[res.data.length - 2].rate)
        return (rate - res.data[res.data.length - 2].rate) * item.balance;
      }
    }
  }
};
</script>

<template>
  <div class="echart-container">
    <div class="echart-item-left">
      <div class="title">
        <div class="left">
          CryptoCurrency
        </div>
        <div class="right">
          <el-select v-model="name" @change="getCoinRateList" placeholder="Select Currency" filterable
                     clearable style="width: 240px">
            <el-option
                v-for="item in coins"
                :key="item.name"
                :label="item.name + ' - ' + item.rate + '(USD)'"
                :value="item.name"
            />
          </el-select>
        </div>
      </div>
      <hr class="hr">
      <div class="echart-canvas" id="chart1"></div>
    </div>

    <div class="echart-item-right">
      <div class="echart-item-right-row">The Five Most Popular Cryptocurrencies</div>
      <div class="echart-item-right-row" v-for="item in rank">
        <div class="currency">
          {{ item.name }}
        </div>
        <div class="rate">
          ${{ item.cur_rate }}
        </div>
        <div class="updown">
          <div
              :class="item.cur_rate > item.pre_rate ? 'up' : 'down'">
            <el-icon>
              <component :is="geticon(compare(item.cur_rate, item.pre_rate))"></component>
            </el-icon>
            {{ (compare(item.cur_rate, item.pre_rate)).toFixed(2) }}%
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="wallet-container" v-if="this.$store.state.user.role === 1">
    <el-card v-if="walletDataList.length===0" class="wallet-item add-wallet" @click="handleAddWallet">
      <div>
        <el-icon color="#b9b3b3" :size="30">
          <Plus/>
        </el-icon>
      </div>
      <div class="add-desc">
        Add Wallet
      </div>
    </el-card>

    <template v-if="walletDataList.length>0">
      <el-card class="wallet-item" :style="{backgroundColor: 'rgb(73 78 86)'}"
               v-for="item in walletDataList">
        <template #header>
          <div class="card-header">
            <div class="wallet-name-avatar">
              <div class="avatar">
                <el-avatar :size="50">
                  {{ coins.find(row => row.id === item.coin_id).name }}
                </el-avatar>
              </div>
              <div class="wallet-name-balance">
                <div class="wallet-name">{{ item.name }}</div>
                <div class="balance">{{ item.balance }} {{
                    coins.find(row => row.id === item.coin_id).name
                  }}
                </div>
              </div>
            </div>

            <div class="wallet-address">
              <div :class="item.last_rate >0?'top':'bottom'">
                ({{ item.last_rate > 0 ? '+' : '' }} {{ item.last_rate.toFixed(2) }})
              </div>
              <div class="second">
                ${{ (item.balance * coins.find(row => row.id === item.coin_id).rate).toFixed(2) }}
                <el-icon @click="showChargeBox(item)">
                  <Coin/>
                </el-icon>
              </div>
            </div>
          </div>
        </template>
        <p class="card-text">
          {{ item.description }}
        </p>
      </el-card>
    </template>
  </div>

  <el-dialog title="Purchase" v-model="chargeVisiable" width="25%">
    <el-form :model="chargeForm" label-width="70px" ref="chargeFormRef">
      <el-form-item label="Amount" prop="balance">
        <el-input v-model="chargeValue" placeholder="Purchase amount"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleCharge">Confirm</el-button>
      <el-button @click="chargeVisiable = false">Cancel</el-button>
    </template>
  </el-dialog>
</template>


<style scoped>
.el-main {
  padding: unset !important;
}

.echart-container {
  width: 98%;
  height: auto;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: row;
}

.wallet-container {
  width: 98%;
  height: auto;
  margin: 10px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;

}

.wallet-item {
  width: 400px;
  height: 200px;
  background-color: #ffffff;
  color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.currency {
  width: 20%;
  text-align: left;
}

.rate {
  width: 45%;
  text-align: left;
}

.updown {
  width: 35%;
  text-align: left;
}

.wallet-name-avatar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.wallet-address {
  display: flex;
  justify-content: flex-end;
  /* align-items: center; */
  flex-direction: column;
  width: 140px;
  gap: 5px;
}

.add-wallet {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px 0;
}

.echart-item-left {
  width: 70%;
  height: 500px;
  background-color: #ffffff;
}

.echart-item-right {
  width: 30%;
  height: 500px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.echart-item-right-row {
  margin: 20px auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  gap: 10px;
  border-bottom: 1px solid #f1efef;
}

.up {
  color: #35bd17;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;

}

.el-icon {
  margin-right: 5px;
}

.down {
  color: orangered;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

.top{
  color: #35bd17;
}

.bottom{
  color: orangered;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  margin: 20px auto auto;
  font-size: 18px;
  font-weight: 600;
}

.title > .left {
  text-align: left;
  text-indent: 10px;
  font-size: 18px;
  height: 30px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
}

.title > .right {
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  font-size: 18px;
  height: 30px;
  font-weight: 600;
}

.hr {
  border: 1px solid #f1efef;
  margin: 10px;
}

.echart-canvas {
  width: 100%;
  height: 400px;
}
</style>