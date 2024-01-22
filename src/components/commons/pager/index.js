export default {
  name: 'pager',
  props: {
    page: Number,
    total: Number,
    size: Number,
    pagerFull: Boolean,
    loadContentAtPage: Function,
    customClas: String
  },
  data() {
    return {
      min_page: 1,
      first: {
        link: '',
        dataPage: ''
      },
      prev: {
        link: '',
        dataPage: ''
      },
      next: {
        link: '',
        dataPage: ''
      },
      last: {
        link: '',
        dataPage: ''
      },
      current: {
        link: '',
        dataPage: ''
      },
      edgeLeft: {
        link: '',
        dataPage: ''
      },
      edgeRight: {
        link: '',
        dataPage: ''
      },
      leftSide: [],
      rightSide: [],
      dotLeft: false,
      dotRight: false
    }
  },
  created() {
    this.page = Math.max(this.min_page, this.page)
    this.loadTemplate()
  },
  watch: {
    page: function (v) {
      this.resetData()
      this.loadTemplate()
    },
    total: function (v) {
      this.resetData()
      this.loadTemplate()
    }
  },
  methods: {
    loadTemplate: function () {
      if (this.total <= this.size) {
        return
      }

      //first page
      if (this.page > this.min_page) {
        this.first.link = '?page=' + this.min_page
        this.first.dataPage = this.min_page
      }

      //prev page
      if (this.page - 1 >= this.min_page) {
        this.prev.link = '?page=' + (this.page - 1)
        this.prev.dataPage = this.page - 1
      }

      if (this.pagerFull) {
        //pageEdgeLeft
        if (this.page - 3 >= this.min_page) {
          this.edgeLeft.link = '?page=' + this.min_page
          this.edgeLeft.dataPage = this.min_page
        }

        //3dot left
        if (this.page - 3 > this.min_page) {
          this.dotLeft = true
        }
      }

      //page left side
      for (let i = this.page - 2; i < this.page; i++) {
        if (i >= this.min_page) {
          this.leftSide.push({
            link: '?page=' + i,
            dataPage: i
          })
        }
      }

      //current page
      if (this.page >= this.min_page && this.page <= Math.ceil(this.total / this.size)) {
        this.current.link = '?page=' + this.page
        this.current.dataPage = this.page
      }

      //page right side
      for (let i = this.page + 1; i <= this.page + 2; i++) {
        if (i <= Math.ceil(this.total / this.size)) {
          this.rightSide.push({
            link: '?page=' + i,
            dataPage: i
          })
        }
      }

      if (this.pagerFull) {
        //3dot right
        if (this.page + 3 < Math.ceil(this.total / this.size)) {
          this.dotRight = true
        }

        //pageEdgeLeft
        if (this.page + 3 <= Math.ceil(this.total / this.size)) {
          this.edgeRight.link = '?page=' + Math.ceil(this.total / this.size)
          this.edgeRight.dataPage = Math.ceil(this.total / this.size)
        }
      }

      //next page
      if (this.page < Math.ceil(this.total / this.size)) {
        this.next.link = '?page=' + (this.page + 1)
        this.next.dataPage = this.page + 1
      }

      //last page
      if (this.page < Math.ceil(this.total / this.size)) {
        this.last.link = '?page=' + Math.ceil(this.total / this.size)
        this.last.dataPage = Math.ceil(this.total / this.size)
      }
    },
    resetData: function () {
      this.first = {
        link: '',
        dataPage: ''
      }
      this.prev = {
        link: '',
        dataPage: ''
      }
      this.next = {
        link: '',
        dataPage: ''
      }
      this.last = {
        link: '',
        dataPage: ''
      }
      this.current = {
        link: '',
        dataPage: ''
      }
      this.edgeLeft = {
        link: '',
        dataPage: ''
      }
      this.edgeRight = {
        link: '',
        dataPage: ''
      }
      this.leftSide = []
      this.rightSide = []
      this.dotLeft = false
      this.dotRight = false
    }
  }
}
