document.getElementById("input").addEventListener("change", function(event) {
    let file = event.target.files[0];
    
    if (file && file.type.startsWith("image/")) {
      console.log("File name and size", file.name, file.size);
    } else {
      console.log("This is not an image");
    }
  
    let img = new Image();
    img.src = URL.createObjectURL(file);
  
    img.onload = function() {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
  
      canvas.width = img.width;
      canvas.height = img.height;
  
      ctx.drawImage(img, 0, 0);
      console.log("Image drawn on canvas!");
  
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imgData.data;
  
      let asciiArt = '';
  
      const asciiChars = "@#8&$%*o!;:,. ";
  
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];     
        let g = data[i + 1]; 
        let b = data[i + 2]; 
        let a = data[i + 3]; 
  
        let brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        console.log("Brightness: ", brightness);
  
        let asciiChar = mapBrightnessToAscii(brightness);
  
        asciiArt += asciiChar;
  
      
        if ((i / 4 + 1) % canvas.width === 0) {
          asciiArt += '\n'; 
        }
      }
  
      document.getElementById("output").innerText = asciiArt;
  
      function mapBrightnessToAscii(brightness) {
        return asciiChars[Math.floor((brightness / 255) * (asciiChars.length - 1))];
      }
    };
  });
  