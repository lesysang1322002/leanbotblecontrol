var bleService = '0000ffe0-0000-1000-8000-00805f9b34fb';
var bleCharacteristic = '0000ffe1-0000-1000-8000-00805f9b34fb';
var gattCharacteristic;
var bluetoothDeviceDetected;
function isWebBluetoothEnabled() {
    if (!navigator.bluetooth) {
    console.log('Web Bluetooth API is not available in this browser!');
    // log('Web Bluetooth API is not available in this browser!');
    return false
    }

    return true
}
const button = document.getElementById("toggleButton");
function toggleFunction() {

    if (button.innerText == "Scan") {
        requestBluetoothDevice();
    } else {
        document.getElementById("buttonText").innerText = "Scan";
        disconnect();
        requestBluetoothDevice();
    }
}
function requestBluetoothDevice() {
    if(isWebBluetoothEnabled){
logstatus('Finding...');
navigator.bluetooth.requestDevice({
    filters: [{
        services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }] 
    })         
.then(device => {
    dev=device;
    logstatus("Connect to " + dev.name);
    console.log('Đang kết nối với', dev);
    return device.gatt.connect();
})
.then(server => {
        console.log('Getting GATT Service...');
        logstatus('Getting Service...');
        return server.getPrimaryService(bleService);
    })
    .then(service => {
        console.log('Getting GATT Characteristic...');
        logstatus('Geting Characteristic...');
        return service.getCharacteristic(bleCharacteristic);
    })
    .then(characteristic => {
        logstatus(dev.name);
        document.getElementById("buttonText").innerText = "Rescan";
    gattCharacteristic = characteristic
    // gattCharacteristic.addEventListener('characteristicvaluechanged', handleChangedValue)
    return gattCharacteristic.startNotifications()
})
.catch(error => {
    if (error instanceof DOMException && error.name === 'NotFoundError' && error.message === 'User cancelled the requestDevice() chooser.') {
    console.log("Người dùng đã hủy yêu cầu kết nối thiết bị.");
    logstatus("Scan to connect");
    } else {
    console.log("Không thể kết nối với thiết bị: " + error);
    logstatus("ERROR");
    }
    });
}}
function disconnect()
{
    logstatus("Scan to connect");
    console.log("Đã ngắt kết nối với: " + dev.name);
    return dev.gatt.disconnect();
}
function send(data)
{
    console.log("You -> " + data + "\n");
    gattCharacteristic.writeValue(str2ab(data+"\n"));
}
function str2ab(str)
{
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, l = str.length; i < l; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function  logstatus(text){
const navbarTitle = document.getElementById('navbarTitle');
navbarTitle.textContent = text;
}
function handleHover(action) {
    // Thực hiện hành động tương ứng với hover (ví dụ: gọi hàm Forward(), Backward(), ...)
    switch (action) {
        case 'Forward':
            Forward();
            break;
        case 'Backward':
            Backward();
            break;
        case 'Right':
            Right();
            break;
        case 'Left':
            Left();
            break;
        case 'Stop':
            Stop();
            break;
        case 'BackLeft':
            BackLeft();
            break;
        case 'BackRight':
            BackRight();
            break;
        case 'ForwardLeft':
            ForwardLeft();
            break;
        case 'ForwardRight':
            ForwardRight();
            break;
        // ... Các case khác ...
        default:
            break;
    }
}
function handleMouseOut() {
    // Xử lý khi chuột rời khỏi button
    Stop();
}
// Function hướng 
function Forward(){
    send("F");
}
function Backward(){
    send("B");
}
function Left(){
    send("L");
}
function Right(){
    send("R");
}
function Stop(){
    send("S");
}
function ForwardLeft(){
    send("G");
}
function ForwardRight(){
    send("I");
}
function BackLeft(){
    send("H");
}
function BackRight(){
    send("J");
}
document.addEventListener('DOMContentLoaded', function () {
    var infoButton = document.getElementById('infoButton');
    var infoContent = document.getElementById('infoContent');
  
    infoButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan sang các phần tử cha
        if (infoContent.style.display === 'block') {
            infoContent.style.display = 'none';
        } else {
            infoContent.style.display = 'block';
        }
    });
  
    document.addEventListener('click', function () {
        infoContent.style.display = 'none';
    });
});