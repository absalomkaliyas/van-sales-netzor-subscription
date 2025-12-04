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

  if (error) throw error

  // Get user details from users table
  if (data.user) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError) throw userError
    return { user: data.user, userData }
  }

  return { user: data.user }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !userData) return null

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
