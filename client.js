/* globals io */
var socket = io.connect();

socket.on('connect', function () {
  console.log('connected!');
});

var cursors = [];

socket.on('cursor', function (data) {
  var cursor = cursors[data.id];

  if (!cursor) {
    var cursorObject = document.createElement('div');
    cursorObject.className = 'foreigncursor';

    // weee, thanks Paul Irish
    cursorObject.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    cursorObject.id = data.id;
    cursors[data.id] = cursorObject;
    document.body.appendChild(cursorObject);
  }

  cursors[data.id].style.top = data.y + 'px';
  cursors[data.id].style.left = data.x + 'px';
});

socket.on('deadcursor', function (data) {
  console.log("he's dead jim");
  var deadone = cursors[data];
  if (deadone) {
    document.body.removeChild(deadone);
  }
});

socket.on('disconnect', function () {});

document.addEventListener('mousemove', eekMouse);

function eekMouse (e) {
  var x = e.x ? e.x : e.clientX;
  var y = e.y ? e.y : e.clientY;

  document.getElementById('cursorX').value = x;
  document.getElementById('cursorY').value = y;
  socket.emit('coord', {
    x: x,
    y: y
  });
}
