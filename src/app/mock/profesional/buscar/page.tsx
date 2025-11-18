"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'flowbite-react';

import { practitioners } from '../../../constants/mocks/practitioner';

type Service = {
  id: number;
  name: string;
};

type Practitioner = {
  id: number;
  name: string;
  gender: string;
  service: Service;
};

export default function ProfesionalBuscar() {
  const [practitionersList, setPractitionersList] = useState<Practitioner[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 1) {
      setPractitionersList(
        practitioners.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
      );
    }
    else {
      setPractitionersList([]);
    }
  }

  return (
    <div>
      <div className="flex flex-row items-start">
        <input type="text" placeholder="Ingrese profesional a buscar" className="w-60 mb-8" onChange={handleSearch} />
        <Button>Buscar</Button>
      </div>
      {practitionersList && practitionersList.length > 0 && (
        <>
          <div className="mb-4">
            Seleccione <strong>Profesional</strong>
          </div>
          <div className="flex flex-col">
            {
              practitionersList.map((practitioner: any, index: number) => (
                <Link key={index} className="text-violet-500" href={`/mock/turno?practitionerId=${practitioner.id}`}>
                  {practitioner.gender === "male" ? `Dr.` : `Dra.`}
                  {' '}
                  {practitioner.name}
                </Link>
              ))
            }
          </div>
        </>
      )}
    </div>
  )
}
