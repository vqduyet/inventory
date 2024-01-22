<template>
  <div class="custom-container">
    <div class="glassmorphism">
      <h5>{{ today }}</h5>
      <p>Welcome,<br />it's pretty delicious</p>
      <div class="location">
        <font-awesome-icon icon="map-marker-alt" class="mr-1" />
        <span>Saigon, Vietnam</span>
      </div>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.custom-container {
  height: calc(100vh - 50px);
  background-image: url('~@/assets/img/home-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  z-index: 0;
}
.glassmorphism {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.3);
  padding: 20px;
  width: 400px;
  @media screen and (max-width: 480px) {
    width: 350px;
  }
  border-radius: 20px;
  border-left: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  font-family: 'Roboto', sans-serif;
}
.glassmorphism h5 {
  font-size: 20px;
  text-align: right;
  margin-top: 0;
  color: transparent;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
}
.glassmorphism p {
  font-size: 30px;
  color: #fff;
}
.location {
  color: #fff;
}
</style>
