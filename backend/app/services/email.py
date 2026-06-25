import httpx


FORMSUBMIT_URL = "https://formsubmit.co/ajax/gomoroza4@gmail.com"


async def send_email_notification(name: str, contact: str, description: str) -> None:
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            await client.post(
                FORMSUBMIT_URL,
                data={
                    "name": name,
                    "contact": contact,
                    "description": description,
                    "_subject": f"New lead from {name}",
                },
            )
    except Exception:
        pass
