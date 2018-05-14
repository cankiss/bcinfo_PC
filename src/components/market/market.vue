<template>

  <div id="container">

    <mheader activeMenuName="market"></mheader>

    <div id="main">

      <div class="inner">

        <div id="marketList">

          <p class="caption">市场行情</p>

          <table class="dataList">
            <thead>
            <tr>
              <th>币种</th>
              <th colspan="2">最新成交价</th>
              <th colspan="2">买价</th>
              <th colspan="2">卖价</th>
              <th colspan="2">24H最低价</th>
              <th colspan="2">24H最高价</th>
              <th>24H交易量</th>
              <th>趋势</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in dataList" :key="i" :title="`${item.species}（${item.symbol}）`" @click="clickItem(item)">
              <td><img :src="item.iconUrl" width="32" height="32">{{item.species}}</td>
              <td :class="{down: item.closeFlg == '0', up: item.closeFlg == '2'}">￥{{item.closeCny}}</td>
              <td :class="{down: item.closeFlg == '0', up: item.closeFlg == '2'}">${{item.close}}</td>
              <td :class="{down: item.bidFlg == '0', up: item.bidFlg == '2'}">￥{{item.bidCny}}</td>
              <td :class="{down: item.bidFlg == '0', up: item.bidFlg == '2'}">${{item.bid}}</td>
              <td :class="{down: item.askFlg == '0', up: item.askFlg == '2'}">￥{{item.askCny}}</td>
              <td :class="{down: item.askFlg == '0', up: item.askFlg == '2'}">${{item.ask}}</td>
              <td>￥{{item.lowCny}}</td>
              <td>${{item.low}}</td>
              <td>￥{{item.highCny}}</td>
              <td>${{item.high}}</td>
              <td>{{item.amount}}万</td>
              <td v-html="getUpDownHtml(item.degree)"></td>
            </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>

    <mfooter></mfooter>

  </div>

</template>

<script>

  import mheader from '~/common/mheader.vue';
  import mfooter from '~/common/mfooter.vue';
  import {Message, MessageBox} from 'element-ui';
  import qs from 'qs';

  export default {
    components: {mheader, mfooter, Message, MessageBox},
    data() {
      return {
        pageTitle: '行情',
        dataList: {},
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {

      let _this = this;

      _this.getDataList();

      /*setInterval(function () {
        _this.getDataList();
      }, 10000);*/

    },
    methods: {

      getDataList() {

        this.$post('market/getAllMarketInfo').then(res => {
          if (res.model && res.model.length > 0) {

            this.dataList = res.model;

            //Message.success('数据加载成功，每10稍刷新一次');

          } else {
            Message(res.msg);
          }
        });

      },

      clickItem(item) {

        let chartsParams = {
//          "symbol": "NASDAQ:AAPL",
          "symbol": item.symbol.replace('usdt', '').toUpperCase(),
          "interval": "1",
          "symboledit": "1",
          "saveimage": "1",
          "toolbarbg": "f1f3f6",
          "studies": "[]",
          "hideideas": "1",
          "theme": "Light",
          "style": "3",
          "timezone": "Asia/Shanghai",
          "studies_overrides": "{}",
          "overrides": "{}",
          "enabled_features": "[]",
          "disabled_features": "[]",
          "locale": "zh_CN",
          "utm_source": "www.hesyhome.com",
          "utm_medium": "widget",
          "utm_campaign": "chart",
          "utm_term": "NASDAQ:AAPL",
//          "hidetoptoolbar": 1,
          "symboledit": 0,
        };

        let iframeUrl = 'https://s.tradingview.com/widgetembed/?' + qs.stringify(chartsParams);

        let html = `<img src="${item.iconUrl}" width="20" height="20" style="position: absolute; left: 15px; top: -30px;"><div style="height: 410px;"><iframe src="${iframeUrl}" id="chartsIframe" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="width: 100%; height: 100%;"></iframe></div>`;

        let _this = this;

        MessageBox.alert(html, `${item.species}`, {
          dangerouslyUseHTMLString: true,
          customClass: 'msgbox',
          confirmButtonText: '查看详情',
          closeOnClickModal: true,
          closeOnPressEscape: true,
          callback: function (action, instance) {
            (action == 'confirm') && ( _this.$router.push(`/market/${item.symbol}`));
          },
        });

      },

      getUpDownHtml(value) {

        value = parseFloat(value);

        if (value > 0) {

          return '<img src="' + require('@/assets/images/market/icon-qushi-up.png') + '" width="60" height="50">';
        }

        if (value < 0) {
          return '<img src="' + require('@/assets/images/market/icon-qushi-down.png') + '" width="60" height="50">';
        }

        return '<img src="' + require('@/assets/images/market/icon-qushi-ping.png') + '" width="60" height="50">';

      }
    }
  }

</script>

<style lang="less" scoped>

  #main {
    padding: 20px 0 40px;
    background-color: #fafbfd;
  }

  #main > .inner {
    width: 1130px;
    padding: 30px 30px 40px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(231, 231, 231, 0.50);
  }

  #marketList {

  }

  #marketList .caption {
    margin-bottom: 20px;
    font-size: 30px;
    color: #000;
    text-align: center;
  }

  #marketList .dataList {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  #marketList .dataList thead tr {
    background-color: #1E50BB;
  }

  #marketList .dataList tbody tr {
    cursor: pointer;
  }

  #marketList .dataList tbody tr:nth-child(odd) {
    background-color: #fff;
  }

  #marketList .dataList tbody tr:nth-child(even) {
    background-color: #F8FBFF;
  }

  #marketList .dataList thead th,
  #marketList .dataList tbody td {
    margin: 0;
    padding: 0 5px;
    text-align: left;
  }

  #marketList .dataList thead th {
    font-size: 14px;
    color: #fff;
    font-weight: normal;
    text-align: center;
    height: 40px;
  }

  #marketList .dataList thead th:first-child {
    width: 130px;
    padding-left: 25px;
    text-align: left;
  }

  #marketList .dataList thead th:last-child {
    width: 85px;
  }

  #marketList .dataList tbody td {
    font-size: 12px;
    color: #000;
    height: 60px;
    border-left: 1px solid #F2F2F2;
    border-bottom: 1px solid #F2F2F2;
  }

  #marketList .dataList tbody td:first-child {
    position: relative;
    padding-left: 67px;
    font-size: 14px;
    border-left: 0;
  }

  #marketList .dataList tbody td:first-child img {
    position: absolute;
    top: 50%;
    left: 25px;
    width: 32px;
    height: 32px;
    margin-top: -16px;
  }

  #marketList .dataList tbody td:last-child {
    text-align: center;
    vertical-align: middle;
  }

  #marketList .dataList tbody td:last-child img {
    vertical-align: middle;
  }

  #marketList .dataList tbody td.up {
    background: url("../../assets/images/market/data-up-10x10.svg") no-repeat 98% center #fff7f2;
    background-size: 10px 10px;
  }

  #marketList .dataList tbody td.down {
    background: url("../../assets/images/market/data-down-10x10.svg") no-repeat 98% center #f5fff4;
    background-size: 10px 10px;
  }

</style>

<style lang="less">

  .msgbox {
    width: 1150px;
    margin-right: 17px;
  }

  .msgbox .el-message-box__header .el-message-box__title {
    padding-left: 30px;
  }

</style>

