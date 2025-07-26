import { Logout } from '@mui/icons-material';


import { Logo } from '../Logo/Logo';

export const Header = () => (
  <header className="w-full bg-primaryColor fixed left-0 top-0 p-2 flex items-center justify-center z-[1000] ">
    <div className="w-full max-w-[1632px] flex gap-4 justify-between md:items-start  flex-col md:items-center  md:flex-row ">
      <Logo />
      <div className="flex gap-3 items-center ">

        <Logout />
      </div>
    </div>
  </header>
);
