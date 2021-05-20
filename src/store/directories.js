import axios from 'axios'

export default {
    state: {
        directories: []
    },
    mutations: {
        setDirectories(state, directories) {
            state.directories = directories
        },
    },
    actions: {
        async addDirectory({dispatch, commit}, toAdd) {
            try {
                const resp = await axios.post(
                    'http://127.0.0.1:8000/api/add_directory/',
                    {path: toAdd},
                )
                if (resp.data.status === 'ok') {
                    commit('setDirectories', [...this.getters.directories, resp.data.data])
                    return 'ok'
                } else {
                    return resp.data.error
                }
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        },
        async getDirectories({dispatch, commit}) {
            try {
                const directories = await axios.get(
                    'http://127.0.0.1:8000/api/get_directories/',
                )
                commit('setDirectories', directories.data.data)
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }

        },
        async updateDirectory({dispatch, commit}, directory){
            try {
                const resp_dir = await axios.post(
                    'http://127.0.0.1:8000/api/update_directory/',
                    {directory}
                )
                let dirs = this.getters.directories
                dirs[dirs.findIndex(dir => dir.id === resp_dir.data.data.id)] = resp_dir.data.data
                commit('setDirectories', dirs)
            } catch (e) {
                commit('setError', e)
                console.log(e)
                throw e
            }
        }
    },
    getters : {
        directories: s => s.directories
    }
}