<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full lg:flex px-4 mb-4 mt-4">
        <p class="text-leading text-grey-darker">Informasi Terbaru</p>
      </div>

      <div class="bg-white shadow p-4">
        <template v-if="!loading">
          <div class="flex">
            <div class="flex items-center block mx-auto mr-4">
              <i class="fas fa-check-circle text-brand-green text-lg" />
            </div>
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">{{ item['title'] }}</p>
              <p class="text-sm text-gray-600">{{ formatDateTimeShort(item['published_at'].toDate()) }}</p>
            </div>
          </div>

          <div class="text-sm leading-normal mt-5 body-content" v-html="formatContent(item['content'])"></div>

          <template v-if="item['action_url']">
            <div class="my-2">
              <a :href="item['action_url']" @click="clickAction" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded">Baca Selengkapnya</a>
            </div>
          </template>
        </template>

        <template v-else>
          <content-loader
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="15" rx="0" ry="0" width="100%" height="15" />
            <rect x="0" y="45" rx="0" ry="0" width="100%" height="75" />
          </content-loader>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { formatDateTimeShort } from '@/lib/date'
import { analytics } from '@/lib/firebase'

export default {
  components: {
    ContentLoader
  },

  metaInfo: {
    title: 'Informasi Terbaru'
  },

  computed: mapGetters({
    loading: 'articles-detail/loading',
    item: 'articles-detail/item'
  }),

  mounted () {
    this.fetchItem(this.$route.params.id)
  },

  methods: {
    formatDateTimeShort,

    async fetchItem (id) {
      await this.$store.dispatch('articles-detail/fetchItem', { id: id })

      analytics.logEvent('article_detail_view', { id: id })
    },

    formatContent (content) {
      return content
    },

    clickAction () {
      analytics.logEvent('article_detail_click_action', { id: this.$route.params.id })
    }
  }
}
</script>
