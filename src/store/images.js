import axios from 'axios'

export default {
    actions: {
        async updateRates({dispatch, commit}, data) {
            try {
                let resp = await axios.post(
                    'http://127.0.0.1:8000/api/update_rates/',
                    {data},
                )
                resp = resp.data
                return resp
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getImages({dispatch, commit}, directory) {
            try {
                let images = await axios.post(
                    'http://127.0.0.1:8000/api/get_images/',
                    {directory},
                )
                if(images.data.status === 'ok') {
                    images = images.data.data.map(image=>{
                        return {
                            id: image.id,
                            imgUrl: 'http://127.0.0.1:8000/api/get_image/?path='+image.image,
                            active: true,
                            rate: null
                        }
                    })
                    return images
                }
                else if (images.data.error === 'Already_sorted') {
                    return {'status': 'error', 'error': 'Already_sorted'}
                }
                else{
                    throw images.data.error
                }
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        },
    }
}