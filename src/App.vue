<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      quantity: 10000,
      sizes: [
        50, 100, 150, 200, 250, 300, 350, 400, 500, 750, 1000
      ],
      unavailable: [],
      view: 0
    }
  },
  methods: {
    toggleBucket(b) {
      let index = this.unavailable.indexOf(b.size)
      if (index === -1) {
        this.unavailable.push(b.size)
      }
      else {
        this.unavailable.splice(index, 1)
      }
      console.log(this.unavailable)
    }
  },
  computed: {
    buckets() {
      const sizes = [...this.sizes]
      sizes.sort((a, b) => b - a)
      let buckets = sizes.map(s => ({
        size: s,
        count: 0,
        quantity: 0,
        available: !this.unavailable.includes(s),
      }))
      let remaining = this.quantity
      buckets.filter(b => b.available).forEach((bucket, i, filtered) => {
        if (remaining >= bucket.size) {
          bucket.count = Math.trunc(remaining / bucket.size)
          bucket.quantity = bucket.size * bucket.count
          remaining = remaining - bucket.quantity
        }
        if (i === filtered.length - 1 && remaining > 0) {
          bucket.count += 1
          bucket.quantity += remaining
          remaining = 0
        }
      })
      return buckets
    }
  }
}
</script>

<template>
  <div id="app" class="m-5 sm:m-20">
    <section>
      <p class="text-gray-600 font-bold uppercase">Quantity</p>
      <input v-model.number="quantity" class="px-2 py-1 mt-2" type="number" />
    </section>
    <section class="mt-10 flex flex-col items-start">
      <p class="text-gray-600 font-bold uppercase">View</p>
      <div class="mt-2 p-1 inline flex items-center bg-gray-300 rounded">
        <button class="px-2 py-2 w-24 text-center font-bold uppercase text-sm text-gray-600 tracking-wider rounded focus:outline-none"
                :class="{'bg-white': view === 0}"
                @click="view = 0">
          Tiles
        </button>
        <button class="px-2 py-2 w-24 text-center font-bold uppercase text-sm text-gray-600 tracking-wider rounded focus:outline-none"
                :class="{'bg-white': view === 1}"
                @click="view = 1">
          Compact
        </button>
      </div>
    </section>
    <section class="mt-10">
      <p class="text-gray-600 font-bold uppercase">Containers</p>
      <div v-if="view === 1" class="flex flex-col max-w-xl">
        <div
          v-for="bucket in buckets"
          class="bucket mt-2 flex items-center text-blue-600 border-4 font-bold rounded-lg"
          :class="{'bucket-available': bucket.available, 'bucket-used': bucket.quantity > 0}"
          :key="bucket.size"
        >
          <p class="w-24 text-right text-3xl">{{bucket.size}}</p>
          <div v-if="bucket.quantity > 0">
            <p class="ml-2">x{{bucket.count}}, {{bucket.quantity}} total</p>
          </div>
          <button class="ml-auto mr-2 p-1 w-12 rounded-full bg-gray-400"
                  @click="toggleBucket(bucket)">
            <div  class="w-4 h-4 rounded-full bg-blue-600"
                  :class="{'ml-auto': bucket.available}">
            </div>
          </button>
        </div>
      </div>
      <div v-else class="mt-2 max-w-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="bucket in buckets"
          class="bucket p-2 flex flex-col items-center justify-center text-blue-600 border-4 font-bold rounded-lg"
          :class="{'bucket-available': bucket.available, 'bucket-used': bucket.quantity > 0}"
          :key="bucket.size"
        >
          <p>{{bucket.count}} X</p>
          <p class="text-3xl">{{bucket.size}}</p>
          <p>{{bucket.quantity}}</p>
          <button class="mt-4 p-1 w-12 rounded-full bg-gray-400"
                  @click="toggleBucket(bucket)">
            <div  class="w-4 h-4 rounded-full bg-blue-600"
                  :class="{'ml-auto': bucket.available}">
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bucket-available {
  @apply bg-gray-100 border-gray-100 shadow
}
.bucket:not(.bucket-available) {
  @apply bg-gray-100 border-gray-100 opacity-50
}
.bucket-used {
  @apply bg-white border-4 border-blue-500 shadow-lg
}
</style>
