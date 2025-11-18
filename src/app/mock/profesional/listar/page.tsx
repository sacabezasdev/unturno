"use client";

import { useState } from 'react';
import Link from 'next/link';
import { services } from '../../../constants/mocks/services';
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

export default function ProfesionalListar() {
  const [region, setRegion] = useState(0);
  const [city, setCity] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [service, setService] = useState(0);
  const [practitionersList, setPractitionersList] = useState<Practitioner[]>([]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setRegion(value);
    setCity(0);
    setOrganization(0);
    setService(0);
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setCity(value);
    setOrganization(0);
    setService(0);
  };
  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setOrganization(value);
    setService(0);
  };
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setService(Number(value));
    setPractitionersList(
      practitioners.filter(p => String(p.service.id) === value)
    );
  };

  return (
    <div>
      <div>
        Seleccione <strong>Región</strong>
      </div>
      <select className="w-60 mb-4" onChange={handleRegionChange} value={region}>
        <option value="0" className="text-black">—</option>
        <option value="1" className="text-black">Neuquén</option>
        <option value="2" className="text-black">Río Negro</option>
      </select>
      {!!region && (
        <>
          <div>
            Seleccione <strong>Ciudad</strong>
          </div>
          <select className="w-60 mb-4" onChange={handleCityChange} value={city}>
            <option value="0" className="text-black">—</option>
            <option value="1" className="text-black">Neuquén</option>
            <option value="2" className="text-black">Cipolletti</option>
            <option value="3" className="text-black">Roca</option>
          </select>
        </>
      )}
      {!!city && (
        <>
          <div>
            Seleccione <strong>Organización</strong>
          </div>
          <select className="w-60 mb-4" onChange={handleOrganizationChange} value={organization}>
            <option value="0" className="text-black">—</option>
            <option value="1" className="text-black">Génesis Vita</option>
            <option value="2" className="text-black">CMIC</option>
            <option value="3" className="text-black">Albor</option>
          </select>
        </>
      )}
      {!!organization && (
        <>
          <div>
            Seleccione <strong>Servicio</strong>
          </div>
          <select className="w-60 mb-4" onChange={handleServiceChange} defaultValue={service}>
            <option value="0">—</option>
            {
              services.map((service: any, index: number) => (
                <option key={index} value={service.id} className="text-black">{service.name}</option>
              ))
            }
          </select>
        </>
      )}
      {!!service && practitionersList && (
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
