import { auth } from '../firebase';

export const getSSORedirectUrl = async (productId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const idToken = await user.getIdToken();

  const response = await fetch('/api/auth/sso', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken, productId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to get SSO redirect URL");
  }

  const { redirectUrl } = await response.json();
  return redirectUrl;
};
