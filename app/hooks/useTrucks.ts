// src/hooks/useTrucks.ts
'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useTrucks() {
  const { data, error, isLoading } = useSWR('/api/trucks', fetcher, {
    refreshInterval: 15000, // revalida a cada 15s
    revalidateOnFocus: true, // atualiza ao voltar para a aba
    dedupingInterval: 5000, // evita chamadas duplicadas
  })

  return {
    trucks: data ?? [],
    isLoading,
    error,
  }
}