import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useDelete = (url, options = {}) => {
  const {
    headers = {},
    timeout = 5000,
    retries = 0,
    onSuccess = () => {},
    onError = () => {},
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const deleteWithRetry = useCallback(
    async (id, retriesLeft) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/${url}/${id}`,
          {
            headers,
            timeout,
          }
        );

        setDeleted(true);
        setError(null);
        onSuccess(response.data);
        toast.success(response.data.mensaje);
      } catch (err) {
        if (retriesLeft > 0) {
          return deleteWithRetry(id, retriesLeft - 1);
        }

        const errorMessage =
          err.response?.data?.message || "Error al eliminar el recurso";
        toast.error(errorMessage);
        setDeleted(false);
        onError(err);
      }
    },
    [url, headers, timeout, retries, onSuccess, onError]
  );

  // Función para iniciar la eliminación
  const deleteItem = (id) => {
    setLoading(true);
    deleteWithRetry(id, retries);
    setLoading(false);
  };

  return {
    deleteItem,
    loading,
    error,
    deleted,
  };
};

export default useDelete;
