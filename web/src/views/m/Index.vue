<script>
import * as echarts from "echarts";
import {coinList, coinRateList} from "@/api/coin.js";

export default {
    data() {
        return {
            coins: [],
            name: 'BTC',
        };
    },
    mounted() {
        this.getCoinList()
    },
    methods: {
        getCoinList() {
            coinList().then((res) => {
                if (res.code === 200) {
                    this.coins = res.data
                    this.getCoinRateList()
                }
            })
        },
        getCoinRateList() {
            let ecObj = document.getElementById("chart1");
            ecObj.removeAttribute('_echarts_instance_');

            let myChart = echarts.init(ecObj);

            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: []
                },
                yAxis: {
                    show: false
                },
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
                    option.xAxis.data = res.data.map(item => item.date.split(" ")[1])
                    option.series[0].data = res.data.map(item => item.rate);
                }
                myChart.setOption(option);
            })

            myChart.setOption(option);
        }
    }
};
</script>

<template>
    <div class="user-panel">
        <el-card>
            <div class="card-header">
                <van-image
                    width="3rem"
                    height="3rem"
                    round
                    fit="cover"
                    position="left"
                    :src="this.$store.state.user.avatar"
                />
                <span>Welcome,<el-text type="primary">{{ this.$store.state.user.username }}</el-text></span>
            </div>
        </el-card>
    </div>

    <div class="echart-container">
        <div class="echart-item">
            <div class="title">
                <div class="left">
                    CryptoCurrency
                </div>
                <div class="right">
                    <el-select v-model="name" @change="getCoinRateList" placeholder="Select Currency"
                               style="width: 200px">
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
            <div class="echart-canvas" id="chart1">

            </div>
        </div>
    </div>
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
    flex-wrap: wrap;
}

.echart-item {
    width: 98%;
    height: 400px;
    background-color: #ffffff;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 96%;
    margin: 20px auto auto;
    font-size: 16px;
    font-weight: 600;
}

.fix-hover {
    cursor: pointer;
}

.title > .left {
    text-align: left;
    text-indent: 10px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
}

.title > .right {
    width: 250px;
    display: flex;
    justify-content: space-evenly;
    font-size: 18px;
    font-weight: 600;
}

.hr {
    border: 1px solid #f1efef;
    margin: 10px;
}

.echart-canvas {
    width: 96%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-panel {
    margin: 10px auto;
    width: 96%;
}

.card-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
}

</style>