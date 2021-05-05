const { createCanvas: _createCanvas } = require('canvas');

module.exports = class Canvas {
  static greyscale(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);

    for (let i = 0; i < data.data.length; i += 4) {
      const brightness =
        0.34 * data.data[i] + 0.5 * data.data[i + 1] + 0.16 * data.data[i + 2];

      data.data[i] = brightness;
      data.data[i + 1] = brightness;
      data.data[i + 2] = brightness;
    }
    ctx.putImageData(data, x, y);

    return ctx;
  }

  static fishEye(ctx, level, x, y, width, height) {
    const frame = ctx.getImageData(x, y, width, height);
    const source = new Uint8Array(frame.data);
    for (let i = 0; i < frame.data.length; i += 4) {
      const sy = Math.floor(i / 4 / frame.width);
      const sx = (i / 4) % frame.width;
      const dx = Math.floor(frame.width / 2) - sx;
      const dy = Math.floor(frame.height / 2) - sy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const x2 = Math.round(
        frame.width / 2 - (dx - Math.sin(dist / (level * Math.PI) / 2))
      );
      const y2 = Math.round(
        frame.height / 2 - dy * Math.sin(dist / (level * Math.PI) / 2)
      );
      const i2 = (y2 * frame.width + x2) * 4;
      frame.data[i] = source[i2];
      frame.data[i + 1] = source[i2 + 1];
      frame.data[i + 2] = source[i2 + 2];
      frame.data[i + 3] = source[i2 + 3];
    }
    ctx.putImageData(frame, x, y);
    return ctx;
  }

  static drawImageWithTint(ctx, image, color, x, y, width, height) {
    const { fillStyle, globalAlpha } = ctx;
    ctx.fillColor = color;
    ctx.drawImage(image, x, y, width, height);
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = globalAlpha;
    return ctx;
  }
  static centerImage(base, data) {
    const dataRatio = data.width / data.height;
    const baseRatio = base.width / base.height;
    let { width, height } = data;
    let x = 0;
    let y = 0;
    if (baseRatio < dataRatio) {
      height = data.height;
      width = base.width * (height / base.height);
      x = (data.width - width) / 2;
      y = 0;
    } else if (baseRatio > dataRatio) {
      width = data.width;
      height = base.height * (width / base.width);
      x = 0;
      y = (data.height - height) / 2;
    }
    return { x, y, width, height };
  }
  static wrapText(ctx, text, maxWidth) {
    return new Promise((resolve) => {
      if (ctx.measureText(text).width < maxWidth) return resolve([text]);
      if (ctx.measureText('W').width > maxWidth) return resolve(null);
      const words = text.split(' ');
      const lines = [];
      let line = '';
      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) {
            words[1] = `${temp.slice(-1)}${words[1]}`;
          } else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
          line += `${words.shift()} `;
        } else {
          lines.push(line.trim());
          line = '';
        }
        if (words.length === 0) lines.push(line.trim());
      }
      return resolve(lines);
    });
  }
};
