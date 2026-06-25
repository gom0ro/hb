import re

TELEGRAM_PATTERN = re.compile(r"^@?[a-zA-Z0-9_]{5,32}$")
PHONE_PATTERN = re.compile(r"^\+?\d{7,15}$")
SUSPICIOUS_PATTERNS = re.compile(
    r"(https?://|viagra|casino|crypto pump|<script)", re.IGNORECASE
)


EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def is_spam(
    name: str,
    contact: str,
    description: str,
    honeypot: str,
    contact_method: str = "telegram",
) -> str | None:
    if honeypot:
        return "Invalid submission"

    if contact_method == "whatsapp":
        if not PHONE_PATTERN.match(contact.strip()):
            return "Invalid phone number"
    elif contact_method == "email":
        if not EMAIL_PATTERN.match(contact.strip()):
            return "Invalid email"
    elif not TELEGRAM_PATTERN.match(contact.strip()):
        return "Invalid Telegram username"

    for field in (name, description):
        if SUSPICIOUS_PATTERNS.search(field):
            return "Invalid submission"

    if len(description.strip()) < 10:
        return "Description too short"

    return None
