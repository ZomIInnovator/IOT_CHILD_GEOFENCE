import supabase from "../supabase";

export async function getLocation() {
  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("role", "child");
  return data;
}

export async function updateLocation(formData) {
  const { data, error } = await supabase
    .from("locations")
    .update(formData)
    .eq("role", "parent");

  if (error) {
    throw new Error(error);
  }

  return data;
}
