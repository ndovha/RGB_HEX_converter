//validation regex for HEX and RGB
const regHEX=/^#([0-9a-f]{3}){1,2}$/i;
const regRGB=/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

const colorHEX = document.querySelectorAll("input")[0];
const colorRGB = document.querySelectorAll("input")[1];
const container = document.getElementById('container');

//check input HEX value
colorHEX.addEventListener("input", (e) => {
    document.getElementById('hex').nextElementSibling.style.display = 'none';
    document.getElementById('hex').classList.remove("warning");
    let value = e.target.value;
    let isHex = regHEX.test(value);   
    if(!isHex) {
        document.getElementById('hex').classList.add("warning");
        document.getElementById('hex').nextElementSibling.style.display = 'block';
    } else {
        hexToRgb(value);
        container.style.backgroundColor = value;
    }    
});

//convert HEX to RGB
function hexToRgb(hex) {
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  console.log(hex)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let valueRGB = `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
  colorRGB.value = valueRGB;
}

//check input RGB value
colorRGB.addEventListener("input", (e) => {
    document.getElementById('rgb').nextElementSibling.style.display = 'none';
    document.getElementById('rgb').classList.remove("warning");
    let value = e.target.value;
    let isRgb = regRGB.test(value);
    if(!isRgb) {
        document.getElementById('rgb').classList.add("warning");
        document.getElementById('rgb').nextElementSibling.style.display = 'block';
    } else {
        RGBToHex(value);
        container.style.backgroundColor = value;
    }
});

//convert RGB to HEX
function RGBToHex(rgb) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
    colorHEX.value = "#" + r + g + b;
}




