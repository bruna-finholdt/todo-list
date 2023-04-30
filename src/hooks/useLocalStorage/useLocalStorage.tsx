import React, { useState, useEffect } from 'react'

const useLocalStorage = <T,>(key: string, defaultValue = []): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(
        () => {
            const valueInLocalStorage = window.localStorage.getItem(key)
            if (valueInLocalStorage) {
                return JSON.parse(valueInLocalStorage)
            }
            return defaultValue
        },
    )
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
}

export default useLocalStorage;