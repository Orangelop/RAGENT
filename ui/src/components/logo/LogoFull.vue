<template>
  <svg
    :height="height"
    viewBox="0 0 136 36"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="custom-logo-color"
  >
    <title>RAGENT</title>
    <g transform="translate(1,0)">
      <path
        fill-rule="evenodd"
        d="M3.1 3.5 H13.5 L18.5 8.5 V26.9 A2.6 2.6 0 0 1 15.9 29.5 H3.1 A2.6 2.6 0 0 1 0.5 26.9 V6.1 A2.6 2.6 0 0 1 3.1 3.5 Z M4.1 5.9 H12.51 L16.1 9.49 V25.9 A1.2 1.2 0 0 1 14.9 27.1 H4.1 A1.2 1.2 0 0 1 2.9 25.9 V7.1 A1.2 1.2 0 0 1 4.1 5.9 Z"
      />
      <path d="M5.6 11 H13.4 V13 H5.6 Z M5.6 15.6 H13.4 V17.6 H5.6 Z M5.6 20.2 H10.8 V22.2 H5.6 Z" />
      <path
        fill-rule="evenodd"
        d="M23.5 15 H30.5 A3.5 3.5 0 0 1 34 18.5 V26 A3.5 3.5 0 0 1 30.5 29.5 H23.5 A3.5 3.5 0 0 1 20 26 V18.5 A3.5 3.5 0 0 1 23.5 15 Z M23.8 17.4 H30.2 A1.4 1.4 0 0 1 31.6 18.8 V25.7 A1.4 1.4 0 0 1 30.2 27.1 H23.8 A1.4 1.4 0 0 1 22.4 25.7 V18.8 A1.4 1.4 0 0 1 23.8 17.4 Z"
      />
      <path
        fill-rule="evenodd"
        d="M22.8 22 A1.6 1.6 0 1 0 26 22 A1.6 1.6 0 1 0 22.8 22 Z M23.65 22 A0.75 0.75 0 1 0 25.15 22 A0.75 0.75 0 1 0 23.65 22 Z M28.4 22 A1.6 1.6 0 1 0 31.6 22 A1.6 1.6 0 1 0 28.4 22 Z M29.25 22 A0.75 0.75 0 1 0 30.75 22 A0.75 0.75 0 1 0 29.25 22 Z"
      />
      <path d="M27 15 V11.6" fill="none" stroke="currentColor" stroke-width="2.4" />
      <path
        d="M27 6.5 Q27.35 9.05 29.9 9.4 Q27.35 9.75 27 12.3 Q26.65 9.75 24.1 9.4 Q26.65 9.05 27 6.5 Z"
      />
    </g>
    <g clip-path="url(#ragentBaseClip)">
      <path
        d="M104.8 9 H108.2 V27.05 H104.8 Z M115.6 9 H119 V27.05 H115.6 Z M104.24 9 H108.2 L119 27.05 H115.04 Z"
      />
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="3.4"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
      >
        <path d="M42.7 27.6 V10.7 H48.6 A4.55 4.55 0 0 1 48.6 19.8 H42.7 M47.4 19.8 L52.6 26.4" />
        <path d="M59.3 27.6 L64.6 13.8 L69.9 27.6 M61.1 20 H68.1" />
        <path d="M85.88 14.92 A5.6 7.3 0 1 0 85.88 21.09 L85.88 18.4 H82.8" />
        <path d="M100.7 10.7 H92 V25.3 H100.7 M92 18 H99.4" />
        <path d="M122.7 10.7 H132.3 M127.5 10.7 V27.6" />
      </g>
    </g>
    <defs>
      <clipPath id="ragentBaseClip">
        <rect x="-20" y="-20" width="200" height="47.05" />
      </clipPath>
    </defs>
  </svg>
</template>
<script setup lang="ts">
defineOptions({ name: 'LogoFull' })

defineProps({
  height: {
    type: String,
    default: '36px',
  },
})
</script>
<style lang="scss" scoped>
.custom-logo-color {
  color: var(--el-color-primary);
}
</style>
