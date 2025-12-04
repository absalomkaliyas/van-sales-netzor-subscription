import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  hub_id?: string
}

export async function signIn(email: string, password: string) {
  console.log('signIn called with email:', email)
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log('Supabase auth response:', { data, error })

  if (error) {
    console.error('Supabase auth error:', error)
    throw error
  }

  if (!data || !data.user) {
    console.error('No user data returned from Supabase')
    throw new Error('No user returned from sign in')
  }

  console.log('Auth successful, fetching user data from users table...')

  // Get user details from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  console.log('Users table query result:', { userData, userError })

  if (userError) {
    console.warn('User not found in users table, but auth succeeded:', userError)
    // Don't throw - auth succeeded, just user data not in table
    return { user: data.user, userData: null, session: data.session }
  }

  return { user: data.user, userData, session: data.session }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return null
  }

  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !userData) {
    return null
  }

  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
    hub_id: userData.hub_id,
  }
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
