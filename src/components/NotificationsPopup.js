import React from "react";

export default function NotificationsPopup({ notifications, open, onClose }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popupContainer}>
        <div style={styles.header}>
          <span style={styles.title}>Notifications for Today</span>
          <button
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {notifications.length === 0 ? (
          <div style={styles.emptyMessage}>No notifications today.</div>
        ) : (
          <ul style={styles.list}>
            {notifications.map((note, idx) => (
              <li key={idx} style={styles.listItem}>
                {/* Making notification clickable if it contains a URL */}
                {typeof note === "string" ? (
                  note
                ) : (
                  <a
                    href={note.url}
                    style={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {note.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 50,
    right: 20,
    width: 320,
    maxHeight: "400px",
    overflowY: "auto",
    background: "rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    borderRadius: 12,
  },
  popupContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: "10px 0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    color: "#555",
  },
  emptyMessage: {
    padding: "15px 16px",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: "10px 16px",
    margin: 0,
  },
  listItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
    fontSize: 15,
    color: "#333",
  },
  link: {
    color: "#5D5FEF",
    textDecoration: "none",
  },
};
