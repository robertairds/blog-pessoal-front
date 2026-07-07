import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button
                        className='border border-[#6e373d] bg-[#522a2e] hover:bg-[#6e373d] text-[#f5eaec] font-bold py-2 px-4 rounded-xl transition-colors'>
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    background: '#2c1417',
                    border: '1px solid #522a2e',
                    width: '90% !important',
                    maxWidth: '520px !important',
                    padding: '0.5rem !important',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div className="w-full">
                    <FormPostagem isModal={true} />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;