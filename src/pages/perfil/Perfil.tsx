import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center mx-4 bg-[#2c1417] min-h-screen py-6 text-[#d6c7cb]">
            <div className="container mx-auto my-4 rounded-2xl overflow-hidden bg-[#2c1417] border border-[#522a2e] shadow-2xl">
                <img
                    className="w-full h-72 object-cover border-b-8 border-[#422125] filter brightness-90"
                    src="capa.jpg"
                    alt="Capa do Perfil"
                />

                <img
                    className="rounded-full w-56 h-56 object-cover mx-auto mt-[-8rem] border-8 border-[#2c1417] relative z-10 shadow-lg"
                    src="/perfil.jpg"
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div
                    className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-[#422125] text-[#f5eaec] text-2xl items-center justify-center gap-2 border-t border-[#522a2e]"
                >
                    <p className="font-semibold text-[#f0afbf]">Nome: {usuario.nome} </p>
                    <p className="text-lg text-[#bdaab0]">Email: {usuario.usuario}</p>
                </div>
            </div>
        </div>
    )
}

export default Perfil;