import sendMail from '../../../actions/sendMail';
import Link from 'next/link';
import { slots } from '../../../constants/mocks/slot';
import { practitioners } from '../../../constants/mocks/practitioner';

async function handleConfirm(email: string='', practitionerId: string='', slotId: string='') {
  "use server";
  if (email) {

    const slot = slots.filter(s => s.id === Number(slotId));
    const practitioner = practitioners.filter(p => p.id === Number(practitionerId));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const base64hash = Buffer.from(`slotId=${slotId}&practitionerId=${practitionerId}&email=${email}`).toString('base64');
    const confirmLink = `${baseUrl}/mock/turno/confirmar-turno?${base64hash}`;
    const subject = `Confirmar turno`;
    const content = `Para comfirmar su turno ${slot[0].slot} con ${practitioner[0].name}, por favor haga click <a href="${confirmLink}">en este enlace</a>.`;

    //await sendMail(email, subject, content);
  }
}

export default async function TurnoMail({
  searchParams,
}: {
  searchParams: Promise<{ email?: string, practitionerId?: string, slotId?: string }>;
}) {
  const { email, practitionerId, slotId } = await searchParams;
  handleConfirm(email, practitionerId, slotId);

  return (
    <div>
      <div className="mb-6">
        <div className="my-2 bg-amber-300 text-black flex flex-col items-center text-lg p-4">
          <span className="text-lg">
            Se ha enviado un email a: <span className="text-red-500">{email}</span>
            <br />
            Este email contiene un link para confirmar el Turno.
            <br />
            Si no lo ha recibido, verifique en su carpeta <strong>SPAM</strong>.
          </span>
        </div>
      </div>
      <Link href="/mock">&lt; Volver</Link>
    </div>
  )
}
