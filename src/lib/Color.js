class Color {
  static getRandomColor(index, colors) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const getLuminance = (color) => {
      const hex = color.substring(1);
      const rgb = parseInt(hex, 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const validIndex = index % (colors ? colors.length : 1);
    const backgroundColor = colors ? colors[validIndex] : randomColor;

    const textColor =
      getLuminance(backgroundColor) > 128 ? '#000000' : '#ffffff';

    return { backgroundColor, textColor };
  }

  static getRandomGradientColor(index, colors) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const randomColor2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
    const getLuminance = (color) => {
      const hex = color.substring(1);
      const rgb = parseInt(hex, 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
  
    const validIndex = index % (colors ? colors.length : 1);
    const color1 = colors ? colors[validIndex] : randomColor;
    const color2 = colors ? colors[(validIndex + 1) % colors.length] : randomColor2;
  
    const backgroundColor = `${color1}, ${color2}`;
    const textColor = getLuminance(color1) > 128 ? '#000000' : '#ffffff';
  
    return { backgroundColor, textColor };
  }
  
}

export default Color;
