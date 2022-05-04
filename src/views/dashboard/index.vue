 /* eslint-disable */
<template>
  <div>
    <h1>“遇贫则鸣”防返贫监测系统</h1>
    <img src="./4.png" alt="">
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
h1{
  padding-left: 10px;
  user-select: none;
}
img{
  width: 1300px;
  height: auto;
  margin: 0 auto;
  border-radius: 30px;
}
</style>
