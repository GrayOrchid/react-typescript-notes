import {useEffect, useState} from 'react'
export function useLocalStorage<T>(key:string,initialValue:T|(()=>T)) {
    let [value,setValue] = useState<T>(()=>{
        let jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof initialValue ==='function' ) {
                return (initialValue as () => T)()
            }else {
                return initialValue
            }
        }
        else{
            return JSON.parse(jsonValue)
        }
    })
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    })
    return [value,setValue] as [T,typeof setValue]
}