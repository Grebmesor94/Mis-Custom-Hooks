import { useState, useEffect, useRef } from "react"

export const useFetch = (url) => {

  const isMounted = useRef(true);

  const [state, setstate] = useState({data: null, loading: true, error: null});

  useEffect(() => {
    
    return () => {
      isMounted.current = false;
    }
  }, [])

  useEffect(() => {

    setstate({
      data: null,
      loading: true,
      error: null
    })

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if(isMounted.current) {
          setstate({
            loading: false,
            error: null,
            data
          })            
        }         
      })
      .catch(() => { 
        setstate({
          ...state,
          loading: false,
          error: 'no se encuentra la informacion'
        })
      })
    
  }, [url])

  return state;
}