import Vue from 'vue'
import Router from 'vue-router'
import Main from '../pages/Main'
import Create from '../pages/Create'
import VideoComplete from '../pages/VideoComplete'
import ListenSelect from '../pages/ListenSelect'
import CompleteDialog from '../pages/CompleteDialog'
import ReadSelect from '../pages/ReadSelect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: `/`,
      name: `Main`,
      component: Main,
      children: [
        {
          path: `create`,
          name: `Create`,
          component: Create,
          children: [
            {
              path: `video-complete`,
              name: `VideoComplete`,
              component: VideoComplete
            },
            {
              path: `listen-select`,
              name: `ListenSelect`,
              component: ListenSelect
            },
            {
              path: `complete-dialog`,
              name: `CompleteDialog`,
              component: CompleteDialog
            },
            {
              path: `read-select`,
              name: `ReadSelect`,
              component: ReadSelect
            }
          ]
        }
      ]
    }
  ]
})
