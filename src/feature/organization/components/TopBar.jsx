import Logo from '@assets/icons/logo.svg?react'

const TopBar = () => {
    return (
        <nav className="py-4 px-6 bg-white border-b ">
            <div className='container mx-auto'>
                <Logo className="object-contain" />
            </div>
        </nav>
    )
}

export default TopBar