import supabase from "../supabase";

export async function apiLogin(userData) {
  let { data, error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function apiSignUp({
  email,
  password,
  fullname,
  accountType,
  status,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        accountType,
        status,
      },
    },
  });
  return { data, error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function apiLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
