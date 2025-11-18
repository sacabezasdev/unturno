"use server";

export default async function sendMail(recipient: string, subject: string, content: string) {
  const res = await fetch("https://santiagocabezas.com.ar/fakemailapi/fakemail.php", {
    method: "POST",
    body: new URLSearchParams({
      recipient,
      subject,
      content,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    throw new Error("Error sending email");
  }

  return await res.text();
}
