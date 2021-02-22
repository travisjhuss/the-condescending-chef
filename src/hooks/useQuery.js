import { useLocation } from 'react-router-dom';

// hook for allowing refresh with search component
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default useQuery;