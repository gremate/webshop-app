import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useAppState } from '../../contexts/AppContext';

interface SecureRouteProps {
    children: React.ReactNode;
}

export default function SecureRoute({ children }: SecureRouteProps): JSX.Element {
    const appState = useAppState();

    return (
        <>
            {appState.user.isAdmin ? (
                children
            ) : (
                <Container>
                    <h2>
                        Sorry! You don't have permission to access this page. <Link to="/">Back to homepage.</Link>
                    </h2>
                </Container>
            )}
        </>
    );
}
