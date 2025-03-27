import { useState } from "react"

const useToggle = (defaultValue: boolean = false) => {
    const [isToggle, setIsToggle] = useState<boolean>(defaultValue);
    const onToggle = () => setIsToggle((prev) => !prev)
    
    return [isToggle, onToggle] as const
}

export default useToggle
