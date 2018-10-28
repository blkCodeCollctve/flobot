import axios from 'axios'

import { TYPEFORM_RESPONSES_URL, TYPEFORM_KEY } from '../constants'

export default (lastQueryDate, handler) => {
  axios({
    method: 'get',
    url: `${TYPEFORM_RESPONSES_URL}?since=${lastQueryDate.toISOString()}`,
    headers: {
      'Authorization': `Bearer ${TYPEFORM_KEY}`
    }
  })
  .then(({ data: { page_count, total_items, items } }) => handler(items))
  .catch(err => console.log(`ERROR: couldn't fetch and post responses: ${err}`))
}
