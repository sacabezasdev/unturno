import sendMail from '../../../actions/sendMail';
import Link from 'next/link';
import { slots } from '../../../constants/mocks/slot';
import { practitioners } from '../../../constants/mocks/practitioner';

async function handleConfirmed(base64hash:string = '') {
  "use server";

  const decodedHash = Buffer.from(base64hash, 'base64').toString('utf8');
  const params = new URLSearchParams(decodedHash);
  const slotId = params.get("slotId");
  const practitionerId = params.get("practitionerId");
  const email = params.get("email");

  const slot = slots.filter(s => s.id === Number(slotId));
  const practitioner = practitioners.filter(p => p.id === Number(practitionerId));

  const subject = `Turno ${slot[0].slot} con ${practitioner[0].name}`;
  const content = `Su Turno ${slot[0].slot} con ${practitioner[0].name}, ha sido confirmado.`;
  await sendMail(email || '', subject, content);

}

export default async function TurnoConfirmarTurno({
  searchParams,
}: {
    searchParams: Promise<{}>;
}) {
  const base64hash = Object.keys(await searchParams)[0];
  handleConfirmed(base64hash);

  return (
    <div>
      <div className="mb-6">
        <div className="my-2 bg-amber-300 text-black flex flex-col items-center text-lg p-4">
          <span className="text-lg">
            Turno confirmado
          </span>
        </div>
      </div>
      <Link href="/mock">&lt; Volver</Link>
    </div>
  )
}
