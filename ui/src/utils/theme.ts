export function hexToRgba(hex?: string, alpha?: number) {
  // 将16进制颜色值的两个字符一起转换成十进制
  if (!hex) {
    return ''
  } else {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    // 返回RGBA格式的字符串
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
}
