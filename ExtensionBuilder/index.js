document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("color1").addEventListener("change", function() {
        if (document.getElementById("color1").value) {
        updateSVGColors()
          const transformedColor = transformColor(document.getElementById("color1").value);
          document.getElementById("color2").value = transformedColor;
          document.getElementById("color3").value = transformedColor;
        }
    });

    document.getElementById("generateTemplate").addEventListener("click", function() {
        const templateName = document.getElementById("templateName").value;
        const templateNameClass = templateName.replace(/[^a-zA-Z0-9]/g, '');
        const templateNameId = templateName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        const color1 = document.getElementById("color1").value;
        const color2 = document.getElementById("color2").value;
        const color3 = document.getElementById("color3").value;

        const defaultColors = document.getElementById("defaultColors").checked;
        const useIcon = document.getElementById("useIcon").checked;
        const iconFile = document.getElementById("iconUpload").files[0];

        let templateCode = `(function(Scratch) {\n`
            templateCode +=`    'use strict';\n\n`
            templateCode +=`    if (!Scratch.extensions.unsandboxed) {\n`
            templateCode +=`        throw new Error('\\'${templateName}\\' must run unsandboxed!');\n`
            templateCode +=`    }\n\n`;
        
            if (useIcon) 
            templateCode +=`    const icon = "${"\'doesnt work yet lol\'"}";\n\n`;

            templateCode +=`    class ${templateNameClass} {\n`
            templateCode +=`        getInfo() {\n`
            templateCode +=`            return {\n`
            templateCode +=`                id: '${templateNameId}',\n`
            templateCode +=`                name: '${templateName}',\n`

            if (useIcon) {
            templateCode +=`        menuIconURI: icon,\n`
            templateCode +=`        blockIconURI: icon,\n`
            }
            
        if (!defaultColors) {
            templateCode +=`                color1: "${color1}",\n`;
            templateCode +=`                color2: "${color2}",\n`;
            templateCode +=`                color3: "${color3}",\n`;
        }
            templateCode +=`                blocks: '[]'\n`
            templateCode +=`            }\n`
            templateCode +=`        }\n`
            templateCode +=`    }\n\n`

            templateCode += `    Scratch.extensions.register(new ${templateNameClass}());\n`;
            templateCode += `})(Scratch);`;

            // Now 'templateCode' contains the generated code
            console.log(templateCode);
    });
});

function updateSVGColors() {
    // Get the SVG element with the ID "block"
    const svgElement = document.getElementById("block");

    // Get the current SVG content
    const svgContent = svgElement.innerHTML;

    // Replace color values using regular expressions
    const updatedSVGContent = svgContent
        .replace(/#4C97FF/g, document.getElementById("color1").value)
        .replace(/#3373CC/g, document.getElementById("color2").value)
        .replace(/#4280D7/g, document.getElementById("color3").value);

    // Update the SVG content
    svgElement.innerHTML = updatedSVGContent;
}


function transformColor(hexColor) {
    // Parse the hex color to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
  
    // Convert RGB to HSV
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h, s, v;
    
    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
  
    h = Math.round((h * 60 + 360) % 360); // Convert hue to degrees
    s = Math.round((max === 0 ? 0 : (delta / max)) * 100); // Saturation as percentage
    v = Math.round((max / 255) * 100); // Value as percentage
  
    // Apply transformations
    h = (h - 1 + 360) % 360; // Hue shift by -1
    v = Math.max(0, v - 20); // Darken by 20
    s = Math.max(0, s - 2); // Desaturate by 2
  
    // Convert HSV back to RGB
    s = s / 100;
    v = v / 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
  
    let r1, g1, b1;
    
    if (h >= 0 && h < 60) {
      r1 = c;
      g1 = x;
      b1 = 0;
    } else if (h >= 60 && h < 120) {
      r1 = x;
      g1 = c;
      b1 = 0;
    } else if (h >= 120 && h < 180) {
      r1 = 0;
      g1 = c;
      b1 = x;
    } else if (h >= 180 && h < 240) {
      r1 = 0;
      g1 = x;
      b1 = c;
    } else if (h >= 240 && h < 300) {
      r1 = x;
      g1 = 0;
      b1 = c;
    } else {
      r1 = c;
      g1 = 0;
      b1 = x;
    }
  
    r1 = Math.round((r1 + m) * 255);
    g1 = Math.round((g1 + m) * 255);
    b1 = Math.round((b1 + m) * 255);
  
    // Convert RGB to hex
    const hexR = r1.toString(16).padStart(2, '0');
    const hexG = g1.toString(16).padStart(2, '0');
    const hexB = b1.toString(16).padStart(2, '0');
  
    return `#${hexR}${hexG}${hexB}`;
  }