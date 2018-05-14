<template>

  <div id="container">

    <mheader activeMenuName="market"></mheader>

    <div id="currencyIntro">
      <div class="inner clearfix">
        <div class="pic fl"><img :src="dataItem.iconUrl" width="80" height="80"></div>
        <div class="name fl">{{dataItem.species}}</div>
      </div>
    </div>

    <div id="main">

      <div class="inner">

        <div id="currencyDetail">

          <table class="dataView">
            <tbody>
            <tr>
              <th style="width: 140px;">开发者</th>
              <td style="width: 390px;">{{dataItem.developer}}</td>
              <th style="width: 125px;">核心算法</th>
              <td>{{dataItem.coreAlgorithm}}</td>
            </tr>
            <tr>
              <th>区块时间</th>
              <td>{{dataItem.blockTime}}</td>
              <th>发布时间</th>
              <td>{{dataItem.publishTime}}</td>
            </tr>
            <tr>
              <th>今日最高</th>
              <td>￥{{dataItem.highCny}}</td>
              <th>今日最低</th>
              <td>￥{{dataItem.lowCny}}</td>
            </tr>
            <tr>
              <th>24H成交量</th>
              <td>{{dataItem.amount}}万</td>
              <th>涨跌幅</th>
              <td v-html="getUpDownHtml(dataItem.degree)"></td>
            </tr>
            </tbody>
          </table>

          <div class="dataCharts">
            <iframe :src="chartsIframeUrl" id="chartsIframe" frameborder="0" allowtransparency="true" scrolling="no"
                    allowfullscreen="" style="width: 100%; height: 100%;"></iframe>
          </div>

          <p class="dataCaption">币种介绍</p>

          <div class="dataContent" v-html="dataItem.content"></div>

        </div>

      </div>

    </div>

    <mfooter></mfooter>

  </div>

</template>

<script>

  import mheader from '~/common/mheader.vue';
  import mfooter from '~/common/mfooter.vue';
  import {Message} from 'element-ui';
  import qs from 'qs';

  export default {
    components: {mheader, mfooter, Message},
    data() {
      return {
        pageTitle: '',
        symbol: '',
        dataItem: {},
        chartsIframeUrl: '',
      }
    },
    metaInfo() {
      return {
        title: `${this.dataItem.species}`
      }
    },
    created() {
      this.symbol = this.$route.params.symbol;
      this.getDataItem();
    },
    methods: {

      getDataItem() {

        this.$post('market/getMarketInfo', {
          symbol: this.symbol
        }).then(res => {
          if (res.model) {

            this.dataItem = res.model;

            this.renderCharts();

          } else {

            Message(res.msg);

          }
        });

      },

      renderCharts() {
        console.log(this.dataItem.symbol.replace('usdt', '').toUpperCase())

        let chartsParams = {
//          "symbolol": "NASDAQ:AAPL",
          "symbolol": this.dataItem.symbol.replace('usdt', '').toUpperCase(),
          "interval": "1",
          "symbololedit": "1",
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
          "symbololedit": 0,
        };

        this.chartsIframeUrl = 'https://s.tradingview.com/widgetembed/?' + qs.stringify(chartsParams);

      },

      getUpDownHtml(value) {

        value = parseFloat(value);

        if (value > 0) {
          return '<span style="color: #F23030;">+' + value + '%</span>';
        }

        if (value < 0) {
          return '<span style="color: #309D00;">' + value + '%</span>';
        }

        return '<span>' + value + '%</span>';

      }
    }
  }

</script>

<style lang="less" scoped>

  #currencyIntro {
    background: url('../../assets/images/market/currencyIntroBG.jpg') repeat-x 0 0;
  }

  #currencyIntro .inner {
    height: 140px;
    padding: 30px 0;
  }

  #currencyIntro .pic {
    width: 80px;
    height: 80px;
    margin-top: 10px;
    margin-right: 25px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
  }

  #currencyIntro .pic img {
    display: block;
  }

  #currencyIntro .name {
    margin-top: 10px;
    font-size: 36px;
    color: #fff;
    line-height: 120px;
  }

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

  #currencyDetail {
  }

  #currencyDetail .dataView {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin-bottom: 60px;
  }

  #currencyDetail .dataView tbody tr th,
  #currencyDetail .dataView tbody tr td {
    margin: 0;
    padding: 0;
    height: 50px;
    vertical-align: middle;
  }

  #currencyDetail .dataView tbody tr th {
    font-size: 16px;
    font-weight: normal;
    color: #000;
    text-align: left;
  }

  #currencyDetail .dataView tbody tr td {
    font-size: 16px;
    color: #040404;
    text-align: left;
  }

  #currencyDetail .dataView tbody tr td.up {
    color: #F23030;
  }

  #currencyDetail .dataView tbody tr td.down {
    color: #309D00;
  }

  #currencyDetail .dataCharts {
    width: 100%;
    height: 410px;
  }

  #currencyDetail .dataCaption{
    font-size: 16px;
    color: #000;
    margin: 40px 0 15px;
  }

  #currencyDetail .dataContent{
    font-size: 14px;
    color: #000;
    line-height: 28px;
  }

</style>
