<template>
  <!-- Zeigt am oberen Rand der Dokumentenansicht den Pfad in allen Unterordnern an -->
  <!-- Der Pfad wird aus der route gebildet -->
  <b-breadcrumb :items="items"/>
</template>

<script>
export default {
  props: ["items"]
};
</script>
 <style>
 /* Custom styles (siehe bootstrap breadcrumb konventionen) */
.breadcrumb {
  background: rgba(255, 255, 255, 0);
  border: 0px solid rgba(240, 23, 255, 0);
  border-radius: 0px;
}
.breadcrumb li {
  font-size: 14px;
}
.breadcrumb a {
  color: #666666;
}
.breadcrumb > .active {
  color: #f86a2d;
}
.breadcrumb a:hover {
  color: #666666;
  text-decoration: none;
  cursor: default;
}
</style>
