import axios from 'axios'

import { TYPEFORM_RESPONSES_URL, TYPEFORM_KEY } from '../constants'

export default lastQueryDate => axios({
    method: 'get',
    url: `${TYPEFORM_RESPONSES_URL}?since=${lastQueryDate.toISOString()}`,
    headers: {
      'Authorization': `Bearer ${TYPEFORM_KEY}`
    }
  })
