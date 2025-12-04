import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  hub_id?: string
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Sign in error:', error)
    throw error
  }

  if (!data.user) {
    throw new Error('No user returned from sign in')
  }

  // Get user details from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (userError) {
    console.error('User data fetch error:', userError)
    // Don't throw if user doesn't exist in users table yet
    // Just return the auth user
    return { user: data.user, userData: null }
  }

  return { user: data.user, userData }
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
