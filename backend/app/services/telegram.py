import httpx

from app.config import settings


async def send_telegram_notification(name: str, contact: str, description: str) -> bool:
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return False

    text = (
        f"<b>Новая заявка</b>\n\n"
        f"<b>Имя:</b> {name}\n"
        f"<b>Контакты:</b> {contact}\n"
        f"<b>Описание:</b>\n{description}"
    )

    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            url,
            json={
                "chat_id": settings.telegram_chat_id,
                "text": text,
                "parse_mode": "HTML",
            },
        )
        if response.status_code != 200:
            print(f"Telegram API error: {response.status_code} {response.text}")
        return response.status_code == 200
