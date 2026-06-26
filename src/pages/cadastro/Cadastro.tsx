import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {
  const navigate = useNavigate()

const [isLoading, setIsLoading] = useState<boolean>(false)
const [confirmarSenha, setConfirmarSenha] = useState<string>('')

const [usuario, setUsuario] = useState<Usuario>({
  id: 0,
  nome: '',
  usuario: '',
  senha: '',
  foto: ''
})

useEffect(() => {
  if (usuario.id !== 0) {
    retornar()
  }
}, [usuario])

function retornar(){
  navigate('/login')
}

function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
  setUsuario({
    ...usuario,
    [e.target.name]: e.target.value
  })
}

function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
  setConfirmarSenha(e.target.value)
}

async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
  e.preventDefault()

  if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){
    setIsLoading(true)

    try{
      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
      alert('Usuário cadastrado com sucesso!')
    }catch(error){
      alert('Erro ao cadastrar o usuário!')
    }
  }else{
    alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
    setUsuario({...usuario, senha: '' })
    setConfirmarSenha('')
  }

  setIsLoading(false)
}



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      {/* Imagem à esquerda */}
      <div
        className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full h-full bg-cover bg-center"
      ></div>

      {/* Container limitador e centralizador do formulário */}
      <div className="flex justify-center items-center w-full py-6 px-8">
        <form className="flex justify-center items-center flex-col w-full max-w-md gap-4"
          onSubmit={cadastrarNovoUsuario}>
          
          <h2 className="text-slate-900 text-5xl font-bold mb-2">Cadastrar</h2>
          
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="URL da Foto"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex justify-around w-full gap-8 mt-2">
            <button
              type="reset"
              className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 transition-colors"
              onClick={retornar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center transition-colors"
            >
            { isLoading ?
              <ClipLoader
               color="#ffffff"
               size={24}
              />:
              <span>Cadastrar</span>}
              
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Cadastro;