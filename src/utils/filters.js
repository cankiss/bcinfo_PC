let filter = {
    momentTime: value => {
        // let dataTime = new Date(value);
        // let year = dataTime.getFullYear();
        // let datamouth = dataTime.getMonth() + 1 >= 10 ? dataTime.getMonth() + 1 : "0" + (dataTime.getMonth() + 1);
        // let day = dataTime.getDate() >= 10 ? dataTime.getDate() : "0" + dataTime.getDate();
        // return year + "-" + datamouth + "-" + day;
        value = value + "";
        let index = value.lastIndexOf(":");
        value = value.substr(0,index);
        return value;
    },
    creatTime: value => {
        let dataTime = new Date(value);
        let year = dataTime.getFullYear();
        let datamouth = dataTime.getMonth() + 1 >= 10 ? dataTime.getMonth() + 1 : "0" + (dataTime.getMonth() + 1);
        let day = dataTime.getDate() >= 10 ? dataTime.getDate() : "0" + dataTime.getDate();
        let hour = dataTime.getHours() >= 10 ? dataTime.getHours() : "0" + dataTime.getHours();
        let fen = dataTime.getMinutes() >= 10 ? dataTime.getMinutes() : "0" + dataTime.getMinutes();
        let scent = dataTime.getSeconds() >= 10 ? dataTime.getSeconds() : "0" + dataTime.getSeconds();
        return year + "-" + datamouth + "-" + day + " " + hour + ":" + fen + ":" + scent;
    },
    numberFormat: value => {
        let number = value >= 10000 ?  value / 10000 + "万" :  parseInt(value).toLocaleString();
        return number;
    },
    //Author:wzc0x0@gmail.com
    nameHidden: value => !!value ? value.toString().replace(/(\S{1})\S*/, "$1**") : '',
    phoneHidden: value => !!value ? value.toString().replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : '',
    bankCodeHidden: value => !!value ? value.toString().split('').map((item, i) => (i >= 6 && i < value.length - 4) ? '*' : item).join('') : '',
    idCardHidden: value => !!value ? value.toString().split('').map((item, i) => (i >= 5 && i < value.length - 4) ? '*' : item).join('') : ''
};

export default filter