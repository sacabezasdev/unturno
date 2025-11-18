import Link from 'next/link';
import { slots } from '../../constants/mocks/slot';
import { practitioners } from '../../constants/mocks/practitioner';

type PageProps = {
  searchParams: { practitionerId?: string };
};

export default async function Turno({ searchParams }: PageProps) {
  const { practitionerId } = await searchParams;
  console.log('practitionerId:', practitionerId);

  const practitioner = practitioners.filter(
    (p) => p.id === Number(practitionerId)
  );

  return (
    <div className="flex flex-col items-center">
      {!!practitioner[0] && (
        <>
          <div className="mt-2 mb-1">Turnos disponibles para</div>
          <div className="mb-4 text-3xl">{practitioner[0].name}</div>

          <div className="flex flex-row flex-wrap items-center">
            {slots.map((slot: any, index: number) => (
              <Link
                key={index}
                className="text-violet-500 mr-7 mb-2 text-xl text-center"
                href={`/mock/turno/solicitar-turno?slotId=${slot.id}&practitionerId=${practitionerId}`}
              >
                {slot.slot}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
