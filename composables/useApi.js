import { ref } from 'vue'

export function useApi(getResults) {
  const query = ref('')
  const result = ref(null)
  const error = ref('')
  const loading = ref(false)

  const callApi = async () => {
    error.value = ''
    loading.value = true
    try {
      result.value = await getResults(query.value)
    } catch (err) {
      if (!err.response) {
        error.value = 'Упс! Что-то пошло нет так, попробуйте снова.'
      } else {
        error.value = err.response.data.message
      }
    } finally {
      loading.value = false
    }
  }

  return { query, result, callApi, error, loading }
}
