<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      quantity: 10000,
      sizes: [
        50, 100, 150, 200, 250, 300, 350, 400, 500, 750, 1000
      ]
    }
  },
  computed: {
    buckets() {
      const sizes = [...this.sizes]
      sizes.sort((a, b) => b - a)
      let buckets = sizes.map(s => ({
        size: s,
        count: 0,
        quantity: 0
      }))
      let remaining = this.quantity
      buckets.forEach((bucket, i) => {
        if (remaining >= bucket.size) {
          bucket.count = Math.trunc(remaining / bucket.size)
          bucket.quantity = bucket.size * bucket.count
          remaining = remaining - bucket.quantity
        }
        if (i === buckets.length - 1 && remaining > 0) {
          bucket.count += 1
          bucket.quantity += remaining
          remaining = 0
        }
      })
      console.log(buckets)
      return buckets
    }
  }
}
</script>

<template>
  <div id="app" class="m-20">
    <section>
      <p class="text-gray-600 font-bold uppercase">Total Quantity</p>
      <input v-model.number="quantity" class="px-2 py-1 mt-2" type="number" />
    </section>
    <section class="mt-10">
      <p class="text-gray-600 font-bold uppercase">Available Sizes</p>
      <div class="mt-2 max-w-lg grid grid-cols-4 gap-4">
        <div
          v-for="bucket in buckets"
          class="p-2 flex flex-col items-center justify-center text-blue-600 font-bold bg-white rounded-lg shadow-lg"
          :class="{'bg-gray-400': bucket.count === 0}"
          :key="bucket.size"
        >
          <p>{{bucket.count}} X</p>
          <p class="text-3xl">{{bucket.size}}</p>
          <p>{{bucket.quantity}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style src="./assets/css/style.css"></style>
