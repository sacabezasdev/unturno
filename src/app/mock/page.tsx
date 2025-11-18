import sendMail from '../actions/sendMail';
import Link from 'next/link';

export default function Mock() {
  return (
    <div className="text-center text-lg flex flex-col items-center">
      <Link href="/mock/profesional/buscar" className="bg-blue-800 mt-6 px-4 py-6 w-50 h-30 rounded leading-6 content-center" >
        Conozco el nombre del Profesional
      </Link>
      <Link href="/mock/profesional/listar" className="bg-red-800 mt-8 px-4 py-6 w-50 h-30 rounded leading-6 mb-4 content-center" >
        Buscar Profesional
      </Link>
    </div>
  );
}
