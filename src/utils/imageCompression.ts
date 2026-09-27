/**
 * Client-side image compression utility using HTML5 Canvas.
 * Compresses uploaded images so they consume ~50KB - 120KB instead of 5MB - 15MB,
 * ensuring they fit easily in localStorage and IndexedDB without exceeding quotas.
 */

export async function compressImageFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If file is not an image, try reading as raw data url
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;

          // Calculate new dimensions maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // Fallback if canvas context cannot be created
            resolve(dataUrl);
            return;
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Fill white background for transparent PNGs converted to JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);

          // Export as compressed JPEG
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          console.warn('Canvas compression error, using original data URL', err);
          resolve(dataUrl);
        }
      };

      img.onerror = () => {
        // If image loading fails, fallback to raw reader result
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    reader.onerror = (err) => {
      console.warn('FileReader error', err);
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an avatar / 1x1 circular portrait to optimal small dimensions (~30KB)
 */
export async function compressAvatarFile(file: File): Promise<string> {
  return compressImageFile(file, 400, 400, 0.85);
}
