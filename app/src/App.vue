<template>
  <div id="app">
    <router-view />
    <portal-target name="modal" />
  </div>
</template>

<style>
body {
  margin: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
.font-caption {
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: normal;
  letter-spacing: .4px;
  opacity: .9;
}
</style>
