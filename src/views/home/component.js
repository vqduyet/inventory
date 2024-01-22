import { format } from 'date-fns'
export default {
  data() {
    return {
      today: format(new Date(), 'dd/MM/yyyy')
    }
  }
}
