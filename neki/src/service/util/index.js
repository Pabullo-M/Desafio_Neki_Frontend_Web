
function saveData(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }

  function clearLocalStorageItem(key) {
    try {
      localStorage.removeItem(key);
      console.log(`Item com a chave "${key}" foi removido do localStorage.`);
    } catch (error) {
      console.error('Erro ao remover item do localStorage:', error);
    }
  }
  function getFromLocalStorage(key) {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return value;
      }
      return null;
    } catch (error) {
      console.error('Erro ao recuperar item do localStorage:', error);
      return null;
    }
  }

  export {saveData, clearLocalStorageItem, getFromLocalStorage}