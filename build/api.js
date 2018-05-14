/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2018-01-02 09:40:21
 * @Feature: Global api interface configuration by npm script `-- params`
 */
const argv = require("yargs").argv;

let api = {
    pro: {
        BASEURL: "https://qyd.001bank.com/ebp/v1/api/"
    },
    dev: {
        // BASEURL: "http://192.168.188.193:8089/bcinfo/bcinfo/api/",
        BASEURL: "http://192.168.10.228:9090/bcinfo/bcinfo/api/"
    }
};

Object.keys(api).forEach(item => {
    Object.keys(api[item]).forEach(apis => {
        api[item][apis] = JSON.stringify(api[item][apis]);
    });
});

module.exports = argv.env ? api[argv.env] : api["dev"];