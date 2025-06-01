// Firebase Messaging Service Worker
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js")

// Firebase 설정 - 실제 환경 변수 값으로 교체해주세요
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "yeppeune-project.firebaseapp.com",
  projectId: "yeppeune-project",
  storageBucket: "yeppeune-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc",
  measurementId: "G-XXXXXXXXXX"
}

const firebase = self.firebase
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload)

  const notificationTitle = payload.notification?.title || "예쁘네 알림"
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
    badge: "/notification-badge.png",
    image: payload.notification?.image,
    data: {
      url: payload.data?.actionUrl || "/admin/notifications",
      notificationId: payload.data?.id,
      priority: payload.data?.priority || "medium",
    },
    requireInteraction: payload.data?.priority === "critical",
    actions: [
      {
        action: "view",
        title: "확인",
        icon: "/icons/view.png",
      },
      {
        action: "dismiss",
        title: "닫기",
        icon: "/icons/close.png",
      },
    ],
    tag: payload.data?.id || "default",
    renotify: true,
    vibrate: payload.data?.priority === "critical" ? [200, 100, 200] : [100],
    silent: false,
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})

// 알림 클릭 처리
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event)

  event.notification.close()

  if (event.action === "dismiss") {
    return
  }

  const urlToOpen = event.notification.data?.url || "/admin/notifications"

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // 이미 열린 탭이 있는지 확인
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus()
        }
      }

      // 새 탭 열기
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    }),
  )
})

// 알림 닫기 처리
self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event)

  // 알림 닫기 통계 전송 (옵션)
  fetch("/api/fcm/notification-stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notificationId: event.notification.data?.notificationId,
      action: "closed",
      timestamp: new Date().toISOString(),
    }),
  }).catch(console.error)
})
