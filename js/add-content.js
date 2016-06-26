/**
 * Created by gooin on 2016/6/26.
 */
var today = new Date();
var hourNow = today.getHours();
var hello;
if (hourNow > 18) {
    hello = '晚上好~';
} else if (hourNow > 12) {
    hello = '中午好';
} else if (hourNow > 0) {
    hello = '早上好';
} else {
    hello = '欢迎';
}
document.write('<h4 class="hello">'+"现在是"+hourNow+"点,"+hello+'</h4>');
