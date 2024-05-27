// vite.config.js
import { ViteImageOptimizer } from "file:///D:/Projects/Acceleration/3-internship/accelerator-first-project-internship/accelerator-first-project-internship-season-17/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import VitePluginSvgSpritemap from "file:///D:/Projects/Acceleration/3-internship/accelerator-first-project-internship/accelerator-first-project-internship-season-17/node_modules/@spiriit/vite-plugin-svg-spritemap/dist/index.js";
var vite_config_default = {
  plugins: [
    VitePluginSvgSpritemap("source/img/sprite/*.svg", {
      styles: false,
      injectSVGOnDev: true
    }),
    // input https://www.npmjs.com/package/html-minifier-terser options
    // ViteMinifyPlugin({}),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i,
      includePublic: false,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: false,
                convertPathData: {
                  floatPrecision: 2,
                  forceAbsolutePath: false,
                  utilizeAbsolute: false
                },
                removeViewBox: false,
                // https://github.com/svg/svgo/issues/1128
                cleanupIds: false
              }
            }
          },
          "removeDimensions"
        ]
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
        palette: true
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      // Cache assets in cacheLocation. When enabled, reads and writes asset files with their hash suffix from the specified path.
      cache: true,
      cacheLocation: "./.cache"
    })
  ],
  css: {
    devSourcemap: true
  },
  publicDir: "public",
  root: "./source",
  build: {
    outDir: "../dist"
  },
  base: "./",
  server: {
    port: 3e3
  }
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxBY2NlbGVyYXRpb25cXFxcMy1pbnRlcm5zaGlwXFxcXGFjY2VsZXJhdG9yLWZpcnN0LXByb2plY3QtaW50ZXJuc2hpcFxcXFxhY2NlbGVyYXRvci1maXJzdC1wcm9qZWN0LWludGVybnNoaXAtc2Vhc29uLTE3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxBY2NlbGVyYXRpb25cXFxcMy1pbnRlcm5zaGlwXFxcXGFjY2VsZXJhdG9yLWZpcnN0LXByb2plY3QtaW50ZXJuc2hpcFxcXFxhY2NlbGVyYXRvci1maXJzdC1wcm9qZWN0LWludGVybnNoaXAtc2Vhc29uLTE3XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9BY2NlbGVyYXRpb24vMy1pbnRlcm5zaGlwL2FjY2VsZXJhdG9yLWZpcnN0LXByb2plY3QtaW50ZXJuc2hpcC9hY2NlbGVyYXRvci1maXJzdC1wcm9qZWN0LWludGVybnNoaXAtc2Vhc29uLTE3L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyJztcbmltcG9ydCBWaXRlUGx1Z2luU3ZnU3ByaXRlbWFwIGZyb20gJ0BzcGlyaWl0L3ZpdGUtcGx1Z2luLXN2Zy1zcHJpdGVtYXAnO1xuLy8gaW1wb3J0IHsgVml0ZU1pbmlmeVBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1pbmlmeSc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ30gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGx1Z2luczogW1xuICAgIFZpdGVQbHVnaW5TdmdTcHJpdGVtYXAoJ3NvdXJjZS9pbWcvc3ByaXRlLyouc3ZnJywge1xuICAgICAgc3R5bGVzOiBmYWxzZSxcbiAgICAgIGluamVjdFNWR09uRGV2OiB0cnVlLFxuICAgIH0pLFxuICAgIC8vIGlucHV0IGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2h0bWwtbWluaWZpZXItdGVyc2VyIG9wdGlvbnNcbiAgICAvLyBWaXRlTWluaWZ5UGx1Z2luKHt9KSxcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAgdGVzdDogL1xcLihqcGU/Z3xwbmd8c3ZnKSQvaSxcbiAgICAgIGluY2x1ZGVQdWJsaWM6IGZhbHNlLFxuICAgICAgbG9nU3RhdHM6IHRydWUsXG4gICAgICBhbnNpQ29sb3JzOiB0cnVlLFxuICAgICAgc3ZnOiB7XG4gICAgICAgIG11bHRpcGFzczogdHJ1ZSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdwcmVzZXQtZGVmYXVsdCcsXG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgb3ZlcnJpZGVzOiB7XG4gICAgICAgICAgICAgICAgY2xlYW51cE51bWVyaWNWYWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnZlcnRQYXRoRGF0YToge1xuICAgICAgICAgICAgICAgICAgZmxvYXRQcmVjaXNpb246IDIsXG4gICAgICAgICAgICAgICAgICBmb3JjZUFic29sdXRlUGF0aDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB1dGlsaXplQWJzb2x1dGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVtb3ZlVmlld0JveDogZmFsc2UsIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmcvc3Znby9pc3N1ZXMvMTEyOFxuICAgICAgICAgICAgICAgIGNsZWFudXBJZHM6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgICdyZW1vdmVEaW1lbnNpb25zJyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBwbmc6IHtcbiAgICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I3BuZ1xuICAgICAgICBxdWFsaXR5OiA4MCxcbiAgICAgICAgcGFsZXR0ZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGpwZWc6IHtcbiAgICAgICAgLy8gaHR0cHM6Ly9zaGFycC5waXhlbHBsdW1iaW5nLmNvbS9hcGktb3V0cHV0I2pwZWdcbiAgICAgICAgcXVhbGl0eTogODAsXG4gICAgICAgIHByb2dyZXNzaXZlOiB0cnVlXG4gICAgICB9LFxuICAgICAganBnOiB7XG4gICAgICAgIC8vIGh0dHBzOi8vc2hhcnAucGl4ZWxwbHVtYmluZy5jb20vYXBpLW91dHB1dCNqcGVnXG4gICAgICAgIHF1YWxpdHk6IDgwLFxuICAgICAgICBwcm9ncmVzc2l2ZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIC8vIENhY2hlIGFzc2V0cyBpbiBjYWNoZUxvY2F0aW9uLiBXaGVuIGVuYWJsZWQsIHJlYWRzIGFuZCB3cml0ZXMgYXNzZXQgZmlsZXMgd2l0aCB0aGVpciBoYXNoIHN1ZmZpeCBmcm9tIHRoZSBzcGVjaWZpZWQgcGF0aC5cbiAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgY2FjaGVMb2NhdGlvbjogJy4vLmNhY2hlJyxcbiAgICB9KSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgZGV2U291cmNlbWFwOiB0cnVlXG4gIH0sXG4gIHB1YmxpY0RpcjogJ3B1YmxpYycsXG4gIHJvb3Q6ICcuL3NvdXJjZScsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnLi4vZGlzdCcsXG4gIH0sXG4gIGJhc2U6ICcuLycsXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlpQixTQUFTLDBCQUEwQjtBQUM1a0IsT0FBTyw0QkFBNEI7QUFJbkMsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsU0FBUztBQUFBLElBQ1AsdUJBQXVCLDJCQUEyQjtBQUFBLE1BQ2hELFFBQVE7QUFBQSxNQUNSLGdCQUFnQjtBQUFBLElBQ2xCLENBQUM7QUFBQTtBQUFBO0FBQUEsSUFHRCxtQkFBbUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsTUFDTixlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsTUFDWixLQUFLO0FBQUEsUUFDSCxXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLGNBQ04sV0FBVztBQUFBLGdCQUNULHNCQUFzQjtBQUFBLGdCQUN0QixpQkFBaUI7QUFBQSxrQkFDZixnQkFBZ0I7QUFBQSxrQkFDaEIsbUJBQW1CO0FBQUEsa0JBQ25CLGlCQUFpQjtBQUFBLGdCQUNuQjtBQUFBLGdCQUNBLGVBQWU7QUFBQTtBQUFBLGdCQUNmLFlBQVk7QUFBQSxjQUNkO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLEtBQUs7QUFBQTtBQUFBLFFBRUgsU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLE1BQU07QUFBQTtBQUFBLFFBRUosU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLEtBQUs7QUFBQTtBQUFBLFFBRUgsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLE1BQ2Y7QUFBQTtBQUFBLE1BRUEsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
