import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Navbar() {
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        ToastAlerta("O usuário foi desconectado com sucesso.", "sucesso")
        navigate('/')
    }

    let component

    if (usuario.token !== "") {
        const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
            `px-3.5 py-2 rounded-xl transition-colors font-medium text-base ${
                isActive 
                    ? 'bg-[#6e373d] text-[#f5eaec] font-bold border border-[#8c424a]' 
                    : 'hover:bg-[#522a2e] text-[#d6c7cb]'
            }`

        component = (
            <div className='w-full bg-[#422125] text-[#f5eaec] py-4 px-8 flex justify-between items-center border-b border-[#522a2e]'>
                <NavLink to="/home" className="text-xl font-bold tracking-wide">
                    Home
                </NavLink>

                <div className='flex gap-4 items-center'>
                    <NavLink to="/postagens" className={navLinkStyle}>
                        Postagens
                    </NavLink>
                    <NavLink to="/temas" className={navLinkStyle}>
                        Temas
                    </NavLink>
                    {/* Rota corrigida com o 'r' em cadastrar */}
                    <NavLink to="/cadastrartema" className={navLinkStyle}>
                        Cadastrar tema
                    </NavLink>
                    <NavLink to="/perfil" className={navLinkStyle}>
                        Usuário
                    </NavLink>
                    <button onClick={logout} className='hover:bg-[#522a2e] px-3.5 py-2 rounded-xl transition-colors text-[#d6c7cb] text-base font-medium'>
                        Sair
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Navbar