'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function test() {
      try {
        // Test connection by querying users table
        const { data, error: queryError } = await supabase
          .from('users')
          .select('count')
          .limit(1)
        
        if (queryError) {
          setError(queryError.message)
          setStatus('❌ Connection Failed')
        } else {
          setStatus('✅ Connection Successful!')
          setError(null)
        }
      } catch (err: any) {
        setError(err.message)
        setStatus('❌ Connection Failed')
      }
    }
    test()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Supabase Connection Test
        </h1>
        <div className="text-center">
          <p className="text-2xl mb-4">{status}</p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          {!error && status.includes('✅') && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
              <p>Your Supabase connection is working correctly!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


