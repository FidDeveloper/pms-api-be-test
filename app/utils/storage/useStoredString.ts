import { useCallback, useEffect, useState } from "react"

import { loadString, remove, saveString } from "./index"

export function useStoredString(
  key: string,
): [string | undefined, (value: string | undefined) => void] {
  const [value, setValue] = useState<string | undefined>(undefined)

  useEffect(() => {
    let isMounted = true

    const hydrate = async () => {
      const stored = await loadString(key)
      if (isMounted) setValue(stored ?? undefined)
    }

    void hydrate()

    return () => {
      isMounted = false
    }
  }, [key])

  const setStoredValue = useCallback(
    (nextValue: string | undefined) => {
      setValue(nextValue)

      if (nextValue === undefined) {
        void remove(key)
        return
      }

      void saveString(key, nextValue)
    },
    [key],
  )

  return [value, setStoredValue]
}
