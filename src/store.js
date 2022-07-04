import { writable, derived } from "svelte/store";

export const access_token = writable('')
export const refresh_token = writable('')

export const isAuthenticated = derived(refresh_token, ($refresh_token) => {
  return $refresh_token.length > 0;
})