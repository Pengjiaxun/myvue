/** 时间戳格式化方法
 * @param {any} timestamp 时间戳数字
 * @param {string} [type='unix'] 分为unix时间和js时间
 * @param {string} [format='yyyy-mm-dd hh:mm:ss'] 格式化形式
 * @returns 2017-03-03 15:00:00
 */
function formatDate(timestamp, format = 'yyyy-mm-dd hh:mm:ss', type = 'unix') {
    function fixZero(num, length) {
        let str = '' + num
        let len = str.length
        let s = ''
        for (let i = length; i-- > len;) {
            s += '0'
        }
        return s + str
    }

    function fixCDay(num) {
        let cDay = ''
        num === 0 ? cDay = '周日' : ''
        num === 1 ? cDay = '周一' : ''
        num === 2 ? cDay = '周二' : ''
        num === 3 ? cDay = '周三' : ''
        num === 4 ? cDay = '周四' : ''
        num === 5 ? cDay = '周五' : ''
        num === 6 ? cDay = '周六' : ''
        return cDay
    }
    let date
    type === 'unix' ? date = new Date(timestamp * 1000) : date = new Date(timestamp)
    let dateInfo = {
        fullYear: date.getFullYear(),
        month: fixZero(date.getMonth() + 1, 2),
        date: fixZero(date.getDate(), 2),
        hours: fixZero(date.getHours(), 2),
        minutes: fixZero(date.getMinutes(), 2),
        seconds: fixZero(date.getSeconds(), 2),
        cDay: fixCDay(date.getDay())
    }
    if (format === 'yyyy-mm-dd hh:mm:ss') {
        return dateInfo.fullYear + '-' + dateInfo.month + '-' + dateInfo.date + ' ' + dateInfo.hours + ':' + dateInfo.minutes + ':' + dateInfo.seconds
    } else if (format === 'mm-dd hh:mm') {
        return dateInfo.month + '-' + dateInfo.date + ' ' + dateInfo.hours + ':' + dateInfo.minutes
    } else if (format === 'mm.dd(cDay)') {
        return dateInfo.month + '.' + dateInfo.date + '(' + dateInfo.cDay + ')'
    } else if (format === 'yyyy-mm-dd') {
        return dateInfo.fullYear + '-' + dateInfo.month + '-' + dateInfo.date
    } else if (format === 'yyyy/mm/dd') {
        return dateInfo.fullYear + '/' + dateInfo.month + '/' + dateInfo.date
    }
}

/** 获取url中的参数
 * @param {any} url 
 * @returns 
 */
function getUrlParams(url) {
    var search = url ? (url.split('?')[1] || '') : window.location.search.substr(1)
    var paramArray = search.split('&')
    var paramObj = {}
    for (var i = 0; i < paramArray.length; i++) {
        // 将每个键值按 '=' 拆分
        var param = paramArray[i].split('=')
        // 参数值需要 decodeURI
        paramObj[param[0]] = decodeURI(param[1] || '')
        // 如果没有参数，返回空对象
        if (Object.keys(paramObj) === '') {
            paramObj = {}
        }
    }
    return paramObj
}

/** 设置当前页面背景高度为 100%
 * @param {any} className 组件内的顶层class
 */
function setFullBgHeight(className) {
    document.querySelector(className).style.height = window.innerHeight + 'px'
}

export default {
    // ch.setFullBgHeight('.index')
    setFullBgHeight: setFullBgHeight,
    // ch.formatDate(1400000000, 'unix', 'yyyy-mm-dd')
    formatDate: formatDate,
    // ch.verifyPwd(pwd)
    verifyPwd: verifyPwd,
    // ch.getUrlParams(url)
    getUrlParams: getUrlParams
}

/** 校验密码强度
 * @param {any} 字符串密码
 * @returns Number 大于2为强密码
 */
function verifyPwd(string) {
    let regexRules = [/.{6,}/, /[0-9]+/, /[a-z]+/, /[A-Z]+/, /[^0-9a-zA-Z]+/]
    let len = 0
    regexRules.forEach((item) => {
        if (item.test(string)) len++
    })
    return len
}