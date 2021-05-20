<template>
  <div>

    <Navbar
              @switchType="switchType"
    />
    <div v-if="!sorted">
      <div class="inline-container"
           v-if="mode"
        >
        <InlineImage
                @choosenPic="picChoose"
                v-for="image of images"
                :key="image.id"
                :image="image"
                :nowrate="nowrate"
        />
      </div>
      <div class="scroll-container"
           v-else
      >
        <ScrollImage
                v-for="(image, num) of images"
                :number="num"
                :key="image.id"
                :image="image"
                :nowrate="nowrate"
        />
      </div>
      <InlineFooter
              v-if="mode"
              :activeAC="activeAC"
              :key="activeAC"
              @undo="undo"
              @accept="accept"
              class="footer"
      />
      <ScrollFooter
              v-else
              :images="this.images"
              class="footer"
              :nowrate="nowrate"
              @choosenPic="picChoose"
              @undo="undo"
              @accept="accept"
      />
    </div>
    <div class="message__inner" v-else>
      <div class="message__inner-text">
        Папка отсортирована
      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/app/Navbar";
import InlineFooter from "@/components/app/InlineFooter";
import ScrollFooter from "@/components/app/ScrollFooter";
import ScrollImage from "@/components/ScrollImage";
import InlineImage from "@/components/InlineImage";


export default {
  name: 'Home',
  components: {
    Navbar, InlineFooter, ScrollImage, InlineImage, ScrollFooter
  },
  data: () => ({
    mode: true,
    images: [],
    sorted: false,
    directory: null,
    rates: []
  }),
  computed: {
    activeAC() {
      return this.rates.length === this.images.length;
    },
    nowrate() {
      return (1 - this.rates.length * (2 / (this.images.length - 1)))
    }
  },
  async mounted() {
    this.directory = this.$route.params.directory
    let predresp = await this.$store.dispatch('getImages', this.directory)
    if (predresp.error === 'Already_sorted') {
      this.images = []
      this.sorted = true
    }
    else {
      this.images = predresp
    }
  },
  methods: {

    switchType() {
      this.mode = !this.mode;
    },
    picChoose(image) {
      if (image.active) {
        let currate = 2 / (this.images.length - 1)
        let nowrate = 1 - this.rates.length * currate
        const idx = this.images.findIndex(img => img.id === image.id)
        this.images[idx].active = false
        this.images[idx].rate = nowrate
        this.rates.push({
          rate: nowrate,
          id: image.id
        })
        console.log(this.rates)
      }
    },
    undo() {
      if (this.rates.length !== 0) {
        let changeId = this.rates.pop().id
        this.images[this.images.findIndex(img => img.id === changeId)].active = true
      }
    },
    async accept() {
      if (this.rates.length === this.images.length) {
        await this.$store.dispatch('updateRates', {rates : {...this.rates}, directory: this.directory})
        .then(async (response) => {
          this.$store.dispatch('getDirectories')
          this.rates = []
          let predresp = await this.$store.dispatch('getImages', this.directory)
          if (predresp.error === 'Already_sorted') {
            this.images = []
            this.sorted = true
          }
          else {
            this.images = predresp
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .message__inner{
    height: 100%;
    text-align: center;
    position: relative;
  }
  .message__inner-text{
    position: absolute;
    height:100%;
    top: 30vh;
    right: 0;
    font-size: 32px;
    left: 0;
    bottom: 0;
  }
  .inline-container {
    margin: 10px 20px 50px 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .footer {
    position: fixed;
    bottom: -1px;
    width: 100%;
  }
  .scroll-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
  }
</style>
