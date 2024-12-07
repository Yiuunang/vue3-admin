/* 
下载图片的几种方式
*/

/**
 * a 标签 download
 * + 使用 <a> 标签和 download 属性 是最简单的方法，适用于直接链接到图片 URL 的情况。
 * @param url 
 * @param name 
 */
export const downloadImgByA = (url: string, name: string) => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * fetch + Blob
 * + 使用 fetch + Blob 适用于从网络上获取图像并处理下载的情况，尤其是处理跨域请求时。
 * @param url 
 * @param name 
 */
export const downloadImgByFetch = (url: string, name: string) => {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      // 创建一个 blob URL
      const url = URL.createObjectURL(blob);
      // 创建一个 <a> 标签并设置其属性
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // 释放 blob URL
      URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error("下载图片失败", err);
    })
}

/**
 * canvas 下载
 * + canvas 导出图像 适用于通过 JavaScript 在 canvas 上绘制的图像。
 * @param url 
 * @param name 
 */
export const downloadImgByCanvas = async (url: string, name: string) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const downloadUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
