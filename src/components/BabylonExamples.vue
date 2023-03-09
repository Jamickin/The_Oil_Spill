<template>
  <main>
    <p>Physics_Impostors</p>
    <canvas></canvas>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Physics_Impostors } from "@/BabylonExamples/Physics_Impostors";
export default defineComponent({
  name: "BabylonExamples",
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new Physics_Impostors(canvas);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@100;700&display=swap");
* {
  padding: 0;
  border: 0;
}

main {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
}
#loader {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#loaded {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease;
}
#loadingContainer {
  width: 30%;
  height: 2rem;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 6px;
  margin: 0.5rem;
}
#loadingBar {
  height: 100%;
  background: green;
  border-radius: 6px;
}
p {
  border: none;
  color: white;
  margin-bottom: 1rem;
  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 2rem;
}
canvas {
  width: 90%;
  height: 70%;
  border: none;
  outline: none;
}
</style>
