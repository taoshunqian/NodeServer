const net = require('net');
const fs = require('fs');
const buf = new Buffer.from([126, 143, 6, 0, 13, 4, 88, 36,
    83, 78, 65, 80, 83, 72, 79, 84, 44, 51, 44, 53, 246, 126]);
// console.warn(buf)

var buf2;
var arr = [];
var num = 0;
const client = net.createConnection({ port: 8640, host: "192.168.20.55" }, () => {
    client.write(buf);
});

var dis = 1;
var maxPack = 1;

client.on('data', (data) => {
    arr.push(...data)
    console.warn(data)
    num++;
    if(maxPack != 1) {
        console.log(maxPack);
    } else {
        maxPack = arr.slice(8,9)[0];
    }
});

function encode7e() {
    
}



client.on('end', () => {
    console.log('disconnected from server');
});

client.on('error', () => {
    console.log('error');
});

function hexBuf(buf) {

    var arr2 = [];
    var arr3 = [];
    var num2 = 0;
    buf = Buffer.concat([buf,new Buffer.from([0])]);

    for (var i = 0; i < buf.length; i++) {
        if (num2 % 2 == 0 && num2 != 0) {
            arr2.push(arr3);
            arr3 = [];
        }
        if (buf[i] == 126) {
            num2++;
            
        }
        arr3.push(buf[i]);
    }

    // console.log(arr2.length)
    
    console.log(arr2[0].slice(0,20))
    console.log(arr2[0].slice(arr2[0].length - 20))

    console.log(arr2[1].slice(0,20))
    console.log(arr2[1].slice(arr2[1].length - 20))
    
    var packageBuf1 = arr2[0].slice(11,arr2[0].length - 2);
    var packageBuf2 = arr2[1].slice(11,arr2[1].length - 3);

    // console.log(arr2[1].slice(arr2[1].length - 10));
    
    // console.log(packageBuf1.length);
    // console.log(packageBuf2[packageBuf2.length - 1])


    // packageBuf2.pop();
    packageBuf1.push(...packageBuf2);

    console.log(new Buffer.from(packageBuf1.slice(0,10)));
    console.log(new Buffer.from(packageBuf1.slice(packageBuf1.length- 10)));

    var totalPackage = new Buffer.from(packageBuf1,'utf-8');

    console.log(totalPackage.length);
    // console.warn(totalPackage.slice(0, 20));
    // console.warn(totalPackage.slice(totalPackage.length - 20));
    console.log(Buffer.isBuffer(totalPackage))

    var base64Img ="data:image/jpg;base64," + totalPackage.toString('base64');
    // console.log(base64Img);
    var decodeImg = new Buffer.from(base64Img, 'base64');
    fs.writeFile('./avatar2.jpg', decodeImg, function(err) {
        if(err) {console.log(err)}
    });
}