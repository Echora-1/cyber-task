export function useApi(getResults) {
    const query = ref('')
    const result = ref(null)
    const error = ref('')
    const loading = ref(false)

   async function callApi () {
        error.value = ''
        loading.value = true
        const {data, error: errorMessage} = await getResults(query.value)
        if(data) {
            result.value = data
        }
        if(errorMessage) {
            error.value = errorMessage ?? 'Упс! Что-то пошло нет так, попробуйте снова.'
        }
        loading.value = false
    }

    return {query, result, callApi, error, loading}
}

