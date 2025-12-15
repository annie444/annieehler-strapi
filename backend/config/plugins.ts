export default () => ({
  "webp-converter": {
    enabled: true,
    config: {
      // mimeTypes that converts to WebP. Default is ['image/png', 'image/jpeg', 'image/jpg']
      mimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/tiff"],
      options: {
        quality: 80, // Quality of the converted WebP images (0-100)
        alphaQuality: 100, // Quality of the alpha channel for WebP images with transparency (0-100)
        lossless: false, // Whether to use lossless compression for WebP images
        nearLossless: false, // Whether to use near-lossless compression for WebP images
        smartSubsample: true, // Whether to use smart subsampling for WebP images
        smartDeblock: true, // Whether to use smart deblocking for WebP images
        preset: "photo", // Preset for WebP conversion: 'default', 'photo', 'picture', 'drawing', 'icon', 'text'
        effort: 4, // Compression effort (0-6), higher is slower but better quality
        loop: 0, // Number of loops for animated WebP (0 = infinite)
        delay: 100, // Delay between frames for animated WebP in milliseconds
        minSize: false, // prevent use of animation key frames to minimise file size
        mixed: false, // allow mixing of lossy and lossless frames in animated WebP
        force: true, // Force conversion even if it fails some checks
      },
    },
  },
});
