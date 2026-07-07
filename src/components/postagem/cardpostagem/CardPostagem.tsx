import { Link } from 'react-router-dom'
import { useContext } from 'react'
import type Postagem from '../../../models/Postagem'
import { AuthContext } from '../../../contexts/AuthContext' // Ajuste o caminho se necessário

interface CardPostagensProps {
  postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
  const { usuario } = useContext(AuthContext)

  // Se o autor da postagem for o mesmo usuário logado atualmente, usa a foto atualizada do contexto do usuário
  const ehMeuPerfil = usuario.id === postagem.usuario?.id
  const fotoParaExibir = ehMeuPerfil && usuario.foto ? usuario.foto : postagem.usuario?.foto

  return (
    <div className='border-[#522a2e] bg-[#2c1417] text-[#d6c7cb] border flex flex-col rounded-xl overflow-hidden justify-between shadow-xl'>
      <div>
        <div className="flex w-full bg-[#422125] text-[#f5eaec] py-3 px-4 items-center gap-4 border-b border-[#522a2e]">
          <img
            src={fotoParaExibir && fotoParaExibir.trim() !== "" ? fotoParaExibir : "/padrao.png"}
            className='h-12 w-12 object-cover rounded-full border border-[#6e373d]'
            alt={postagem.usuario?.nome || "Foto de perfil"}
          />

          <h3 className='text-lg font-extrabold text-[#f5eaec] tracking-wide uppercase'>
            {postagem.usuario?.nome}
          </h3>
        </div>

        <div className='p-6'>
          <h4 className='text-lg font-semibold uppercase text-[#f0afbf] mb-2'>
            {postagem.titulo}
          </h4>

          <p className='text-[#d6c7cb] mb-4'>{postagem.texto}</p>

          <p className='text-sm text-[#bdaab0] mb-1'>Tema: {postagem.tema?.descricao}</p>

          <p className='text-xs text-[#9e8990]'>
            Data:{' '}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: 'full',
              timeStyle: 'medium',
              timeZone: 'America/Sao_Paulo', 
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>

      <div className="flex border-t border-[#522a2e]">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className='w-full text-white bg-[#522a2e] hover:bg-[#6e373d] flex items-center justify-center py-3 font-semibold transition-colors'
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className='text-white bg-[#4a262c] hover:bg-[#66313a] w-full flex items-center justify-center py-3 font-semibold transition-colors border-l border-[#522a2e]'
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardPostagem;