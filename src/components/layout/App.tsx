import '../../styles/app.scss';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import PageLoader from './PageLoader';

export default function App(): JSX.Element {
    return (
        <>
            <PageLoader />
            <Header />
            <main className="mt-5">
                <Outlet />
            </main>
        </>
    );
}
