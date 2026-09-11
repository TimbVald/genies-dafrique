/**
 * Gestionnaire de notifications Push pour la PWA
 * Préparé pour l'envoi futur d'alertes scolaires, actualités et rappels
 */

export function isPushNotificationSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isPushNotificationSupported()) {
    return "denied";
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error("Erreur lors de la demande de permission de notification:", error);
    return "denied";
  }
}

export async function subscribeToPushNotifications(
  vapidPublicKey?: string
): Promise<PushSubscription | null> {
  if (!isPushNotificationSupported()) {
    console.warn("Les notifications push ne sont pas supportées sur ce navigateur.");
    return null;
  }

  const permission = await requestNotificationPermission();
  if (permission !== "granted") {
    console.warn("Permission de notification refusée par l'utilisateur.");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription && vapidPublicKey) {
      // Conversion de la clé VAPID base64 en Uint8Array
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey as BufferSource,
      });
    }

    return subscription;
  } catch (error) {
    console.error("Erreur lors de l'abonnement push:", error);
    return null;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
