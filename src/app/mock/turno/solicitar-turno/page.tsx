import { Button } from 'flowbite-react';
import { slots } from '../../../constants/mocks/slot';
import { practitioners } from '../../../constants/mocks/practitioner';

export default async function TurnoSolicitarTurno({
  searchParams,
}: {
    searchParams: Promise<{ slotId?: string, practitionerId?: string }>;
}) {
  const { slotId, practitionerId } = await searchParams;
  const slot = slots.filter(s => s.id === Number(slotId));
  const practitioner = practitioners.filter(p => p.id === Number(practitionerId));

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white text-black text-sm leading-3 m-2 p-4">
        <p className="mb-2">
          * en este punto se chequea si el usuario está loggeado o no.
        </p>
        <p className="mb-2">
          La idea es mostrar los Profesionales y Turnos disponibles a usuarios nuevos, sin tenerlos
          detrás de una "pared de Usuario Registrado".
        </p>
        <p>
          Para la demo, ingresar un <span className="text-red-500">mail válido</span>. La contraseña
          puede ser cualquier texto, no estamos chequeando información en esta etapa.
        </p>
      </div>

      <div className="my-2 p-2 bg-amber-300 text-black w-80 flex flex-col items-center text-lg">
        <h2 className="font-bold">Su Turno:</h2>
        <span className="text-3xl font-bold">{slot[0].slot}</span>
        <span className="text-3xl">
          {practitioner[0].gender === "male" ? `Dr.` : `Dra.`}
          {' '}
          {practitioner[0].name}
        </span>
      </div>

      <form
        action="/mock/turno/mail"
        method="GET"
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="slotId" value={slotId ?? ''} />
        <input type="hidden" name="practitionerId" value={practitionerId ?? ''} />

        <label htmlFor='email'>Usuario</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="usuario@servidor.com"
          className="w-80 mb-2 p-2 text-black bg-white"
          required
        />

        <label htmlFor='email'>Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          className="w-80 mb-2 p-2 text-black bg-white"
          required
        />

        <Button
          type="submit"
        >
          Confirmar mi Turno
        </Button>
      </form>
    </div>
  );
}
