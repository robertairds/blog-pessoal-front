import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='border-[#522a2e] bg-[#2c1417] text-[#d6c7cb] border flex flex-col rounded-2xl overflow-hidden justify-between shadow-xl'>
            <header className='py-3 px-6 bg-[#422125] text-[#f0afbf] font-bold text-2xl border-b border-[#522a2e] tracking-wide'>
                Tema
            </header>

            {/* Mudamos para text-white e font-black (o negrito mais pesado possível) */}
            <p className='p-8 text-3xl bg-[#2c1417] text-white font-black h-full'>
                {tema.descricao}
            </p>

            <div className="flex border-t border-[#522a2e]">
                <Link
                    to={`/editartema/${tema.id}`}
                    className='w-full text-slate-100 bg-[#522a2e] hover:bg-[#6e373d] flex items-center justify-center py-3 font-semibold transition-colors'
                >
                    <button>Editar</button>
                </Link>

                <Link
                    to={`/deletartema/${tema.id}`}
                    className='text-slate-100 bg-[#4a262c] hover:bg-[#66313a] w-full flex items-center justify-center py-3 font-semibold transition-colors border-l border-[#522a2e]'
                >
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardTema;