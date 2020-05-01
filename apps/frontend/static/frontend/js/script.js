
var today = new Date();
var tomorrow = new Date();
var after_tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
after_tomorrow.setDate(today.getDate() + 2);
var link = "/orders/?is_sent=false&max_date_planed="
var today_link = link + today.toISOString().substring(0,10)
var tomorrow_link = link + tomorrow.toISOString().substring(0,10) + '&min_date_planed=' + tomorrow.toISOString().substring(0,10)
var after_tomorrow_link = link + after_tomorrow.toISOString().substring(0,10) + '&min_date_planed=' + after_tomorrow.toISOString().substring(0,10)
document.getElementById('today_link').href = today_link;
document.getElementById('tomorrow_link').href = tomorrow_link;
document.getElementById('after_tomorrow_link').href = after_tomorrow_link;