import { useLocation } from 'react-router-dom';
import Header from './Header';

const HeaderConditional = () => {
  const location = useLocation()
  if (location.pathname === '/auth') {
    return null;
  }
  return <Header />
}

export default HeaderConditional