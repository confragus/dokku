var mns = document.getElementById('mns');
var scs = document.getElementById('scs');
var btcnt = document.getElementById('btnct');
var showmns = document.getElementById('showmns');
var showscs = document.getElementById('showscs');

var count = 0;

function pad2(n) {
    return n < 10 ? '0' + n : n;
}

function show() {
    var s = count % 60;
    var m = Math.floor(count / 60);
    showmns.innerHTML = pad2(m);
    showscs.innerHTML = pad2(s);
}

function timer() {
    show();
    if (count-- > 0) {
        setTimeout(timer, 1000);
    }
}

btcnt.addEventListener('click', function () {
    var s = parseInt(scs.value, 10);
    var m = parseInt(mns.value, 10);
    if (isNaN(s) || isNaN(m)) return;
    scs.value = s;
    mns.value = m;
 
    var current = count;
    count += (m * 60) + s;
    
    // only restart the counter loop if it was previously stopped
    if (current <= 0) {
        timer();
    } else {
        show();
    }
});