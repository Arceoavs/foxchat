import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'deutsch',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('deutsch').create({
      title: 'Hallo {0}!',
      msg: 'test_de',
      dokumente: 'Dokumente',
    }),
 
    new MLanguage('english').create({
      title: 'Hello {0}!',
      msg: 'test_eng',
      dokumente: 'Documents',
    })
  ]
})